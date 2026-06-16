// ============================================================
// CONTENIDO DEL SITIO — edita este archivo, no los componentes.
// Cambios aquí (textos, fotos, hoteles, colores) se reflejan
// solos al recargar; no hace falta tocar nada más.
// ============================================================

export const config = {
  // Fecha y hora de la ceremonia (zona CDMX)
  weddingDateISO: '2026-10-17T17:12:00-21:00',
  rsvpDeadline: '2026-09-10',

  // Lugar
  venueName: 'Casa de Lago — Jardín de Eventos',
  venueAddress: '2do. Rtno. de Bosques de Viena Ocho 172, Bosques del Lago, 54766 Cuautitlán Izcalli, Méx.',
  mapsUrlAmazon: 'https://maps.app.goo.gl/TuKR8VZhTP3TEcze7',
  mapsUrlLiverpool: 'https://maps.app.goo.gl/TuKR8VZhTP3TEcze7',

  // Mesa de regalos
  registryUrl: 'https://www.amazon.com.mx/wedding/share/bodacrisypris',

  // WhatsApp para dudas — PONER NÚMERO REAL antes de compartir el sitio
  // Formato: código de país + número, solo dígitos. Ej: '5215512345678'
  whatsappNumber: '', // TODO(Cris & Pris): número pendiente

  // URL de "embed" del Google Form de RSVP — pegar aquí cuando exista.
  // En el Form: Enviar → < > → copiar el src del iframe.
  rsvpFormEmbedUrl: '', // TODO(Cris & Pris): crear el formulario (ver README)

  // Colores del código de vestimenta — cambiar hex y nombre cuando estén definidos
  dressColors: [
    { hex: '#c86a7a', es: 'Rosa' },
    { hex: '#b7a9c9', es: 'Lila' },
    { hex: '#a8bba2', es: 'Verde' },
    { hex: '#e2b087', es: 'Ocre' },
    { hex: '#90b1d8', es: 'Azul' },
  ],

  // Hoteles sugeridos — llenar cuando haya tarifas; photo opcional (ruta en /public)
  hotels: [
    { name: 'Hotel por confirmar', es: 'Información y tarifas en camino.', en: 'Details and rates coming soon.', url: '' },
    { name: 'Hotel por confirmar', es: 'Información y tarifas en camino.', en: 'Details and rates coming soon.', url: '' },
    { name: 'Hotel por confirmar', es: 'Información y tarifas en camino.', en: 'Details and rates coming soon.', url: '' },
  ],

  // Nuestra historia — 5 momentos; photo: ruta dentro de /public (ej. '/photos/01.jpg')
  story: [
    { photo: '', es: { title: 'Cómo nos conocimos', text: 'Texto por escribir — cuenta aquí el primer capítulo.' }, en: { title: 'How we met', text: 'Text to be written — the first chapter goes here.' } },
    { photo: '', es: { title: 'La primera cita', text: 'Texto por escribir.' }, en: { title: 'The first date', text: 'Text to be written.' } },
    { photo: '', es: { title: 'Un viaje juntos', text: 'Texto por escribir.' }, en: { title: 'A trip together', text: 'Text to be written.' } },
    { photo: '', es: { title: 'La propuesta', text: 'Texto por escribir.' }, en: { title: 'The proposal', text: 'Text to be written.' } },
    { photo: '', es: { title: 'Rumbo al altar', text: 'Texto por escribir.' }, en: { title: 'On our way to the altar', text: 'Text to be written.' } },
  ],
}

export const content = {
  es: {
    nav: { rsvp: 'Confirmar' },
    hero: {
      announce: '¡Nos casamos!!!',
      names: 'Cris & Pris',
    },
    countdown: {
      title: 'faltan',
      days: 'días', hours: 'horas', minutes: 'min', seconds: 'seg',
      passed: '¡Llegó el gran día!',
    },
    story: { eyebrow: 'Los novios', title: 'Nuestra historia' },
    ceremony: {

      title: 'Cuándo y dónde',
      dateLabel: '17 de octubre de 2026',
      timeLabel: '12:00 pm',
      directions: 'Cómo llegar',
    },
    dress: {
      eyebrow: 'Código de vestimenta',
      title: 'Formal de día',
      note: 'Paleta sugerida:',
    },
    rsvp: {
      eyebrow: 'Tu respuesta',
      title: 'Confirma tu asistencia',
      deadline: 'Responde antes del 10 de septiembre de 2026',
      note: 'Nos ayuda muchísimo para apartar tu lugar.',
      open: 'Abrir formulario',
      comingSoon: 'El formulario estará disponible muy pronto. ¡Vuelve por aquí!',
    },
    registry: {
      eyebrow: 'Mesa de regalos',
      title: 'Tu presencia es nuestro mejor regalo',
      note: 'Si además quieres tener un detalle con nosotros:',
      ctaLiver: 'Ver mesa de regalos en Liperpool',
      ctaAmazon: 'Ver mesa de regalos en Amazon',
      note2: 'O si prefieres apoyarnos para nuestra Luna de miel',
      ctaBanco: 'Ver datos bacarios',
    },
    hotels: {
      eyebrow: 'Hospedaje',
      title: 'Para quienes vienen de fuera',
      note: 'Sugerencias de hoteles cerca del jardín — pronto con tarifas especiales.',
    },
    footer: {
      questions: '¿Tienes dudas? Escríbenos',
      whatsapp: 'WhatsApp',
      whatsappPrefill: 'Hola Cris y Pris, tengo una pregunta sobre la boda 🤍',
      closing: 'Te esperamos con todo el corazón.',
    },
  },
  en: {
    nav: { rsvp: 'RSVP' },
    hero: {
      announce: "We're getting married!",
      names: 'Cris & Pris',
      invite: "and we'd love to celebrate this day with you",
      dateLine: 'October 10, 2026 · 5:00 pm',
      venueLine: 'Casa de Lago — Jardín de Eventos · Cuautitlán Izcalli',
      cta: 'RSVP',
      deadline: 'Please reply by September 1, 2026',
    },
    countdown: {
      title: 'Countdown',
      days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec',
      passed: 'The big day is here!',
    },
    story: { eyebrow: 'The couple', title: 'Our story' },
    ceremony: {
      eyebrow: 'The ceremony',
      title: 'When & where',
      dateLabel: 'Friday, October 10, 2026',
      timeLabel: 'Ceremony · 5:00 pm',
      directions: 'Get directions',
    },
    dress: {
      eyebrow: 'Dress code',
      title: 'Formal',
      note: "We'd love to see you in one of these four colors:",
      pending: 'Final colors will be announced soon.',
    },
    rsvp: {
      eyebrow: 'Your reply',
      title: 'RSVP',
      deadline: 'Please reply by September 1, 2026',
      note: 'It helps us save your seat.',
      open: 'Open the form',
      comingSoon: 'The form will be available very soon. Check back here!',
    },
    registry: {
      eyebrow: 'Gift registry',
      title: 'Your presence is our gift',
      note: 'If you would also like to give us something:',
      cta: 'View our Amazon registry',
    },
    hotels: {
      eyebrow: 'Lodging',
      title: 'Coming from out of town?',
      note: 'Hotel suggestions near the venue — special rates coming soon.',
    },
    footer: {
      questions: 'Questions? Write to us',
      whatsapp: 'WhatsApp',
      whatsappPrefill: 'Hi Cris & Pris, I have a question about the wedding 🤍',
      closing: "We can't wait to celebrate with you.",
    },
  },
}
