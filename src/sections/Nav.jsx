import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8">
      <a href="#inicio" className="font-display text-lg tracking-wide text-linen drop-shadow-sm">
        C&nbsp;&amp;&nbsp;P
      </a>
      <div className="flex items-center gap-3">
        <div
          role="group"
          aria-label="Idioma / Language"
          className="flex overflow-hidden rounded-full bg-glow/10 text-xs font-medium tracking-wide text-linen ring-1 ring-glow/15 backdrop-blur-md"
        >
          {['es', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`px-3 py-1.5 uppercase transition-colors ${
                lang === code ? 'bg-linen/90 text-night' : 'hover:bg-glow/10'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
        <a
          href="#rsvp"
          className="hidden rounded-full bg-glow/10 px-4 py-1.5 text-xs font-medium tracking-wide text-linen ring-1 ring-glow/15 backdrop-blur-md transition-colors hover:bg-glow/20 sm:block"
        >
          {t.nav.rsvp}
        </a>
      </div>
    </header>
  )
}
