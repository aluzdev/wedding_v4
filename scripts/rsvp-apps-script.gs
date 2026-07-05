/**
 * Confirmación de asistencia (RSVP) — Google Apps Script
 * ======================================================
 * Pega este código en el editor de Apps Script de tu hoja de cálculo
 * (Extensiones → Apps Script) y publícalo como aplicación web.
 * Guía paso a paso: scripts/RSVP-SETUP.md
 *
 * La hoja debe tener dos pestañas:
 *
 *   "Familias"  → A y B: LIBRES, para tu control personal (el sistema las
 *     ignora) | C: numero (cuántas personas; pon 1 si la persona va sola) |
 *     D: familia (apellido) | E: clave | F: confirmado |
 *     G: mesa (déjala vacía hasta la semana de la boda) |
 *     H, I, J…: un nombre de invitado por columna (los que tú ya tienes
 *     contemplados). (la llenas tú; "confirmado" déjalo vacío)
 *
 *   "Confirmaciones" → se llena sola:
 *     A: fecha | B: familia | C: clave | D: invitado | E: asiste
 */

const HOJA_FAMILIAS = 'Familias';
const HOJA_CONFIRMACIONES = 'Confirmaciones';

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'lookup') {
    return lookup(e.parameter.familia, e.parameter.clave);
  }
  // búsqueda SOLO por clave (para el sobre de bienvenida y los links
  // personalizados ?c=clave). Requiere que cada clave sea única.
  if (action === 'lookupclave') {
    return lookupByClave(e.parameter.clave);
  }
  return json({ ok: false, error: 'bad_action' });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === 'submit') return submit(body);
    return json({ ok: false, error: 'bad_action' });
  } catch (err) {
    return json({ ok: false, error: 'bad_request' });
  }
}

/** normaliza texto: minúsculas, sin espacios sobrantes ni acentos */
function norm(s) {
  // rango de marcas diacríticas combinantes U+0300–U+036F (construido por
  // código para no depender de caracteres especiales en el archivo fuente)
  var diacritics = new RegExp('[' + String.fromCharCode(0x300) + '-' + String.fromCharCode(0x36f) + ']', 'g');
  return String(s || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(diacritics, '');
}

/** arma el objeto de una familia a partir de su fila (índice 0-based) */
function buildFamily(data, i) {
  // A y B (índices 0 y 1) son tu control personal: el sistema no las usa.
  // C = numero, D = familia, E = clave, F = confirmado, G = mesa,
  // H en adelante = nombres de invitados; ignora celdas vacías
  const integrantes = data[i]
    .slice(7)
    .map(function (n) { return String(n).trim(); })
    .filter(function (n) { return n; });
  const numero = parseInt(String(data[i][2]).trim(), 10);
  // "va solo": pusiste 1 en numero, o la fila tiene un único nombre
  const solo = numero === 1 || (!numero && integrantes.length === 1);
  return {
    rowIndex: i + 1,
    numero: numero || integrantes.length,
    familia: data[i][3],
    clave: data[i][4],
    confirmado: String(data[i][5]).toUpperCase().indexOf('S') === 0,
    mesa: String(data[i][6]).trim(),
    integrantes: integrantes,
    solo: solo,
  };
}

/** busca la fila de la familia que coincide en nombre Y clave */
function findFamilyRow(sheet, familia, clave) {
  const data = sheet.getDataRange().getValues();
  const f = norm(familia);
  const c = norm(clave);
  for (let i = 1; i < data.length; i++) {
    if (norm(data[i][3]) === f && norm(data[i][4]) === c) {
      return buildFamily(data, i);
    }
  }
  return null;
}

/** busca la fila de la familia SOLO por clave (debe ser única por familia) */
function findFamilyRowByClave(sheet, clave) {
  const data = sheet.getDataRange().getValues();
  const c = norm(clave);
  if (!c) return null;
  for (let i = 1; i < data.length; i++) {
    if (norm(data[i][4]) === c) {
      return buildFamily(data, i);
    }
  }
  return null;
}

/** ¿algún integrante de esta clave marcó "Sí" en Confirmaciones? */
function familyAttends(ss, clave) {
  const conf = ss.getSheetByName(HOJA_CONFIRMACIONES);
  const data = conf.getDataRange().getValues();
  const c = norm(clave);
  for (let i = 1; i < data.length; i++) {
    // C = clave (índice 2), E = asiste 'Sí'/'No' (índice 4)
    if (norm(data[i][2]) === c && norm(data[i][4]).indexOf('s') === 0) return true;
  }
  return false;
}

function familyReply(ss, row) {
  return {
    ok: true, familia: row.familia, clave: row.clave, integrantes: row.integrantes,
    confirmado: row.confirmado, mesa: row.mesa, solo: row.solo,
    // sin confirmar aún → true (aún no responden); confirmado → según su respuesta
    asiste: row.confirmado ? familyAttends(ss, row.clave) : true,
  };
}

function lookup(familia, clave) {
  const ss = SpreadsheetApp.getActive();
  const row = findFamilyRow(ss.getSheetByName(HOJA_FAMILIAS), familia, clave);
  if (!row) return json({ ok: false, error: 'notfound' });
  return json(familyReply(ss, row));
}

function lookupByClave(clave) {
  const ss = SpreadsheetApp.getActive();
  const row = findFamilyRowByClave(ss.getSheetByName(HOJA_FAMILIAS), clave);
  if (!row) return json({ ok: false, error: 'notfound' });
  return json(familyReply(ss, row));
}

function submit(body) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // evita que dos envíos a la vez se pisen
  try {
    const ss = SpreadsheetApp.getActive();
    const famSheet = ss.getSheetByName(HOJA_FAMILIAS);
    const row = findFamilyRow(famSheet, body.familia, body.clave);

    if (!row) return json({ ok: false, error: 'notfound' });
    if (row.confirmado) return json({ ok: false, error: 'already' }); // ya enviaron: no se permite de nuevo

    const guests = (body.guests || [])
      .map(function (g) {
        return { nombre: String(g.nombre || '').trim(), asiste: !!g.asiste };
      })
      .filter(function (g) { return g.nombre; });

    if (guests.length === 0) return json({ ok: false, error: 'empty' });

    const conf = ss.getSheetByName(HOJA_CONFIRMACIONES);
    const now = new Date();
    guests.forEach(function (g) {
      conf.appendRow([now, row.familia, row.clave, g.nombre, g.asiste ? 'Sí' : 'No']);
    });

    // marca la familia como confirmada → bloquea reenvíos (columna F)
    famSheet.getRange(row.rowIndex, 6).setValue('SÍ');

    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
