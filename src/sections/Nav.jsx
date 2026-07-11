import { useEffect, useState } from 'react'
import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()
  // La barra es transparente sobre el hero; al hacer scroll gana un fondo
  // navy con blur para que el texto claro siga legible sobre las secciones
  // color crema (Fotos, Regalos), donde antes quedaba invisible.
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-colors duration-300 sm:px-8 ${
        scrolled
          ? 'bg-night/85 shadow-sm backdrop-blur-md'
          : 'bg-gradient-to-b from-night/70 via-night/25 to-transparent'
      }`}
    >
      <a href="#inicio" className="font-display text-lg tracking-wide text-linen drop-shadow-sm">
        C&nbsp;&amp;&nbsp;P
      </a>
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Selector de idioma: segmented limpio — track con padding y el idioma
            activo como pill redondeado adentro. */}
        <div
          role="group"
          aria-label="Idioma / Language"
          className="flex items-center gap-1 rounded-full bg-glow/15 p-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-glow/25 backdrop-blur-md"
        >
          {['es', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`rounded-full px-3 py-1 transition-colors ${
                lang === code ? 'bg-linen text-night' : 'text-linen/80 hover:text-linen'
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        {/* RSVP: CTA dorado, prominente y visible también en móvil */}
        <a
          href="#rsvp"
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-night shadow-md transition-transform duration-200 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none sm:px-5 sm:text-sm"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 21s-7-4.35-9.5-8.5C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 7C19 16.65 12 21 12 21Z" />
          </svg>
          {t.nav.rsvp}
        </a>
      </div>
    </header>
  )
}
