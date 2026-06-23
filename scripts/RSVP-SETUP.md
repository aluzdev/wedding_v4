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

Las columnas **A y B son tuyas, para tu control personal** (notas, conteos, lo
que quieras): el sistema **no las lee**. Los datos que usa el sistema empiezan
en la **columna C**. A partir de la **columna H pones un invitado por columna**
(los nombres que ya tienes contemplados para esa familia): H, I, J…

| A (libre) | B (libre) | C (numero) | D (familia) | E (clave) | F (confirmado) | G (mesa) | H | I |
|-----------|-----------|------------|-------------|-----------|----------------|----------|---|---|
| …         | …         | 2          | Familia García | gar-482 |              |          | Juan García | María García |
| …         | …         | 2          | Pérez López    | per-913 |              |          | Ana Pérez | Carlos López |
| …         | …         | 1          | Sr. Roberto Pérez | rob-771 |           |          | Roberto Pérez |  |

- **A y B**: libres, para tu uso personal. El sistema las ignora.
- **numero (C)**: cuántas personas son. **Pon `1` cuando la persona va sola**: así verá una
  pantalla en singular con dos botones (*Sí, asistiré* / *No podré asistir*), sin lista ni
  textos en plural. Para familias pon el total (o déjalo vacío; si la fila tiene un solo
  nombre también se trata como "va solo").
- **familia (D)**: el nombre con el que saludarás a esa familia o persona. **Se muestra tal
  cual** en la bienvenida y en la confirmación (ej. "Hola, **Familia García**" o "Hola,
  **Sr. Roberto Pérez**"), así que escríbelo como quieres que se lea. No importan mayúsculas
  ni acentos para la búsqueda.
- **clave (E)**: el código corto que pondrás en cada invitación. **Debe ser ÚNICO por
  familia** (la familia entra solo con su clave, sin el apellido). No repitas claves;
  hazlas difíciles de adivinar (ej. `gar-482`, no `garcia`).
- **confirmado (F)**: déjalo **vacío**. El sistema lo pondrá en `SÍ` cuando confirmen.
- **mesa (G)**: déjala **vacía** hasta la semana de la boda. Cuando acomodes las mesas,
  escribe aquí el número (o nombre) de mesa de cada familia: en cuanto la familia entre
  al sitio con su clave, verá su mesa. Si la dejas vacía, simplemente no se muestra nada.
- **H en adelante**: el nombre de cada persona invitada. Deja en blanco las columnas que
  sobren. Para una persona que va sola, pon su nombre en **H** (lo necesitas para tu lista
  de mesas aunque no se muestre en su pantalla).

> La primera fila son los encabezados; los datos empiezan en la fila 2.

### Para agregar a alguien que va solo

Agrega una fila normal y pon **`1` en la columna `numero` (C)**. En `familia` (D) escribe
su nombre como quieres saludarlo (ej. `Sr. Roberto Pérez`), dale su `clave` única (E) y pon
su nombre también en `H`. Verá: *"Hola, Sr. Roberto Pérez — Nos encantaría contar contigo"*
con los botones **Sí / No**.

> **¿Ya tenías la hoja sin la columna `numero`?** Insértala: clic derecho sobre el
> encabezado de la **columna C** → *Insertar 1 columna a la izquierda*. Eso corre `familia`,
> `clave`, etc. una columna a la derecha (justo como muestra la tabla de arriba). Ponle el
> encabezado `numero` y rellena los que vayan solos con `1`.

### Pestaña `Confirmaciones` (se llena sola)

Solo pon los encabezados en la fila 1: **fecha | familia | clave | invitado | asiste**.
El sistema agrega una fila por cada invitado, indicando si asiste (`Sí`/`No`).

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

## La bienvenida tipo sobre y los links personalizados

Al abrir el sitio, lo primero que ve cada invitado es un **sobre**. Al tocarlo:

- Si entró con su **link personalizado** (ver abajo), el sobre se abre y ya lo saluda
  por su nombre, sin pedirle nada.
- Si entró al sitio "pelón" (sin link), el sobre le pide **solo su clave**. Con eso entra.

En ambos casos, cuando llega a "Confirma tu asistencia" **ya no le vuelve a pedir
apellido ni clave**: ve directo a sus invitados (o a su mesa, si ya confirmó). La clave
queda guardada en su teléfono, así que si reabre el sitio el día de la boda, va directo
a ver su mesa.

### Links personalizados (uno por familia)

A la dirección del sitio le agregas `?c=` y la clave de la familia:

```
https://TU-SITIO.com/?c=gar-482     → familia García
https://TU-SITIO.com/?c=per-913     → familia Pérez
```

Le mandas a cada familia **su** link por WhatsApp y entran sin escribir nada. (Reemplaza
`TU-SITIO.com` por tu dirección real cuando el sitio esté publicado.) Si alguien pierde
su link, no pasa nada: abre el sitio normal y mete su clave en el sobre.

> Como ahora la familia entra solo con la clave, **asegúrate de que ninguna clave se
> repita** en la columna E. Si dos familias comparten clave, entrarían a la misma.

---

## Cómo se usa / preguntas comunes

- **¿Cómo le aviso a cada familia su clave?** Lo más cómodo es mandarle su **link
  personalizado** (arriba). Si prefieres, también puedes darle solo su clave para que la
  escriba en el sobre.
- **Cambié el script `.gs`, ¿qué hago?** Vuelve a pegar todo el contenido del archivo y
  **publica una versión nueva** (Implementar → Gestionar implementaciones → lápiz → Nueva
  versión) para conservar la misma URL. Sin esto, la entrada por clave sola no funcionará.
- **¿Y si necesito reabrir una confirmación?** En la pestaña `Familias`, borra el `SÍ`
  de la columna *confirmado* de esa familia. Podrán volver a enviar.
- **¿Pueden invitar a alguien de más?** No: el formulario solo muestra los nombres que
  tú pusiste en la fila de esa familia. No hay forma de agregar a nadie más.
- **¿Y si alguien no va?** En el formulario, la familia desmarca la casilla *Asiste* de
  esa persona. Se guarda como `No`.
- **La lista para el acomodo de mesas** está en la pestaña `Confirmaciones`: una fila por
  invitado, con su nombre y si asiste (`Sí`/`No`).
- **¿Cómo aviso a cada familia su mesa?** La semana de la boda, en la pestaña `Familias`
  escribe el número de mesa en la **columna G** de cada familia. Cuando la familia entre
  al sitio con su misma clave, verá su mesa en la pantalla de confirmación. No tienes que
  mandar nada: la mayoría reabre el sitio el día del evento para ver la ubicación y la
  hora, y ahí mismo encontrará su mesa. (Recomendado: avisa con un mensaje y/o un plano
  impreso en la entrada para quien no reabra el sitio.)
