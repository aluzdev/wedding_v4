import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import Petals from './Petals.jsx'

export default function Registry() {
  const { t } = useLang()

  return (
    <section
      id="regalos"
      className="relative overflow-hidden bg-night px-6 py-24 text-linen sm:py-32"
    >
      <Petals tone="dark" />

      <div className="relative mx-auto max-w-2xl text-center">
        <header className="reveal">
          <p className="text-[11px] uppercase tracking-[0.25em] text-sage">{t.registry.eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-lg font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-tight">
            {t.registry.title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-sage/40" />
        </header>

        <p className="reveal mx-auto mt-8 max-w-md text-sm leading-relaxed text-linen/70 sm:text-base">
          {t.registry.note}
        </p>

        {config.registryUrl ? (
          <a
            href={config.registryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-8 inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-night transition-opacity hover:opacity-90"
          >
            {t.registry.cta}
          </a>
        ) : null}
      </div>
    </section>
  )
}
