# Confirmación de asistencia (RSVP) — Guía de instalación

El formulario del sitio busca a cada familia por **nombre + clave**, muestra cuántos
lugares tienen reservados y guarda los nombres de quienes asistirán en una hoja de
cálculo de Google (tu "Excel"). Una familia **solo puede confirmar una vez**.

Sigue estos pasos una sola vez. No necesitas saber programar.

---

## 1. Crea la hoja de cálculo

1. Entra a <https://sheets.google.com> y crea una hoja nueva. Ponle un nombre, p. ej. **Boda — Confirmaciones**.
2. Crea **dos pestañas** (abajo a la izquierda) con estos nombres exactos:

### Pestaña `Familias` (la llenas tú)

| A (familia) | B (clave) | C (lugares) | D (confirmado) |
|-------------|-----------|-------------|----------------|
| García      | gar-482   | 3           |                |
| Pérez López | per-913   | 2           |                |
| Hernández   | her-205   | 4           |                |

- **familia**: el nombre que la familia escribirá (no importan mayúsculas ni acentos).
- **clave**: el código corto que pondrás en cada invitación. Invéntalo único por familia.
- **lugares**: cuántas personas tienes contempladas para esa familia.
- **confirmado**: déjalo **vacío**. El sistema lo pondrá en `SÍ` cuando confirmen.

> La primera fila son los encabezados; los datos empiezan en la fila 2.

### Pestaña `Confirmaciones` (se llena sola)

Solo pon los encabezados en la fila 1: **fecha | familia | nombre | apellido | niño**.
El sistema agrega una fila por cada persona que asista.

---

## 2. Pega el script

1. En la hoja: menú **Extensiones → Apps Script**.
2. Borra lo que haya y pega TODO el contenido de [`rsvp-apps-script.gs`](./rsvp-apps-script.gs).
3. Guarda (icono de disquete).

---

## 3. Publica como aplicación web

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En el engrane ⚙️ elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** **Cualquier usuario** (importante, si no, el sitio no podrá guardar).
4. Clic en **Implementar**. Google te pedirá autorizar permisos la primera vez → acepta
   (verás un aviso de "app no verificada": entra en *Configuración avanzada → Ir a (tu proyecto)*).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si más adelante cambias el código, usa **Implementar → Gestionar implementaciones →
> editar (lápiz) → Nueva versión**, para conservar la misma URL.

---

## 4. Conecta el sitio

1. Abre `src/content/content.js`.
2. Pega la URL en `rsvpApiUrl`:

   ```js
   rsvpApiUrl: 'https://script.google.com/macros/s/AKfyc.../exec',
   ```

3. Guarda. ¡Listo! El formulario ya quedará activo.

---

## Cómo se usa / preguntas comunes

- **¿Cómo le aviso a cada familia su clave?** En la invitación que les mandes
  (WhatsApp, tarjeta, etc.) incluye su nombre de familia y su clave.
- **¿Y si necesito reabrir una confirmación?** En la pestaña `Familias`, borra el `SÍ`
  de la columna *confirmado* de esa familia. Podrán volver a enviar.
- **¿Pueden meter de más?** No: el sistema rechaza más nombres que los `lugares`
  contemplados, tanto en el sitio como en el servidor.
- **¿Y si alguien no va?** Dejan en blanco ese lugar; solo se guardan los nombres escritos.
- **La lista para el acomodo de mesas** está en la pestaña `Confirmaciones`: una fila por
  persona, con su nombre, apellido y si es niño/a.
