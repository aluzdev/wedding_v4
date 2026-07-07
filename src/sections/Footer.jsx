import { useLang } from '../i18n.jsx'
import Petals from './Petals.jsx'

// El footer cierra la invitación como una carta: la línea cálida, la firma a
// mano (Pinyon Script) y los datos del día. Sin CTAs — es despedida, no trámite.
export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="surface-footer relative overflow-hidden px-6 py-[clamp(5rem,12vw,8rem)] text-center">
      <Petals tone="light" />

      <div className="reveal relative mx-auto max-w-xl">
        {/* ramita — bookend del cierre botánico del hero, en verde sobre papel */}
        <Sprig />

        <p className="mx-auto mt-8 max-w-md font-display text-[clamp(1.35rem,4vw,1.9rem)] [font-style:oblique_12deg] leading-snug text-ink text-balance">
          {t.footer.closing}
        </p>

        <p className="mt-10 text-sm italic text-ink/55">{t.footer.signoff}</p>
        {/* la firma: escrita a mano, en la tinta azul de la boda */}
        <p className="mt-1 font-script text-[clamp(3rem,11vw,5rem)] leading-none text-night">
          {t.footer.signature}
        </p>

        <span aria-hidden="true" className="mx-auto mt-10 block h-px w-16 bg-ink/15" />

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-moss sm:text-sm">
          {t.hero.dateLine}
        </p>
        <p className="mt-2 text-sm text-ink/60">{t.hero.venueLine}</p>
      </div>
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
