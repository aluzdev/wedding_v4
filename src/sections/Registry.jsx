import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import Petals from './Petals.jsx'

export default function Registry() {
  const { t } = useLang()
  const [bankOpen, setBankOpen] = useState(false)

  return (
    <section
      id="regalos"
      className="relative overflow-hidden bg-night px-6 py-10 text-linen sm:py-28"
    >
      <Petals tone="dark" />

      <div className="relative mx-auto max-w-2xl text-center">
        <header className="reveal">
          <h2 className="mx-auto max-w-lg font-display text-[clamp(1.75rem,5vw,2.75rem)] leading-tight">
            {t.registry.title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-sage/40" />
        </header>

        <p className="reveal mx-auto mt-6 max-w-md text-sm leading-relaxed text-linen/90 sm:text-base">
          {t.registry.note}
        </p>

        {/* registry links: stacked on phones, side by side with breathing room on web */}
        <div className="reveal mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {config.liverpoolUrl ? (
            <a
              href={config.liverpoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-night transition-opacity hover:opacity-90"
            >
              {t.registry.ctaLiver}
            </a>
          ) : null}

          {config.amazonUrl ? (
            <a
              href={config.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-night transition-opacity hover:opacity-90"
            >
              {t.registry.ctaAmazon}
            </a>
          ) : null}
        </div>

        <p className=" mx-auto mt-5 max-w-md text-sm leading-relaxed text-linen/90 sm:text-base">
          {t.registry.note2}
        </p>

        {config.bankDetails ? (
          <button
            type="button"
            onClick={() => setBankOpen(true)}
            className="reveal mt-8 inline-block rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-night transition-opacity hover:opacity-90"
          >
            {t.registry.ctaBanco}
          </button>
        ) : null}
      </div>

      {bankOpen ? (
        <BankModal details={config.bankDetails} t={t} onClose={() => setBankOpen(false)} />
      ) : null}
    </section>
  )
}

function BankModal({ details, t, onClose }) {
  const [copied, setCopied] = useState(null)

  // close on Escape; lock body scroll while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s+/g, ''))
      setCopied(label)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  const rows = [
    [t.registry.bankBank, details.bank],
    [t.registry.bankHolder, details.holder],
    [t.registry.bankClabe, details.clabe],
    [t.registry.bankAccount, details.account],
    [t.registry.bankCard, details.card],
  ].filter(([, value]) => value)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.registry.bankTitle}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 px-6 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-cream p-7 text-left text-ink shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.registry.bankClose}
          className="absolute right-4 top-4 text-ink/50 transition-colors hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h3 className="font-display text-2xl">{t.registry.bankTitle}</h3>
        <p className="mt-2 text-sm text-ink/70">{t.registry.bankIntro}</p>

        <dl className="mt-6 space-y-4">
          {rows.map(([label, value]) => (
            <div key={label} className="border-b border-ink/10 pb-3">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-moss">{label}</dt>
              <dd className="mt-1 flex items-center justify-between gap-3">
                <span className="font-mono text-sm text-ink sm:text-base">{value}</span>
                <button
                  type="button"
                  onClick={() => copy(label, value)}
                  className="shrink-0 rounded-full border border-moss/40 px-3 py-1 text-[11px] tracking-wide text-moss transition-colors hover:bg-moss/10"
                >
                  {copied === label ? t.registry.bankCopied : '⧉'}
                </button>
              </dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={onClose}
          className="mt-7 w-full rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-night transition-opacity hover:opacity-90"
        >
          {t.registry.bankClose}
        </button>
      </div>
    </div>
  )
}
