import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

// "Cómo llegar": nombre + dirección del jardín, mapa de Google embebido y un
// botón para abrirlo en la app de Maps. Crema para romper entre las dos
// secciones navy (countdown arriba, módulos abajo).
// ponytail: embed por query (?q=…&output=embed) — no requiere API key.
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  `${config.venueName}, ${config.venueAddress}`,
)}&output=embed`

export default function Location() {
  const { t } = useLang()

  return (
    <section id="como-llegar" className="surface-cream px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="reveal font-display text-[clamp(1.75rem,5vw,2.75rem)] text-balance">
          {t.location.title}
        </h2>

        <p className="reveal mt-4 font-display text-lg text-ink sm:text-xl">
          {config.venueName}
        </p>
        <p className="reveal mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
          {config.venueAddress}
        </p>

        <div className="reveal mt-8 overflow-hidden rounded-2xl shadow-md ring-1 ring-ink/10">
          <iframe
            src={MAP_SRC}
            title={t.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block aspect-[4/3] w-full border-0 sm:aspect-[16/9]"
          />
        </div>

        <a
          href={config.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal mt-8 inline-flex items-center gap-2 rounded-full bg-night px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm transition duration-200 ease-out hover:scale-[1.04] hover:bg-night-soft"
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
