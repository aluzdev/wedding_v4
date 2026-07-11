import { useLang } from '../i18n.jsx'

export default function Nav() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8">
      <a href="#inicio" className="font-display text-lg tracking-wide text-linen drop-shadow-md">
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
          className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-night shadow-md transition-transform duration-200 ease-out hover:scale-[1.04] focus-visible:scale-[1.04] focus-visible:outline-none sm:px-5 sm:text-sm"
        >
          {/* ancho estable entre idiomas: el sizer invisible reserva el ancho de la
              etiqueta más larga (Confirmar) para que la UI no brinque al cambiar idioma */}
          <span className="grid justify-items-center">
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">
              Confirmar
            </span>
            <span className="col-start-1 row-start-1">{t.nav.rsvp}</span>
          </span>
        </a>
      </div>
    </header>
  )
}
