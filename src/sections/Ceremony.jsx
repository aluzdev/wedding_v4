import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import Petals from './Petals.jsx'

export default function Ceremony() {
  const { t } = useLang()

  return (
    <section
      id="ceremonia"
      className="relative overflow-hidden bg-night px-6 py-24 text-linen sm:py-32"
    >
      <Petals tone="dark" />

      <div className="relative mx-auto max-w-2xl text-center">
        <header className="reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sage">{t.ceremony.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.ceremony.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-sage/40" />
        </header>

        <div className="reveal mt-12 rounded-2xl bg-white/10 px-6 py-10 ring-1 ring-white/15 backdrop-blur-md sm:px-10">
          <p className="font-display text-2xl text-gold sm:text-3xl">{t.ceremony.dateLabel}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.15em] text-linen/70">
            {t.ceremony.timeLabel}
          </p>

          <span aria-hidden="true" className="mx-auto mt-8 block h-px w-12 bg-white/15" />

          <p className="mt-8 font-display text-lg text-linen sm:text-xl">{config.venueName}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-linen/65">
            {config.venueAddress}
          </p>

          <a
            href={config.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-linen/90 px-6 py-2.5 text-sm font-medium tracking-wide text-night transition-colors hover:bg-linen"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
            </svg>
            {t.ceremony.directions}
          </a>
        </div>
      </div>
    </section>
  )
}
