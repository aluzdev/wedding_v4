import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'

export default function Dress() {
  const { lang, t } = useLang()

  return (
    <section id="dress-code" className="bg-cream px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <header className="reveal">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.dress.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <p className="reveal mx-auto mt-8 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.dress.note}
        </p>

        <ul className="reveal mx-auto mt-10 grid w-fit grid-cols-3 justify-items-center gap-6 sm:gap-10 lg:grid-cols-5">
          {config.dressColors.map((color, i) => (
            <li key={i} className="flex flex-col items-center gap-3">
              <span
                className="h-16 w-16 rounded-full shadow-md ring-1 ring-hairline/10 sm:h-20 sm:w-20"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs tracking-wide text-ink/60">{color[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
