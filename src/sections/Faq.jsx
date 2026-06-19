import { useLang } from '../i18n.jsx'

export default function Faq() {
  const { t } = useLang()

  return (
    <section id="preguntas" className="bg-cream px-6 pt-12 pb-24 text-ink sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-2xl">
        <header className="reveal text-center">
          <h2 className="mt-3 font-display text-[clamp(1.75rem,5vw,2.75rem)]">{t.faq.title}</h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-moss/40" />
        </header>

        <dl className="reveal mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {t.faq.items.map((item, i) => (
            <details key={i} className="group py-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg text-ink marker:hidden">
                <span>{item.q}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5 shrink-0 text-moss transition-transform duration-300 group-open:rotate-180"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-4 pr-9 text-sm leading-relaxed text-ink/70 sm:text-base">{item.a}</p>
            </details>
          ))}
        </dl>
      </div>
    </section>
  )
}
