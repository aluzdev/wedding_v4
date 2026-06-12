import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import PixelGarden from './PixelGarden.jsx'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col justify-start overflow-hidden bg-[#4fa8e8] sm:justify-center"
    >
      <PixelGarden />
      {/* mobile-only scrim: keeps white text readable when a cloud drifts behind it */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-[#10243c]/45 via-[#10243c]/15 to-transparent sm:hidden"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-40 pt-28 sm:px-10 sm:pb-32 sm:pt-24">
        <div className="max-w-xl [text-shadow:0_1px_12px_rgba(20,40,70,0.35)]">
          <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-white/85">
            {t.hero.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(3rem,11vw,5.5rem)] leading-none tracking-tight text-white">
            Cris <span className="font-light italic">&amp;</span> Pris
          </h1>
          <p className="mt-5 text-lg font-medium text-white sm:text-xl">{t.hero.dateLine}</p>
          <p className="mt-1 text-sm text-white/85 sm:text-base">{t.hero.venueLine}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3 [text-shadow:none]">
            <a
              href="#rsvp"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-night shadow-lg transition hover:bg-white/90"
            >
              {t.hero.cta}
            </a>
            <a
              href={config.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white ring-1 ring-white/40 backdrop-blur-sm transition hover:bg-white/30"
            >
              {t.ceremony.directions}
            </a>
          </div>
          <p className="mt-4 text-xs text-white/80">{t.hero.deadline}</p>
        </div>
      </div>
    </section>
  )
}
