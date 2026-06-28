// ============================================================
// CONTENIDO DEL SITIO — edita este archivo, no los componentes.
// Cambios aquí (textos, fotos, hoteles, colores) se reflejan
// solos al recargar; no hace falta tocar nada más.
// ============================================================

export const config = {

  couple: {
    novio: 'Cristian',
    novia: 'Priscila',
  },
  // Fecha y hora de la ceremonia (zona CDMX)
  weddingDateISO: '2026-10-17T00:00:00-06:00',
  weddingMonth: 'octubre',
  weddingDay: '17',
  weddingYear: '2026',
  weddingWeekday: 'sábado',
  weddingTime: '12:00 pm',
  rsvpDeadline: '26/septiembre',

  // Lugar
  venueName: 'Casa de Lago — Jardín de Eventos',
  venueAddress: '2do. Rtno. de Bosques de Viena Ocho 172, Bosques del Lago, 54766 Cuautitlán Izcalli, Méx.',
  mapsUrl: 'https://maps.app.goo.gl/TuKR8VZhTP3TEcze7',

  // Mesa de regalos
  liverpoolUrl: 'https://mesaderegalos.liverpool.com.mx/milistaderegalos/52024083',
  amazonUrl: 'https://www.amazon.com.mx/wedding/share/bodacrisypris',

  // Datos bancarios
  bankDetails: {
    bank: 'BBVA',
    holder: 'Cristian Molina',
    clabe: '012 164 01526566230 6',
    account: '152 656 6230',
    swift: 'BCMRMXMMPYM',
  },
  // WhatsApp para dudas — PONER NÚMERO REAL antes de compartir el sitio Formato: código de país + número, solo dígitos. Ej: '5215512345678'
  whatsappNumber: '(+52)55 3948 0008', // TODO(Cris & Pris): número pendiente

  // Foto de fondo de la pantalla de bienvenida (el sobre). Pon aquí la ruta de
  // una imagen dentro de /public, ej. '/photos/welcome.jpg'. Si la dejas vacía,
  // se usa un degradado cálido de jardín.
  welcomeImage: '../public/luna.jpg', // TODO(Cris & Pris): foto pendiente

  // URL del Web App de Google Apps Script que valida familia+clave y guarda
  // las confirmaciones en la hoja de cálculo. Pega aquí la URL que te da
  // Google al publicar el script (ver scripts/RSVP-SETUP.md). Termina en /exec
  rsvpApiUrl: 'https://script.google.com/macros/s/AKfycby9HRK4q7jJs6tWCEramlcMWJJKnJjOhhCIdBHQlac5NmswZR0v8FhE4jTVkNZgc3U1/exec', // TODO(Cris & Pris): pegar URL del Web App

  // Colores del código de vestimenta — cambiar hex y nombre cuando estén definidos
  // tonos sacados del video (atardecer → girasoles → anochecer); muted = vestible
  dressColors: [
    { hex: '#dfa79e', es: 'Rosa palo', en: 'Dusty rose' },
    { hex: '#a28ebf', es: 'Lila', en: 'Lilac' },
    { hex: '#9aa356', es: 'Verde olivo', en: 'Olive' },
    { hex: '#daa772', es: 'Camel', en: 'Camel' },
    { hex: '#84aebf', es: 'Azul niebla', en: 'Misty blue' },
  ],

  // Hoteles sugeridos — llenar cuando haya tarifas; photo opcional (ruta en /public)
  hotels: [
    { name: 'Hotel por confirmar', es: 'Información y tarifas en camino.', en: 'Details and rates coming soon.', url: '' },
    { name: 'Hotel por confirmar', es: 'Información y tarifas en camino.', en: 'Details and rates coming soon.', url: '' }
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
  heroBible: 'Dios lo hizo perfecto en su tiempo.  Eclesiastés 3:11',
  hero: {
    announce: '¡Nuestra boda!',
    names: '{t.couple.novio} & {t.couple.novia}',
    invite: "y nos encantaría celebrar este día con ustedes",
    dateLine: '{t.weddingWeekday}, {t.weddingDay} de {t.weddingMonth} · {t.weddingTime}',
    venueLine: '{t.venueName} · Cuautitlán Izcalli',
    cta: 'Confirmar asistencia',
    deadline: 'Por favor responde antes del {t.rsvpDeadline}',
  },
  countdown: {
    title: 'faltan',
    days: 'días', hours: 'horas', minutes: 'min', seconds: 'seg',
    passed: '¡Llegó el gran día!',
  },
  welcome: {
    hint: 'Toca para abrir',
    cta: 'Abrir invitación',
    flap: 'con amor',
    toLabel: 'Para',
    fromLabel: 'De',
    toGuest: 'Nuestro invitado',
    title: 'Estás invitado',
    claveLabel: 'Tu clave de invitación',
    clavePlaceholder: 'Ej. gar-482',
    claveHelp: 'La encuentras en tu invitación.',
    openBtn: 'Abrir',
    enterBtn: 'Entrar',
    checking: 'Un momento…',
    greeting: 'Hola, {familia}',
    greetingNote: 'Pasa, te estábamos esperando 🤍',
    notFound: 'No encontramos esa clave. Revísala o escríbenos por WhatsApp.',
  },
  story: { eyebrow: 'Los novios', title: 'Nosotros 🤍' },
  ceremony: {
    title: 'Nuestro gran día',
    timeLabel: '{t.weddingTime}',
    directions: 'Cómo llegar',
  },
  dress: {
    eyebrow: 'Código de vestimenta',
    title: 'Formal de día',
    note: 'Paleta sugerida:',
  },
  rsvp: {
    title: 'Confirma tu asistencia',
    deadline: 'Responde antes del {t.rsvpDeadline}',
    note: 'Nos ayuda muchísimo para apartar tu lugar.',
    comingSoon: 'El formulario estará disponible muy pronto. ¡Vuelve por aquí!',
    checking: 'Un momento…',
    noLinkTitle: 'Abre tu invitación personalizada',
    noLinkText: 'Para confirmar tu asistencia, entra desde el link que te enviamos por WhatsApp. Si no lo encuentras, escríbenos y con gusto te lo reenviamos.',
    noLinkWhatsapp: 'Escríbenos por WhatsApp',
    greeting: 'Hola, {familia}',
    reserved: 'Estas son las personas que tenemos contempladas para ustedes. Marca a quienes podrán acompañarnos',
    soloIntro: 'Nos encantaría contar contigo. ¿Confirmas tu asistencia?',
    soloYes: 'Sí, asistiré',
    soloNo: 'No podré asistir',
    attends: 'Asiste',
    mesaLabel: 'Tu mesa',
    submitBtn: 'Enviar confirmación',
    submitting: 'Enviando…',
    errorGeneric: 'Algo salió mal. Inténtalo de nuevo en un momento.',
    back: 'Volver',
    alreadyTitle: 'Ya tenemos tu confirmación',
    alreadyText: '¡Gracias! Esta invitación ya fue confirmada. Si necesitas hacer un cambio, escríbenos por WhatsApp.',
    thanksTitle: '¡Gracias por confirmar! 🤍',
    thanksText: 'Nos vemos muy pronto. Con cariño, {t.couple.novio} y {t.couple.novia}.',
  },
  registry: {
    eyebrow: 'Mesa de regalos',
    title: 'Tu presencia es nuestro regalo',  
    note: 'Si deseas tener un detalle con nosotros:',
    ctaLiver: 'Ver opciones en Liverpool',
    ctaAmazon: 'Ver opciones en Amazon',
    note2: 'O si prefieres apoyarnos para nuestra Luna de Miel',
    ctaBanco: 'Ver datos bancarios',
    bankTitle: 'Datos bancarios',
    bankIntro: 'Para tu aportación a nuestra Luna de miel:',
    bankBank: 'Banco',
    bankHolder: 'Titular',
    bankClabe: 'CLABE',
    bankAccount: 'Cuenta',
    bankCard: 'Tarjeta',
    bankSwift: 'SWIFT',
    bankClose: 'Cerrar',
    bankCopied: '¡Copiado!',
  },
  hotels: {
    eyebrow: 'Hospedaje',
    title: 'Para quienes vienen de fuera',
    note: 'Sugerencias de hoteles cerca del jardín.',
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Resolvemos tus dudas',
    items: [
      {
        q: '¿Puedo llevar a mis hijos?',
        a: 'Los niños también son bienvenidos, cada invitación indica el número de lugares reservados a tu nombre.'
      },
      {
        q: '¿Cuál es el código de vestimenta?',
        a: 'Formal de día. Más abajo encontrarás la paleta de colores sugerida; nos encantaría verte en alguno de esos tonos.',
      },
      {
        q: '¿Hasta cuándo puedo confirmar mi asistencia?',
        a: 'Te pedimos confirmar antes del {t.rsvpDeadline}. Saber con tiempo cuántos seremos nos ayuda muchísimo a organizar los lugares.',
      },
      {
        q: '¿Habrá estacionamiento en el lugar?',
        a: 'Sí, el jardín cuenta con estacionamiento para los invitados. Te recomendamos llegar unos 20 minutos antes de la hora de la ceremonia.',
      },
    ],
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
    heroBible: 'He has made everything beautiful in its time.  Ecclesiastes 3:11',
    hero: {
      announce: "We're getting married!",
      names: 'Cris & Pris',
      invite: "and we'd love to celebrate this day with you",
      dateLine: 'Saturday, October 17, 2026 · 12:00 pm',
      venueLine: 'Casa de Lago — Jardín de Eventos · Cuautitlán Izcalli',
      cta: 'RSVP',
      deadline: 'Please reply by September 10, 2026',
    },
    countdown: {
      title: 'Countdown',
      days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec',
      passed: 'The big day is here!',
    },
    welcome: {
      hint: 'Tap to open',
      cta: 'Open invitation',
      flap: 'with love',
      toLabel: 'To',
      fromLabel: 'From',
      toGuest: 'Our guest',
      title: "You're invited",
      claveLabel: 'Your invitation code',
      clavePlaceholder: 'e.g. gar-482',
      claveHelp: 'You can find it on your invitation.',
      openBtn: 'Open',
      enterBtn: 'Enter',
      checking: 'One moment…',
      greeting: 'Hello, {familia}',
      greetingNote: "Come in, we've been waiting for you 🤍",
      notFound: 'We could not find that code. Please check it or message us on WhatsApp.',
    },
    story: { eyebrow: 'The couple', title: 'Us 🤍' },
    ceremony: {
      title: 'Our big day',
      timeLabel: 'Ceremony · 12:00 pm',
      directions: 'Get directions',
    },
    dress: {
      eyebrow: 'Dress code',
      title: 'Daytime formal',
      note: 'Suggested palette:',
    },
    rsvp: {
      title: 'RSVP',
      deadline: 'Please reply by September 10, 2026',
      note: 'It helps us save your seat.',
      comingSoon: 'The form will be available very soon. Check back here!',
      checking: 'One moment…',
      noLinkTitle: 'Open your personal invitation',
      noLinkText: 'To RSVP, please open the site from the link we sent you on WhatsApp. If you can’t find it, message us and we’ll gladly resend it.',
      noLinkWhatsapp: 'Message us on WhatsApp',
      greeting: 'Hello, {familia}',
      reserved: 'These are the guests we have reserved for you. Check who will be able to join us',
      soloIntro: "We'd love to have you with us. Will you be joining us?",
      soloYes: "Yes, I'll be there",
      soloNo: "I won't be able to attend",
      attends: 'Attending',
      mesaLabel: 'Your table',
      submitBtn: 'Send confirmation',
      submitting: 'Sending…',
      errorGeneric: 'Something went wrong. Please try again in a moment.',
      back: 'Back',
      alreadyTitle: 'We already have your reply',
      alreadyText: 'Thank you! This invitation was already confirmed. If you need to make a change, please message us on WhatsApp.',
      thanksTitle: 'Thank you for confirming! 🤍',
      thanksText: 'See you very soon. With love, {t.couple.novio} & {t.couple.novia}.',
    },
    registry: {
      eyebrow: 'Gift registry',
      title: 'Your presence is our gift',
      note: 'If you would also like to give us something:',
      ctaLiver: 'View registry at Liverpool',
      ctaAmazon: 'View registry on Amazon',
      note2: 'Or if you prefer to help us with our honeymoon',
      ctaBanco: 'View bank details',
      bankTitle: 'Bank details',
      bankIntro: 'For your contribution to our honeymoon:',
      bankBank: 'Bank',
      bankHolder: 'Account holder',
      bankClabe: 'CLABE',
      bankAccount: 'Account',
      bankCard: 'Card',
      bankSwift: 'SWIFT',
      bankClose: 'Close',
      bankCopied: 'Copied!',
    },
    hotels: {
      eyebrow: 'Lodging',
      title: 'Coming from out of town?',
      note: 'Hotel suggestions near the venue — special rates coming soon.',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Your questions, answered',
      items: [
        {
          q: 'Can I bring a plus-one or my kids?',
          a: 'Each invitation lists the number of seats reserved in your name. To keep within capacity, please honor that number. If you have any questions, feel free to message us on WhatsApp.',
        },
        {
          q: 'What is the dress code?',
          a: 'Daytime formal. You will find the suggested color palette below — we would love to see you in one of those tones.',
        },
        {
          q: 'When should I RSVP by?',
          a: 'Please reply by {t.rsvpDeadline}. Knowing how many we will be ahead of time helps us a lot with seating.',
        },
        {
          q: 'Is there parking at the venue?',
          a: 'Yes, the venue has parking for guests. We recommend arriving about 20 minutes before the ceremony.',
        },
      ],
    },
    footer: {
      questions: 'Questions? Write to us',
      whatsapp: 'WhatsApp',
      whatsappPrefill: 'Hi Cris & Pris, I have a question about the wedding 🤍',
      closing: "We can't wait to celebrate with you.",
    },
  },
}