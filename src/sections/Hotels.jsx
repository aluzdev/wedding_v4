import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

export default function Hotels() {
  const { lang, t } = useLang()

  return (
    <section id="hospedaje" className="bg-cream px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-4xl">
        <header className="reveal text-center">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.hotels.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <p className="reveal mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.hotels.note}
        </p>

        <ul className="reveal mt-12 grid gap-6 sm:grid-cols-2">
          {config.hotels.map((hotel, i) => {
            const body = (
              <>
                <h3 className="font-display text-lg text-ink">{hotel.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{hotel[lang]}</p>
                {hotel.url ? (
                  <span className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em] text-moss">
                    {lang === 'es' ? 'Ver hotel →' : 'View hotel →'}
                  </span>
                ) : null}
              </>
            )
            const cardClass =
              'block h-full rounded-2xl bg-cream-soft px-6 py-7 ring-1 ring-black/5 shadow-sm'
            return (
              <li key={i}>
                {hotel.url ? (
                  <a
                    href={hotel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} transition-shadow hover:shadow-md`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className={cardClass}>{body}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
