import { useLang } from '../i18n.jsx'

function Branch({ className }) {
  // decorative leaf branch, sage strokes
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 300"
      fill="none"
      className={className}
    >
      <path d="M100 300 C 90 220, 95 140, 80 60" stroke="currentColor" strokeWidth="1.5" />
      {[
        'M88 90 C 70 80, 55 82, 42 96 C 60 102, 78 100, 88 90',
        'M92 130 C 112 118, 128 120, 140 134 C 122 142, 102 140, 92 130',
        'M90 170 C 70 160, 54 162, 42 178 C 62 184, 80 180, 90 170',
        'M94 210 C 114 198, 130 200, 144 214 C 124 222, 104 220, 94 210',
        'M93 250 C 75 240, 60 242, 48 256 C 66 262, 84 260, 93 250',
        'M82 62 C 76 42, 78 26, 90 12 C 98 30, 94 48, 82 62',
      ].map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12" />
      ))}
    </svg>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night px-6 text-center text-linen"
    >
      {/* layered botanical night gradients */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 110%, #2a3322 0%, transparent 60%),' +
            'radial-gradient(90% 60% at 15% 100%, #232b1c 0%, transparent 55%),' +
            'radial-gradient(90% 60% at 85% 100%, #1f2619 0%, transparent 55%),' +
            'radial-gradient(140% 100% at 50% -20%, #0d0f0b 0%, transparent 70%)',
        }}
      />
      {/* soft moonlight glow behind names */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #4a5540 0%, transparent 70%)' }}
      />
      <Branch className="absolute -left-10 bottom-0 h-72 w-48 text-sage/35 sm:left-4 sm:h-96 sm:w-64" />
      <Branch className="absolute -right-10 bottom-0 h-72 w-48 -scale-x-100 text-sage/30 sm:right-4 sm:h-96 sm:w-64" />

      <div className="relative flex flex-col items-center gap-6 pb-16 pt-24">
        <p className="text-[11px] uppercase tracking-[0.35em] text-sage">{t.hero.eyebrow}</p>
        <h1 className="font-display text-[clamp(3.25rem,14vw,7rem)] leading-none tracking-tight">
          Cris <span className="font-light italic text-sage">&amp;</span> Pris
        </h1>
        <div className="space-y-1.5">
          <p className="text-base font-medium tracking-wide text-gold sm:text-lg">{t.hero.dateLine}</p>
          <p className="text-sm text-linen/75 sm:text-base">{t.hero.venueLine}</p>
        </div>
        <a
          href="#rsvp"
          className="mt-4 rounded-full bg-white/10 px-8 py-3.5 text-sm font-medium tracking-wide text-linen ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20 hover:ring-white/30"
        >
          {t.hero.cta}
        </a>
        <p className="text-xs text-linen/55">{t.hero.deadline}</p>
      </div>

      {/* scroll hint */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-linen/40">
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2.5" fill="currentColor" />
        </svg>
      </div>
    </section>
  )
}
