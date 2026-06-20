/**
 * Confirmación de asistencia (RSVP) — Google Apps Script
 * ======================================================
 * Pega este código en el editor de Apps Script de tu hoja de cálculo
 * (Extensiones → Apps Script) y publícalo como aplicación web.
 * Guía paso a paso: scripts/RSVP-SETUP.md
 *
 * La hoja debe tener dos pestañas:
 *
 *   "Familias"  → A: familia | B: clave | C: lugares | D: confirmado
 *     (la llenas tú; "confirmado" déjalo vacío o en "NO")
 *
 *   "Confirmaciones" → se llena sola:
 *     A: fecha | B: familia | C: nombre | D: apellido | E: niño
 */

const HOJA_FAMILIAS = 'Familias';
const HOJA_CONFIRMACIONES = 'Confirmaciones';

function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  if (action === 'lookup') {
    return lookup(e.parameter.familia, e.parameter.clave);
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

/** busca la fila de la familia que coincide en nombre Y clave */
function findFamilyRow(sheet, familia, clave) {
  const data = sheet.getDataRange().getValues();
  const f = norm(familia);
  const c = norm(clave);
  for (let i = 1; i < data.length; i++) {
    if (norm(data[i][0]) === f && norm(data[i][1]) === c) {
      return {
        rowIndex: i + 1,
        familia: data[i][0],
        lugares: Number(data[i][2]) || 0,
        confirmado: String(data[i][3]).toUpperCase().indexOf('S') === 0,
      };
    }
  }
  return null;
}

function lookup(familia, clave) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(HOJA_FAMILIAS);
  const row = findFamilyRow(sheet, familia, clave);
  if (!row) return json({ ok: false, error: 'notfound' });
  return json({ ok: true, familia: row.familia, lugares: row.lugares, confirmado: row.confirmado });
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
        return {
          nombre: String(g.nombre || '').trim(),
          apellido: String(g.apellido || '').trim(),
          nino: !!g.nino,
        };
      })
      .filter(function (g) { return g.nombre || g.apellido; });

    if (guests.length === 0) return json({ ok: false, error: 'empty' });
    if (guests.length > row.lugares) return json({ ok: false, error: 'toomany' }); // no más de los contemplados

    const conf = ss.getSheetByName(HOJA_CONFIRMACIONES);
    const now = new Date();
    guests.forEach(function (g) {
      conf.appendRow([now, row.familia, g.nombre, g.apellido, g.nino ? 'Sí' : 'No']);
    });

    // marca la familia como confirmada → bloquea reenvíos
    famSheet.getRange(row.rowIndex, 4).setValue('SÍ');

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
