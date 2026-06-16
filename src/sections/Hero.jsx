import { useEffect, useRef } from 'react'
import { useLang } from '../i18n.jsx'
import { config } from '../content/content.js'
import heroDesktop from '../assets/hero-lake.webp'
import heroMobile from '../assets/hero-lake-mobile.webp'

export default function Hero() {
  const { t } = useLang()
  const imgRef = useRef(null)
  const contentRef = useRef(null)
  const cueRef = useRef(null)

  // parallax: background drifts slower than the page, content lifts and fades
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
        if (imgRef.current) imgRef.current.style.transform = `translateY(${y * 0.1}px)`
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${y * -0.12}px)`
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.85)))
        }
        if (cueRef.current) {
          cueRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.25)))
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night text-center"
    >
      {/* full-bleed lake backdrop; portrait crop on phones; breathe + parallax layers split
          so the scale animation and the scroll transform don't fight over one element */}
      <div aria-hidden="true" className="absolute inset-0 slow-breathe">
        <picture>
          <source media="(min-width: 640px)" srcSet={heroDesktop} />
          <img
            ref={imgRef}
            src={heroMobile}
            alt=""
            fetchPriority="high"
            className="absolute bottom-0 left-0 h-[110%] w-full object-cover"
          />
        </picture>
      </div>
      {/* legibility scrims: gentle vignette, bottom fade into the night section below */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,23,17,0.22)_0%,rgba(20,23,17,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/60 to-transparent"
      />
      {/* desktop: soft glow of darkness behind the text block (treeline is bright there) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[radial-gradient(ellipse_55%_60%_at_50%_52%,rgba(20,23,17,0.5)_0%,transparent_72%)] sm:block"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 [text-shadow:0_1px_16px_rgba(8,12,6,0.65)] sm:pt-24"
      >
        <p className="font-display text-xl italic text-linen/90 sm:text-2xl">
          {t.hero.announce}
        </p>
        <h1 className="mt-3 font-display text-[clamp(3.25rem,12vw,6.5rem)] leading-[0.95] tracking-tight text-cream">
          Cris <span className="font-light italic text-sage">&amp;</span> Pris
        </h1>
  
        <p className="mt-2 text-balance text-sm text-linen/75 sm:text-base">{t.hero.venueLine}</p>

       
        <p className="mt-5 text-xs text-linen/65">{t.hero.deadline}</p>
      </div>

      {/* scroll cue */}
      <div
        ref={cueRef}
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6 text-linen/70 scroll-cue"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
