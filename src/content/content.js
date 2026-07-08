// ============================================================
// CONTENIDO DEL SITIO — edita este archivo, no los componentes.
// Cambios aquí (textos, fotos, hoteles, colores) se reflejan
// solos al recargar; no hace falta tocar nada más.
// ============================================================

export const config = {
  couple: {
    novio: "Cristian",
    novia: "Priscila",
  },
  // Fecha y hora de la ceremonia (zona CDMX)
  weddingDateISO: "2026-10-17T00:00:00-06:00",
  weddingMonth: "octubre",
  weddingDay: "17",
  weddingYear: "2026",
  weddingWeekday: "sábado",
  weddingTime: "12:00 pm",
  rsvpDeadline: "26/septiembre",

  // Lugar
  venueName: "Casa de Lago — Jardín de Eventos",
  venueAddress:
    "2do. Rtno. de Bosques de Viena Ocho 172, Bosques del Lago, 54766 Cuautitlán Izcalli, Méx.",
  mapsUrl: "https://maps.app.goo.gl/TuKR8VZhTP3TEcze7",

  // Mesa de regalos
  liverpoolUrl:
    "https://mesaderegalos.liverpool.com.mx/milistaderegalos/52024083",
  amazonUrl: "https://www.amazon.com.mx/wedding/share/bodacrisypris",

  // Foto para el módulo de "Los más pequeños" (acuarela del castillo/inflable).
  // Guarda la imagen en /public y pon aquí su ruta (ej. "/ninos.jpg"). Vacío = sin foto.
  kidsImage: "", // TODO(Cris & Pris): agregar acuarela del castillo

  // Datos bancarios
  bankDetails: {
    bank: "BBVA",
    holder: "Cristian Molina",
    clabe: "012164015265662306",
    account: "1526566230",
    swift: "BCMRMXMMPYM",
  },
  // WhatsApp para dudas — PONER NÚMERO REAL antes de compartir el sitio Formato: código de país + número, solo dígitos. Ej: '5215512345678'
  whatsappNumber: "(+52)55 3948 0008", // TODO(Cris & Pris): número pendiente
  welcomeImage: "../public/luna.jpg", // TODO(Cris & Pris): foto pendiente

  // URL del Web App de Google Apps Script que valida familia+clave y guarda
  // las confirmaciones en la hoja de cálculo. Pega aquí la URL que te da
  // Google al publicar el script (ver scripts/RSVP-SETUP.md). Termina en /exec
  rsvpApiUrl:
    "https://script.google.com/macros/s/AKfycbzzD6UVoYMR0SHZ8CAyJU22AulEfdEcJJfHUr-kzhZ61HzWmZztjUnTPhb8_MKneFGQ/exec", // TODO(Cris & Pris): pegar URL del Web App

  // Colores del código de vestimenta — cambiar hex y nombre cuando estén definidos
  // tonos sacados del video (atardecer → girasoles → anochecer); muted = vestible
  dressColors: [
    { hex: "#dfa79e", es: "Rosa palo", en: "Dusty rose" },
    { hex: "#a28ebf", es: "Lila", en: "Lilac" },
    { hex: "#9aa356", es: "Verde olivo", en: "Olive" },
    { hex: "#daa772", es: "Camel", en: "Camel" },
    { hex: "#84aebf", es: "Azul niebla", en: "Misty blue" },
  ],

  hotels: [
    {
      name: "Hotel ibis México Perinorte",
      es: "Ver información.",
      en: "View info.",
      url: "https://maps.app.goo.gl/7iKddTbW6pmw93mv7",
    },
    {
      name: "One Cuautitlán",
      es: "Ver información.",
      en: "View info.",
      url: "https://maps.app.goo.gl/THimjVZiPMMTTVaW9",
    },
    {
      name: "Fiesta Inn Cuautitlán",
      es: "Ver información.",
      en: "View info.",
      url: "https://maps.app.goo.gl/VSUJG2fQ1ZZpCRGU7",
    },
  ],

  story: [
    {
      photo: "/photos/1.png",
      es: { title: "Nos conocimos estudiando programación el mismo equipo" },
      en: { title: "We met while studying programming on the same team" },
    },
    {
      photo: "/photos/2.jpg",
      es: { title: "Dios nos ayudaría con la distancia que nos separaba" },
      en: { title: "God would help us bridge the distance that separated us" },
    },
    {
      photo: "/photos/3.jpg",
      es: {
        title: "Después de citas en línea, esta fue la primera cita en persona",
      },
      en: {
        title: "After many offline dates, this was our first date in person",
      },
    },
    {
      photo: "/photos/4.jpg",
      es: { title: "Hemos tenido muchas aventuras juntos" },
      en: { title: "We have had many adventures together" },
    },
    {
      photo: "/photos/5.jpg",
      es: { title: "En mayo del año pasado nos hicimos novios" },
      en: { title: "In May of last year, we became boyfriends" },
    },
    {
      photo: "/photos/7.jpg",
      es: { title: "Este año decidimos dar el paso para un futuro juntos" },
      en: {
        title: "We've decided to take the next step for a future together",
      },
    },
    {
      photo: "/photos/6.jpg",
      es: { title: "Te invitamos a celebrar nuestra union ante Dios" },
      en: { title: "We invite you to celebrate our union before God" },
    },
  ],
};

