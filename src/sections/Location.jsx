import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

// "Cómo llegar": misma gramática que las otras secciones crema (Regalos,
// Fotos): título Fraunces itálico, enredadera en la esquina y píldora salvia.
// El mapa va teñido en la paleta del sitio (papel/sepia) y recupera su color al
// pasar el mouse, para poder leerlo.
// ponytail: embed por query (?q=…&output=embed) — no requiere API key.
const PLACE = `${config.venueName}, ${config.venueAddress}`
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(PLACE)}&output=embed`
// El botón traza la ruta (acción distinta al "abrir" de la tarjeta de Google).
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(PLACE)}`

export default function Location() {
  const { t } = useLang()

  return (
    <section id="como-llegar" className="surface-cream relative overflow-hidden px-6 py-16 sm:py-24">
      {/* enredadera en la esquina superior derecha (espejo de la de Fotos) */}
      <img
        src="/flower-photo-preview.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-0 top-0 z-0 w-32 -scale-x-100 select-none sm:w-48"
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <header className="reveal">
          <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,6vw,3.25rem)] italic leading-[1.1] text-balance">
            {t.location.title}
          </h2>
          <p className="mt-4 font-display text-lg text-ink sm:text-xl">{config.venueName}</p>
        </header>

        {/* la dirección vive detrás del mapa: se ve mientras carga (o si el
            mapa no puede cargarse) y no se duplica con la tarjeta de Google */}
        <div className="reveal relative mt-8 overflow-hidden rounded-2xl bg-ink/5 shadow-md ring-1 ring-ink/10">
          <p className="absolute inset-0 flex items-center justify-center px-8 text-sm leading-relaxed text-ink/70">
            {config.venueAddress}
          </p>
          <iframe
            src={MAP_SRC}
            title={t.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="relative block aspect-[4/3] w-full border-0 grayscale sepia-[0.35] contrast-[0.95] transition-[filter] duration-500 ease-out hover:grayscale-0 hover:sepia-0 hover:contrast-100 sm:aspect-[16/9]"
          />
        </div>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-8 inline-flex items-center gap-2 rounded-full bg-sage/30 px-7 py-3 text-sm font-medium tracking-wide text-moss ring-1 ring-moss/20 transition duration-200 ease-out hover:scale-[1.04] hover:bg-sage/50"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          {t.location.cta}
        </a>
      </div>
    </section>
  )
}
