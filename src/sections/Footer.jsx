import { useLang } from '../i18n.jsx'

// El footer cierra la invitación como una carta: la línea cálida, la firma a
// mano (Pinyon Script) y los datos del día. Sin CTAs — es despedida, no trámite.
export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="surface-footer relative overflow-hidden px-6 py-[clamp(5rem,12vw,8rem)] text-center">
      {/* laurel estático de contorno, detrás del contenido */}
      <LaurelBackdrop />

      <div className="reveal relative z-10 mx-auto max-w-xl">
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

// ── Laurel geométrico ──────────────────────────────────────────────
// Una rama = tallo (curva Bézier) + hojas de contorno colocadas por
// matemática de la curva (limpias y simétricas, no trazo a mano). Se
// dibuja la rama derecha y se espeja para la izquierda: enmarca el
// contenido como una corona de laurel abierta arriba y abajo.

const rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]
const n2 = (x, y) => { const m = Math.hypot(x, y) || 1; return [x / m, y / m] }

// hoja de contorno: almendra desde `base` en dirección `phi`, largo L, ancho W
function leafPath([bx, by], phi, L, W) {
  const [dx, dy] = [Math.cos(phi), Math.sin(phi)]
  const [px, py] = [-dy, dx] // perpendicular
  const tip = [bx + L * dx, by + L * dy]
  const mid = [bx + (L / 2) * dx, by + (L / 2) * dy]
  const c1 = [mid[0] + W * px, mid[1] + W * py]
  const c2 = [mid[0] - W * px, mid[1] - W * py]
  return `M${bx.toFixed(1)} ${by.toFixed(1)} Q${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${tip[0].toFixed(1)} ${tip[1].toFixed(1)} Q${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`
}

// rama derecha, calculada una vez al cargar el módulo
const BRANCH = (() => {
  const P0 = [86, 172], P1 = [124, 10], P2 = [54, -172] // tallo: sube por la derecha
  const bez = (t) => {
    const m = 1 - t
    return [
      m * m * P0[0] + 2 * m * t * P1[0] + t * t * P2[0],
      m * m * P0[1] + 2 * m * t * P1[1] + t * t * P2[1],
    ]
  }
  const der = (t) => [
    2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]),
    2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]),
  ]
  const tilt = (34 * Math.PI) / 180
  const leaves = []
  const N = 11
  for (let i = 0; i < N; i++) {
    const t = 0.05 + (0.92 * i) / (N - 1)
    const base = bez(t)
    const [tx, ty] = n2(...der(t))
    const side = i % 2 === 0 ? 1 : -1
    const [dx, dy] = rot(tx, ty, side * tilt)
    const phi = Math.atan2(dy, dx)
    const L = 18 + 13 * Math.sin(Math.PI * t) // hojas del centro más largas
    leaves.push(leafPath(base, phi, L, L * 0.34))
  }
  const stem = `M${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`
  const tip = bez(1)
  return { stem, leaves, tip }
})()

function LaurelBackdrop() {
  const branch = (
    <>
      <path d={BRANCH.stem} />
      {BRANCH.leaves.map((d, i) => <path key={i} d={d} />)}
      {/* pequeño capullo de flor en la punta */}
      <circle cx={BRANCH.tip[0]} cy={BRANCH.tip[1] - 6} r="3.4" />
    </>
  )
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden text-moss"
    >
      <svg
        viewBox="-165 -200 330 410"
        className="h-[122%] w-auto max-w-none opacity-[0.16]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g>{branch}</g>
        <g transform="scale(-1,1)">{branch}</g>
      </svg>
    </div>
  )
}
