import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8">
      <a href="#inicio" aria-label="Cris & Pris — inicio" className="inline-flex shrink-0">
        <img
          src="/wedding_logo_trasnparent.png"
          alt="Cris & Pris"
          className="h-12 w-auto drop-shadow-md sm:h-14"
        />
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
              className={`rounded-full px-3 py-1 ${
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
          className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-xs font-medium tracking-normal text-night shadow-sm transition-transform duration-200 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none sm:px-5"
        >
          {/* corazón limpio (estilo material) — pequeño y sólido */}
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          {t.nav.rsvp}
        </a>
      </div>
    </header>
  )
}
