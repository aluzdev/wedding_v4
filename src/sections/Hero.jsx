import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import heroDesktop from '../assets/hero-forest.webp'
import heroMobile from '../assets/hero-forest-mobile.webp'

export default function Hero() {
  const { t } = useLang()

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night text-center"
    >
      {/* full-bleed forest backdrop; portrait crop on phones */}
      <picture>
        <source media="(min-width: 640px)" srcSet={heroDesktop} />
        <img
          src={heroMobile}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover slow-breathe"
        />
      </picture>
      {/* legibility scrims: darken edges, fade bottom into the night section below */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,23,17,0.42)_0%,rgba(20,23,17,0.72)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/70 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 [text-shadow:0_1px_16px_rgba(8,12,6,0.65)] sm:pt-24">
        <p className="font-display text-xl italic text-linen/90 sm:text-2xl">
          {t.hero.announce}
        </p>
        <h1 className="mt-3 font-display text-[clamp(3.25rem,12vw,6.5rem)] leading-[0.95] tracking-tight text-cream">
          Cris <span className="font-light italic text-sage">&amp;</span> Pris
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base italic text-linen/85 sm:text-lg">
          {t.hero.invite}
        </p>

        <div className="mx-auto mt-8 flex items-center justify-center gap-4 text-linen">
          <span aria-hidden="true" className="h-px w-10 bg-sage/60 sm:w-16" />
          <p className="text-base font-medium tracking-wide text-gold sm:text-lg">
            {t.hero.dateLine}
          </p>
          <span aria-hidden="true" className="h-px w-10 bg-sage/60 sm:w-16" />
        </div>
        <p className="mt-2 text-balance text-sm text-linen/75 sm:text-base">{t.hero.venueLine}</p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#rsvp"
            className="rounded-full bg-cream px-8 py-3.5 text-sm font-semibold text-night shadow-xl transition hover:bg-white"
          >
            {t.hero.cta}
          </a>
          <a
            href={config.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white/10 px-7 py-3.5 text-sm font-medium text-linen ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/20"
          >
            {t.ceremony.directions}
          </a>
        </div>
        <p className="mt-5 text-xs text-linen/65">{t.hero.deadline}</p>
      </div>
    </section>
  )
}
