import { useLang } from '../i18n.jsx'
import { config, content } from '../content/content.js'

export default function Footer() {
  const { lang, t } = useLang()
  const waLink = config.whatsappNumber
    ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(content[lang].footer.whatsappPrefill)}`
    : ''

  return (
    <footer className="bg-night px-6 py-20 text-center text-linen sm:py-24">
      <div className="reveal mx-auto max-w-xl">
        <p className="font-display text-3xl text-linen sm:text-4xl">{t.hero.names}</p>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-gold/90">
          {t.hero.dateLine}
        </p>

        <span aria-hidden="true" className="mx-auto mt-8 block h-px w-16 bg-sage/40" />

        <p className="mt-8 text-sm text-linen/70">{t.footer.questions}</p>
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium tracking-wide text-linen ring-1 ring-white/15 backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.74.46 3.44 1.32 4.94L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7-1.87-1.87-4.35-2.92-6.99-2.92Zm5.8 14.16c-.24.68-1.42 1.32-1.96 1.36-.5.04-.98.22-3.32-.7-2.8-1.1-4.58-3.96-4.72-4.14-.14-.18-1.14-1.52-1.14-2.9 0-1.38.72-2.06 1-2.34a1.04 1.04 0 0 1 .76-.36c.18 0 .36 0 .52.01.18.01.4-.06.62.48.24.56.78 1.94.84 2.08.06.14.1.3.02.48-.08.18-.12.3-.24.46-.12.16-.26.36-.36.48-.12.14-.24.3-.1.54.14.24.62 1.02 1.32 1.66.92.82 1.68 1.08 1.92 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.42.66 1.66.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z" />
            </svg>
            {t.footer.whatsapp}
          </a>
        ) : null}

        <p className="mt-10 text-sm italic text-linen/60">{t.footer.closing}</p>
      </div>
    </footer>
  )
}
