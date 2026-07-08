import { useLang } from '../i18n.jsx'

// El footer cierra la invitación como una carta: la línea cálida, la firma a
// mano (Pinyon Script) y los datos del día. Sin CTAs — es despedida, no trámite.
export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="surface-night relative isolate overflow-hidden px-6 pt-8 pb-14 text-center min-[420px]:pb-20 min-[500px]:pb-28 min-[700px]:pb-44">
      <div className="reveal relative z-10 mx-auto max-w-xl">
        {/* ramita — bookend del cierre botánico del hero, en verde sobre papel */}
        <Sprig />

        <p className="mx-auto mt-8 max-w-md font-display text-[clamp(1.35rem,4vw,1.9rem)] [font-style:oblique_12deg] leading-snug text-linen text-balance">
          {t.footer.closing}
        </p>

        <p className="mt-8 text-sm italic text-linen/60">{t.footer.signoff}</p>
        {/* la firma: escrita a mano, en la tinta azul de la boda */}
        <p className="mt-1 font-script text-[clamp(3rem,11vw,5rem)] leading-none text-cream">
          {t.footer.signature}
        </p>
      </div>

      {/* pradera de flores en línea, pegada al borde inferior */}
      <img
        src="/photo_bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full select-none object-cover object-bottom opacity-90 sm:h-40 md:h-44"
        // ponytail: opacity is the calibration knob si la imagen resalta demasiado
      />
    </footer>
  )
}

// misma teardrop-hoja del hero, en pareja simétrica con un punto al centro
function Sprig() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-1.5 text-moss">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 rotate-[40deg]" fill="currentColor">
        <path d="M10 0C13 6 20 8 20 13a10 10 0 0 1-20 0C0 8 7 6 10 0Z" />
      </svg>
      <span className="h-1 w-1 rounded-full bg-current opacity-80" />
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 -rotate-[40deg]" fill="currentColor">
        <path d="M10 0C13 6 20 8 20 13a10 10 0 0 1-20 0C0 8 7 6 10 0Z" />
      </svg>
    </div>
  )
}
