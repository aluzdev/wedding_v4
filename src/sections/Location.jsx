import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
// logos oficiales (simple-icons, CC0) — solo se empaquetan estos dos
import { siGooglemaps, siWaze } from 'simple-icons'

// "Cómo llegar": misma gramática que las otras secciones crema (Regalos,
// Fotos): título Fraunces itálico, enredadera en la esquina y píldora salvia.
// El mapa se ve normal; tocarlo abre un selector Google Maps / Waze. Debajo,
// dos botones directos (Maps y Waze) que abren la ruta sin preguntar.
// ponytail: embed por query (?q=…&output=embed) — no requiere API key.
const PLACE = `${config.venueName}, ${config.venueAddress}`
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(PLACE)}&output=embed`
// El botón traza la ruta (acción distinta al "abrir" de la tarjeta de Google).
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(PLACE)}`
const WAZE_URL = `https://waze.com/ul?q=${encodeURIComponent(PLACE)}&navigate=yes`

function BrandIcon({ icon, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  )
}

export default function Location() {
  const { t, lang } = useLang()
  const [open, setOpen] = useState(false)
  const en = lang === 'en'

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
            className="relative block aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
          />
          {/* capa transparente: cualquier clic en el mapa abre el selector */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.location.mapTitle}
            className="absolute inset-0 z-10 cursor-pointer bg-transparent"
          />
        </div>

        {/* botones directos: abren la app (o la web) con la ruta ya trazada.
            El selector (modal) solo aparece al tocar el mapa. */}
        {/* colores de marca: azul Google (#1A73E8, el tono accesible de Google
            para botones; 4.5:1 con blanco) y cian Waze (#33CCFF, texto oscuro) */}
        <div className="reveal mx-auto mt-8 flex max-w-xs flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold tracking-wide shadow-md transition duration-200 ease-out hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto bg-[#1A73E8] text-white hover:bg-[#1765CC] focus-visible:ring-[#1A73E8]"
          >
            <BrandIcon icon={siGooglemaps} className="h-5 w-5" />
            {t.location.cta}
          </a>
          <a
            href={WAZE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold tracking-wide shadow-md transition duration-200 ease-out hover:scale-[1.03] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream sm:w-auto bg-[#33CCFF] text-[#0A2540] hover:bg-[#1FC2F9] focus-visible:ring-[#0A2540]"
          >
            <BrandIcon icon={siWaze} className="h-5 w-5" />
            {t.location.ctaWaze}
          </a>
        </div>

        {/* portal a <body>: fuera de la sección (overflow/transform/z-index)
            para que el modal cubra toda la pantalla */}
        {open ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-night/70 px-4 py-6 backdrop-blur-sm sm:items-center"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-cream p-6 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-display text-xl text-ink">{en ? 'Open with' : 'Abrir con'}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition bg-[#1A73E8] text-white hover:bg-[#1765CC]"
                >
                  <BrandIcon icon={siGooglemaps} className="h-5 w-5" />
                  Google Maps
                </a>
                <a
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition bg-[#33CCFF] text-[#0A2540] hover:bg-[#1FC2F9]"
                >
                  <BrandIcon icon={siWaze} className="h-5 w-5" />
                  Waze
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-1 text-sm text-ink/60 underline-offset-4 hover:underline"
                >
                  {en ? 'Cancel' : 'Cancelar'}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        ) : null}
      </div>
    </section>
  )
}
