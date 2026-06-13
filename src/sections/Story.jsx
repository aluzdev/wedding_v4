import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

export default function Story() {
  const { lang, t } = useLang()

  return (
    <section id="historia" className="bg-cream px-6 py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-3xl">
        <header className="reveal text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-moss">{t.story.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.5rem)]">{t.story.title}</h2>
        </header>

        <ol className="relative mt-14 space-y-14 border-l border-moss/25 pl-8 sm:mt-20 sm:space-y-20 sm:[border-left:none] sm:pl-0">
          {config.story.map((moment, i) => {
            const m = moment[lang]
            const even = i % 2 === 0
            return (
              <li
                key={m.title}
                className={`reveal relative sm:flex sm:items-center sm:gap-10 ${
                  even ? '' : 'sm:flex-row-reverse'
                }`}
              >
                {/* timeline dot (mobile rail) */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.45rem] top-1 h-3 w-3 rounded-full bg-moss ring-4 ring-cream sm:hidden"
                />
                {/* photo frame — placeholder until real photos land in /public */}
                <div className="mb-5 sm:mb-0 sm:w-1/2">
                  <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-cream-soft ring-1 ring-moss/20">
                    {moment.photo ? (
                      <img
                        src={moment.photo}
                        alt={m.title}
                        loading="lazy"
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    ) : (
                      <span className="font-display text-5xl text-moss/30">{i + 1}</span>
                    )}
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <h3 className="font-display text-xl text-ink sm:text-2xl">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">{m.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
