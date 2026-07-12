import { useLang } from '../i18n.jsx'

// Cierre participativo: los invitados escanean el QR y suben sus fotos a la
// galería compartida. Cream para hacer contraste con el footer oscuro.
export default function Photos() {
  const { t } = useLang()

  return (
    <section
      id="fotos"
      className="surface-cream relative overflow-hidden px-6 py-16 sm:py-24"
    >
      <img
        src="/flower-photo-preview.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 w-40 select-none sm:w-56"
      />

      <div className="reveal relative z-10 mx-auto flex max-w-md flex-col items-center text-center">
        <p className="font-display text-xs uppercase tracking-[0.35em] text-moss">
          {t.photos.eyebrow}
        </p>

        <h2 className="mt-4 font-display text-[clamp(2rem,6vw,3.25rem)] italic leading-[1.1] text-balance">
          {t.photos.title}
        </h2>

        <img
          src="/QR.png"
          alt={t.photos.title}
          className="mt-9 h-44 w-44 rounded-2xl bg-white p-2 shadow-lg ring-1 ring-ink/10 sm:h-52 sm:w-52"
        />

        <p className="mt-7 max-w-xs text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.photos.note}
        </p>
      </div>
    </section>
  )
}
