import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

export default function Dress() {
  const { lang, t } = useLang()

  return (
    <section id="dress-code" className="bg-cream px-6 py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <header className="reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] text-moss">{t.dress.eyebrow}</p>
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.dress.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <p className="reveal mx-auto mt-8 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.dress.note}
        </p>

        <ul className="reveal mt-10 flex flex-wrap items-start justify-center gap-6 sm:gap-10">
          {config.dressColors.map((color, i) => (
            <li key={i} className="flex flex-col items-center gap-3">
              <span
                className="h-16 w-16 rounded-full shadow-md ring-1 ring-black/10 sm:h-20 sm:w-20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs tracking-wide text-ink/60">{color[lang]}</span>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 text-xs italic text-ink/45">{t.dress.pending}</p>
      </div>
    </section>
  )
}
