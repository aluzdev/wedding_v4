import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import Motes from './Motes.jsx'

export default function Hotels() {
  const { lang, t } = useLang()

  return (
    <section
      id="hospedaje"
      className="surface-cream relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24 sm:pb-32"
    >
      <Motes />
      <div className="relative mx-auto max-w-3xl">
        {/* left-aligned header breaks the centered cadence of the page */}
        <header className="reveal max-w-md">
          <h2 className="font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.hotels.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">{t.hotels.note}</p>
        </header>

        <ul className="reveal mt-10 grid gap-4 sm:grid-cols-2">
          {config.hotels.map((hotel, i) => (
            <li key={i}>
              <a
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full gap-4 rounded-2xl border border-ink/10 bg-cream-soft px-5 py-5 transition-colors hover:border-moss/40 hover:bg-cream-soft/80"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-cream ring-1 ring-moss/20">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg text-cream">{hotel.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream">{hotel[lang]}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