export const content = {
  es: {
    nav: { rsvp: "Confirmar" },
    heroBible: "Dios lo hizo perfecto en su tiempo.  Eclesiastés 3:11",
    hero: {
      announce: "¡Nuestra boda!",
      names: "{t.couple.novio} & {t.couple.novia}",
      invite: "y nos encantaría celebrar este día con ustedes",
      dateLine:
        "{t.weddingWeekday}, {t.weddingDay} de {t.weddingMonth} · {t.weddingTime}",
      venueLine: "{t.venueName} · Cuautitlán Izcalli",
      cta: "Confirmar asistencia",
      deadline: "Por favor responde antes del {t.rsvpDeadline}",
    },
    countdown: {
      title: "faltan",
      days: "días",
      hours: "horas",
      minutes: "min",
      seconds: "seg",
      passed: "¡Llegó el gran día!",
    },
    welcome: {
      hint: "Toca para abrir",
      cta: "Abrir invitación",
      flap: "con amor",
      toLabel: "Para",
      fromLabel: "De",
      toGuest: "Nuestro invitado",
      title: "Estás invitado",
      claveLabel: "Tu clave de invitación",
      clavePlaceholder: "Ej. gar-482",
      claveHelp: "La encuentras en tu invitación.",
      openBtn: "Abrir",
      enterBtn: "Entrar",
      checking: "Un momento…",
      greeting: "Hola, {familia}",
      greetingNote: "Pasa, te estábamos esperando 🤍",
      notFound: "No encontramos esa clave. Revísala o escríbenos por WhatsApp.",
    },
    story: { eyebrow: "Los novios", title: "Nosotros 🤍" },
    ceremony: {
      title: "Nuestro gran día",
      timeLabel: "{t.weddingTime}",
      directions: "Cómo llegar",
    },
    dress: {
      eyebrow: "Código de vestimenta",
      title: "Formal de día",
      note: "Paleta sugerida:",
    },
    modulos: {
      title: "Antes del gran día",
      note: "Toca cada módulo para ver los detalles.",
      hint: "Toca para abrir",
      close: "Cerrar",
      items: {
        dress: {
          label: "Código de vestimenta",
          teaser: "Formal de día · paleta sugerida",
        },
        faq: { label: "Preguntas frecuentes", teaser: "Resolvemos tus dudas" },
        kids: { label: "Los más pequeños", teaser: "Diversión para los niños" },
        itinerary: { label: "Itinerario", teaser: "El orden del día" },
      },
    },
    kids: {
      title: "Los más pequeños",
      body: "Queremos que toda la familia disfrute este día. Durante la recepción habrá un {highlight} para que los niños jueguen y se diviertan.",
      highlight: "inflable",
    },
    itinerary: {
      title: "Itinerario del día",
      note: "Horarios tentativos — los confirmaremos cerca de la fecha.",
      items: [
        { time: "12:00", label: "Recepción de invitados" },
        { time: "12:30", label: "Ceremonia religiosa" },
        { time: "14:00", label: "Cóctel de bienvenida y fotos" },
        { time: "15:30", label: "Comida" },
        { time: "16:30", label: "Primer baile" },
        { time: "19:00", label: "Pastel" },
        { time: "20:00", label: "Fin y desalojo del salón" },
      ],
    },
    rsvp: {
      title: "Confirma tu asistencia",
      deadline: "Responde antes del {t.rsvpDeadline}",
      note: "Nos ayuda muchísimo para apartar tu lugar.",
      comingSoon:
        "El formulario estará disponible muy pronto. ¡Vuelve por aquí!",
      checking: "Un momento…",
      noLinkTitle: "Abre tu invitación personalizada",
      noLinkText:
        "Para confirmar tu asistencia, entra desde el link que te enviamos por WhatsApp. Si no lo encuentras, escríbenos y con gusto te lo reenviamos.",
      noLinkWhatsapp: "Escríbenos por WhatsApp",
      greeting: "Hola, {familia}",
      greetingFamily: "Hola, familia {familia}",
      reserved:
        "Estas son las personas que tenemos contempladas para ustedes. Marca a quienes podrán acompañarnos",
      soloIntro: "Nos encantaría contar contigo. ¿Confirmas tu asistencia?",
      soloYes: "Sí, asistiré",
      soloNo: "No podré asistir",
      attends: "Asiste",
      mesaLabel: "Tu mesa",
      submitBtn: "Enviar confirmación",
      submitting: "Enviando…",
      errorGeneric: "Algo salió mal. Inténtalo de nuevo en un momento.",
      back: "Volver",
      alreadyTitle: "Ya tenemos tu respuesta",
      alreadyText: "¡Gracias por confirmar, nos vemos muy pronto.!",
      thanksTitle: "¡Gracias por confirmar! 🤍",
      thanksText:
        "Nos vemos muy pronto. Con cariño, {t.couple.novio} y {t.couple.novia}.",
      returnForTable: "Vuelve antes del gran día para ver tu mesa asignada.",
    },
    registry: {
      eyebrow: "Mesa de regalos",
      title: "Tu presencia es nuestro regalo",
      note: "Si deseas tener un detalle con nosotros:",
      ctaLiver: "Ver opciones en Liverpool",
      ctaAmazon: "Ver opciones en Amazon",
      note2: "O si prefieres apoyarnos para nuestra Luna de Miel🤍",
      ctaBanco: "Ver datos bancarios",
      bankTitle: "Datos bancarios",
      bankBank: "Banco",
      bankHolder: "Titular",
      bankClabe: "CLABE",
      bankAccount: "Cuenta",
      bankCard: "Tarjeta",
      bankSwift: "SWIFT",
      bankClose: "Cerrar",
      bankCopied: "¡Copiado!",
    },
    hotels: {
      eyebrow: "Hospedaje",
      title: "Para quienes vienen de fuera",
      note: "Sugerencias de hoteles cerca del jardín.",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Resolvemos tus dudas",
      items: [
        {
          q: "¿Hasta cuándo puedo confirmar mi asistencia?",
          a: "Le solicitamos confirmar antes del {t.rsvpDeadline} Saber con tiempo cuántos seremos nos ayuda muchísimo a organizar los lugares.",
        },
        {
          q: "¿Puedo asistir con niños?",
          a: "Sí, los niños son bienvenidos. Contaremos con un inflable para su entretenimiento.",
        },
        {
          q: "¿Puedo registrar invitados extra?",
          a: "Sus pases asignados están cubiertos. Si requiere un lugar extra, contáctenos directamente antes de la fecha límite para validarlo.",
        },
        {
          q: "¿Habrá estacionamiento en el lugar?",
          a: "Sí, el jardín cuenta con valet parking (con costo). Por seguridad, sugerimos no dejar objetos de valor en su vehículo.",
        },
        {
          q: "¿Qué recomendaciones debo considerar por el clima?",
          a: "Para su comodidad en el jardín, le sugerimos usar protección solar de día y traer un abrigo para la noche.",
        },
        {
          q: "¿Habrá bebidas alcohólicas?",
          a: "No, el evento será libre de alcohol. Disfrutaremos de una gran variedad de opciones de bebidas sin contenido alcohólico.",
        },
      ],
    },
    footer: {
      signoff: "Con amor,",
      signature: "Cris & Pris",
      closing: "Te esperamos con todo el corazón.",
    },
  },

  en: {
    nav: { rsvp: "RSVP" },
    heroBible:
      "He has made everything beautiful in its time.  Ecclesiastes 3:11",
    hero: {
      announce: "We're getting married!",
      names: "Cris & Pris",
      invite: "and we'd love to celebrate this day with you",
      dateLine: "Saturday, October 17, 2026 · 12:00 pm",
      venueLine: "Casa de Lago — Jardín de Eventos · Cuautitlán Izcalli",
      cta: "RSVP",
      deadline: "Please reply by September 10, 2026",
    },
    countdown: {
      title: "Countdown",
      days: "days",
      hours: "hours",
      minutes: "min",
      seconds: "sec",
      passed: "The big day is here!",
    },
    welcome: {
      hint: "Tap to open",
      cta: "Open invitation",
      flap: "with love",
      toLabel: "To",
      fromLabel: "From",
      toGuest: "Our guest",
      title: "You're invited",
      claveLabel: "Your invitation code",
      clavePlaceholder: "e.g. gar-482",
      claveHelp: "You can find it on your invitation.",
      openBtn: "Open",
      enterBtn: "Enter",
      checking: "One moment…",
      greeting: "Hello, {familia}",
      greetingNote: "Come in, we've been waiting for you 🤍",
      notFound:
        "We could not find that code. Please check it or message us on WhatsApp.",
    },
    story: { eyebrow: "The couple", title: "Us 🤍" },
    ceremony: {
      title: "Our big day",
      timeLabel: "Ceremony · 12:00 pm",
      directions: "Get directions",
    },
    dress: {
      eyebrow: "Dress code",
      title: "Daytime formal",
      note: "Suggested palette:",
    },
    modulos: {
      title: "Before the big day",
      note: "Tap each module to see the details.",
      hint: "Tap to open",
      close: "Close",
      items: {
        dress: {
          label: "Dress code",
          teaser: "Daytime formal · suggested palette",
        },
        faq: { label: "FAQ", teaser: "Your questions, answered" },
        kids: { label: "For the little ones", teaser: "Fun for the kids" },
        itinerary: { label: "Itinerary", teaser: "The order of the day" },
      },
    },
    kids: {
      title: "For the little ones",
      body: "We want the whole family to enjoy this day. During the reception there will be a {highlight} so the kids can play and have fun.",
      highlight: "bounce house",
    },
    itinerary: {
      title: "Schedule for the day",
      note: "Times are tentative — we'll confirm them closer to the date.",
      items: [
        { time: "12:00", label: "Guests arrive" },
        { time: "12:30", label: "Religious ceremony" },
        { time: "14:00", label: "Welcome cocktail and photos" },
        { time: "15:30", label: "Lunch" },
        { time: "16:30", label: "First dance" },
        { time: "19:00", label: "Cake cutting" },
        { time: "20:00", label: "End of the event please vacate the venue" },
      ],
    },
    rsvp: {
      title: "RSVP",
      deadline: "Please reply by September 10, 2026",
      note: "It helps us save your seat.",
      comingSoon: "The form will be available very soon. Check back here!",
      checking: "One moment…",
      noLinkTitle: "Open your personal invitation",
      noLinkText:
        "To RSVP, please open the site from the link we sent you on WhatsApp. If you can’t find it, message us and we’ll gladly resend it.",
      noLinkWhatsapp: "Message us on WhatsApp",
      greeting: "Hello, {familia}",
      greetingFamily: "Hello, {familia} family",
      reserved:
        "These are the guests we have reserved for you. Check who will be able to join us",
      soloIntro: "We'd love to have you with us. Will you be joining us?",
      soloYes: "Yes, I'll be there",
      soloNo: "I won't be able to attend",
      attends: "Attending",
      mesaLabel: "Your table",
      submitBtn: "Send confirmation",
      submitting: "Sending…",
      errorGeneric: "Something went wrong. Please try again in a moment.",
      back: "Back",
      alreadyTitle: "We already have your reply",
      alreadyText:
        "Thank you! This invitation was already confirmed. If you need to make a change, please message us on WhatsApp.",
      thanksTitle: "Thank you for confirming! 🤍",
      thanksText:
        "See you very soon. With love, {t.couple.novio} & {t.couple.novia}.",
      returnForTable:
        "Come back before the big day to see your assigned table.",
    },
    registry: {
      eyebrow: "Gift registry",
      title: "Your presence is our gift",
      note: "If you would also like to give us something:",
      ctaLiver: "View registry at Liverpool",
      ctaAmazon: "View registry on Amazon",
      note2: "Or if you prefer to help us with our honeymoon",
      ctaBanco: "View bank details",
      bankTitle: "Bank details",
      bankIntro: "For your contribution to our honeymoon:",
      bankBank: "Bank",
      bankHolder: "Account holder",
      bankClabe: "CLABE",
      bankAccount: "Account",
      bankCard: "Card",
      bankSwift: "SWIFT",
      bankClose: "Close",
      bankCopied: "Copied!",
    },
    hotels: {
      eyebrow: "Lodging",
      title: "Coming from out of town?",
      note: "Hotel suggestions near the venue — special rates coming soon.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Your questions, answered",
      items: [
        {
          q: "Until when can I confirm my attendance?",
          a: "Please RSVP before {t.rsvpDeadline}. Knowing the headcount in advance helps us greatly in organizing the seating layout.",
        },
        {
          q: "Can I bring children?",
          a: "Yes, children are welcome. We will have a bounce house for their entertainment.",
        },
        {
          q: "Can I register extra guests?",
          a: "Your assigned passes are fully covered. If you need an extra spot, please contact us directly before the deadline to check availability.",
        },
        {
          q: "Will there be parking at the venue?",
          a: "Yes, the venue offers valet parking (at a cost). For security reasons, we suggest not leaving valuables inside your vehicle.",
        },
        {
          q: "What should I consider regarding the weather?",
          a: "For your comfort at the garden, we suggest bringing an umbrella to stay dry in case of rain and a light jacket for cooler temperatures.",
        },
        {
          q: "Will alcoholic beverages be served?",
          a: "No, the event will be alcohol-free. We will enjoy a wide variety of refreshing non-alcoholic beverage options.",
        },
      ],
    },
    footer: {
      signoff: "With love,",
      signature: "Cris & Pris",
      closing: "We can't wait to celebrate with you.",
    },
  },
};
