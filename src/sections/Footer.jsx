import { useLang } from '../i18n.jsx'

// El footer cierra la invitación como una carta: la línea cálida, la firma a
// mano (Pinyon Script) y los datos del día. Sin CTAs — es despedida, no trámite.
export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="surface-footer relative isolate overflow-hidden px-6 pt-[clamp(5rem,12vw,8rem)] pb-[clamp(8rem,20vw,13rem)] text-center">
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
      </div>

      {/* pradera de flores en línea, estática, pegada al borde inferior */}
      <Meadow />
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

// ── Pradera de flores silvestres, solo líneas ──────────────────────
// Motivos botánicos de contorno (margarita, amapola, tulipán, helecho,
// vara de capullos) dibujados con matemática de curva para que las líneas
// queden limpias. Se componen a lo ancho, más densos en las orillas, y
// crecen hacia arriba desde el borde inferior. Estático, transparente.

const f = (n) => Math.round(n * 10) / 10
// pétalo/hoja de contorno (almendra) desde base en dirección ang
function almond(cx, cy, ang, len, w) {
  const dx = Math.cos(ang), dy = Math.sin(ang)
  const px = -dy, py = dx
  const tx = cx + len * dx, ty = cy + len * dy
  const mx = cx + (len / 2) * dx, my = cy + (len / 2) * dy
  return `M${f(cx)} ${f(cy)} Q${f(mx + w * px)} ${f(my + w * py)} ${f(tx)} ${f(ty)} Q${f(mx - w * px)} ${f(my - w * py)} ${f(cx)} ${f(cy)}`
}
// tallo curvo desde (0,0) hasta la cabeza en (0,-H)
const stem = (H, bend = 0) => `M0 0 Q${f(bend)} ${f(-H * 0.55)} 0 ${f(-H)}`
const UP = -Math.PI / 2

function Daisy({ H = 60, r = 12, n = 9, bend = 4 }) {
  const head = -H
  const petals = []
  for (let k = 0; k < n; k++) petals.push(almond(0, head, (k / n) * 2 * Math.PI, r, r * 0.34))
  return (
    <>
      <path d={stem(H, bend)} />
      {petals.map((d, i) => <path key={i} d={d} />)}
      <circle cx="0" cy={f(head)} r={f(r * 0.26)} />
    </>
  )
}

function Poppy({ H = 70, r = 18, bend = 8 }) {
  const head = -H
  const angs = [UP, UP - 0.85, UP + 0.85, UP - 1.7, UP + 1.7]
  return (
    <>
      <path d={stem(H, bend)} />
      {angs.map((a, i) => <path key={i} d={almond(0, head, a, r, r * 0.52)} />)}
      <circle cx="0" cy={f(head)} r="3" />
    </>
  )
}

function Tulip({ H = 64, r = 20, bend = 3 }) {
  const head = -H
  return (
    <>
      <path d={stem(H, bend)} />
      <path d={almond(0, head, UP, r, r * 0.3)} />
      <path d={almond(0, head, UP - 0.36, r * 0.9, r * 0.28)} />
      <path d={almond(0, head, UP + 0.36, r * 0.9, r * 0.28)} />
    </>
  )
}

function Fern({ H = 110, pairs = 7 }) {
  const leaves = []
  for (let k = 1; k <= pairs; k++) {
    const t = k / (pairs + 1)
    const y = -H * t
    const len = 15 * (1 - t * 0.55)
    leaves.push(almond(0, y, UP + 0.75, len, len * 0.3))
    leaves.push(almond(0, y, UP - 0.75, len, len * 0.3))
  }
  return (
    <>
      <path d={`M0 0 Q4 ${f(-H * 0.5)} 0 ${f(-H)}`} />
      {leaves.map((d, i) => <path key={i} d={d} />)}
      <path d={almond(0, -H, UP, 12, 3)} />
    </>
  )
}

function BudStem({ H = 92, buds = 6 }) {
  const items = []
  const dots = []
  for (let k = 0; k < buds; k++) {
    const t = k / (buds - 1)
    const y = -H * (0.32 + 0.66 * t)
    const side = k % 2 ? 1 : -1
    const bx = side * 7 * (1 - t)
    items.push(almond(bx, y, UP + side * 0.9, 9, 2.6))
    dots.push([bx + side * 7, y - 6])
  }
  return (
    <>
      <path d={stem(H, 5)} />
      {items.map((d, i) => <path key={i} d={d} />)}
      {dots.map(([x, y], i) => <circle key={`d${i}`} cx={f(x)} cy={f(y)} r="1.8" />)}
    </>
  )
}

function Blade({ H = 80, bend = 14 }) {
  return <path d={`M0 0 Q${f(bend)} ${f(-H * 0.6)} ${f(bend * 0.3)} ${f(-H)}`} />
}

// composición: x a lo ancho (0..1200), tipo, escala, rotación en grados
const M = [
  ['poppy', 26, 1.25, -6, { H: 78 }], ['blade', 12, 1, 8, { H: 96, bend: -18 }],
  ['daisy', 70, 1.05, 5, { H: 58 }], ['tulip', 44, 1, -3, { H: 70 }],
  ['fern', 108, 1, 6, { H: 118 }], ['sprig', 150, 1, -4, { H: 100 }],
  ['daisy', 120, 0.8, -8, { H: 42, r: 10 }],
  ['sprig', 300, 1.05, 3, { H: 120 }], ['daisy', 340, 0.85, 6, { H: 60, n: 8 }],
  ['fern', 260, 0.9, -8, { H: 96 }], ['blade', 380, 1, 10, { H: 74 }],
  ['sprig', 520, 1.15, -2, { H: 132 }], ['daisy', 560, 1, 4, { H: 70 }],
  ['tulip', 500, 0.95, -6, { H: 78 }], ['sprig', 600, 0.9, 8, { H: 88 }],
  ['poppy', 690, 1.15, 4, { H: 84 }], ['blade', 660, 1, -12, { H: 90, bend: 20 }],
  ['daisy', 730, 0.8, -6, { H: 50, r: 10, n: 8 }], ['tulip', 780, 1.05, 6, { H: 96 }],
  ['fern', 840, 0.95, -6, { H: 104 }], ['sprig', 880, 1, 3, { H: 96 }],
  ['sprig', 1010, 1.1, -3, { H: 120 }], ['daisy', 1050, 1, 6, { H: 66 }],
  ['fern', 1100, 1.05, -7, { H: 120 }], ['poppy', 1150, 1.2, 5, { H: 80 }],
  ['tulip', 1120, 0.9, -5, { H: 62 }], ['daisy', 1180, 0.82, 8, { H: 46, r: 10 }],
  ['blade', 1075, 1, 12, { H: 82, bend: -16 }],
]
const MOTIF = { daisy: Daisy, poppy: Poppy, tulip: Tulip, fern: Fern, sprig: BudStem, blade: Blade }
const BASE = 250

function Meadow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 overflow-hidden text-moss"
    >
      <svg
        viewBox="0 0 1200 250"
        preserveAspectRatio="xMidYMax slice"
        className="block h-[clamp(155px,20vw,250px)] w-full opacity-[0.5]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {M.map(([type, x, s, rot, props], i) => {
          const Comp = MOTIF[type]
          return (
            <g key={i} transform={`translate(${x} ${BASE}) scale(${s}) rotate(${rot})`}>
              <Comp {...props} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
