import { useEffect, useRef } from 'react'
import { useLang } from '../i18n.jsx'

export default function Hero() {
  const { t } = useLang()
  const contentRef = useRef(null)
  const cueRef = useRef(null)

  // parallax: content lifts and fades as the page scrolls
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight)
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
      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-20 pt-28 [text-shadow:0_1px_16px_rgba(8,12,6,0.65)] sm:pt-24"
      >
        <p className="font-display text-xl italic text-linen/90 sm:text-2xl mb-10">
          {t.hero.announce}
        </p>

        <h1 className="mt-3 flex flex-col items-center gap-1 font-display text-[clamp(3.25rem,12vw,6.5rem)] leading-[0.95] tracking-tight text-cream sm:flex-row sm:justify-center sm:gap-3">
          <span>{t.couple.novio}</span>
          <span className="px-2 py-2 font-light italic text-sage sm:px-4">&amp;</span>
          <span>{t.couple.novia}</span>
        </h1>

         <p className="font-display text-base [font-style:oblique_14deg] text-linen/90 mt-15">
          {t.heroBible}
        </p>
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
