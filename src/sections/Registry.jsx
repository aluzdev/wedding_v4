import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import Petals from './Petals.jsx'

export default function Registry() {
  const { t } = useLang()

  return (
    <section
      id="regalos"
      className="surface-cream relative overflow-hidden px-6 py-10 sm:py-28"
    >
      <Petals tone="light" />

      <img
        src="/flor-registry-preview.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[210px] w-[120px] select-none"
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <header className="reveal">
          <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,6vw,3.25rem)] italic leading-[1.1] text-balance">
            {t.registry.title}
          </h2>
        </header>

        <p className="reveal mx-auto mt-7 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.registry.note}
        </p>

        {/* the two store registries are options → ghost pills */}
        <div className="reveal mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          {config.amazonUrl ? (
            <a
              href={config.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-sage/30 px-7 py-3 text-sm font-medium tracking-wide text-moss ring-1 ring-moss/20 transition duration-200 ease-out hover:scale-[1.04] hover:bg-sage/50"
            >
              {t.registry.ctaAmazon}
            </a>
          ) : null}

          {config.liverpoolUrl ? (
            <a
              href={config.liverpoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-sage/30 px-7 py-3 text-sm font-medium tracking-wide text-moss ring-1 ring-moss/20 transition duration-200 ease-out hover:scale-[1.04] hover:bg-sage/50"
            >
              {t.registry.ctaLiver}
            </a>
          ) : null}
        </div>

        {config.liverpoolUrl ? (
          <p className="reveal mt-4 text-xs tracking-wide text-ink/70 sm:text-sm">
            {t.registry.liverEvent}
          </p>
        ) : null}

        {/* The honeymoon / bank-details CTA and its modal were removed so the
            account data no longer ships in the public bundle. To bring them
            back, restore this block, the BankModal component and
            config.bankDetails (content.js) from git history. */}
      </div>
    </section>
  )
}
