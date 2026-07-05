// Motas de luz/polen que CAEN en diagonal: arriba-izquierda → abajo-derecha.
// Círculos suaves con brillo; decorativo (aria-hidden, pointer-events:none),
// se apaga bajo prefers-reduced-motion. Color en index.css (--mote).
// Nacen sobre el borde superior (sesgadas a la izquierda) y derivan a la
// derecha (--drift en vw, siempre positivo) mientras bajan 105vh.
const MOTES = [
  { left: '-4%', delay: '0s', dur: '15s', size: 8, drift: '52vw' },
  { left: '6%', delay: '4s', dur: '18s', size: 5, drift: '46vw' },
  { left: '14%', delay: '8s', dur: '16s', size: 10, drift: '58vw' },
  { left: '24%', delay: '2s', dur: '20s', size: 6, drift: '44vw' },
  { left: '34%', delay: '6s', dur: '17s', size: 9, drift: '50vw' },
  { left: '46%', delay: '10s', dur: '19s', size: 5, drift: '40vw' },
  { left: '12%', delay: '12s', dur: '21s', size: 11, drift: '55vw' },
  { left: '30%', delay: '7s', dur: '18s', size: 6, drift: '48vw' },
]

export default function Motes({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote absolute top-0 block rounded-full opacity-5"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDelay: m.delay,
            animationDuration: m.dur,
            '--drift': m.drift,
          }}
        />
      ))}
    </div>
  )
}
