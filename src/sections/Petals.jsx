// Ambient drifting petals/leaves. Pure CSS animation, decorative only
// (aria-hidden, pointer-events:none), disabled under prefers-reduced-motion.
// Light count keeps it cheap. `tone` switches petal color for dark vs light sections.
// `leaf: true` → hoja verde en vez de pétalo cálido (el toque botánico)
const PETALS = [
  { left: '6%', delay: '0s', dur: '15s', size: 14, drift: '40px' },
  { left: '18%', delay: '4s', dur: '19s', size: 11, drift: '-30px', leaf: true },
  { left: '31%', delay: '8s', dur: '17s', size: 16, drift: '60px' },
  { left: '47%', delay: '2s', dur: '21s', size: 12, drift: '-50px', leaf: true },
  { left: '62%', delay: '6s', dur: '16s', size: 15, drift: '35px' },
  { left: '74%', delay: '10s', dur: '20s', size: 9, drift: '-40px' },
  { left: '86%', delay: '1s', dur: '18s', size: 13, drift: '55px', leaf: true },
  { left: '93%', delay: '7s', dur: '22s', size: 10, drift: '-25px' },
]

export default function Petals({ tone = 'light', className = '' }) {
  const warm = tone === 'dark' ? 'var(--petal-warm-dark)' : 'var(--petal-warm-light)'
  const leaf = tone === 'dark' ? 'var(--petal-leaf-dark)' : 'var(--petal-leaf-light)'
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-6 block"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
            '--drift': p.drift,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20" fill={p.leaf ? leaf : warm}>
            {/* simple petal/leaf teardrop */}
            <path d="M10 0C13 6 20 8 20 13a10 10 0 0 1-20 0C0 8 7 6 10 0Z" />
          </svg>
        </span>
      ))}
    </div>
  )
}
