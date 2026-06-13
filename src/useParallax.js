import { useEffect, useRef } from 'react'

// Viewport-relative parallax: translates the element on the Y axis based on
// how far its center sits from the viewport center. speed > 0 moves it down as
// you scroll past (background feel); negative moves it up (foreground drift).
// rAF-throttled, disabled under prefers-reduced-motion.
export function useParallax(speed = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const delta = elementCenter - viewportCenter
      el.style.transform = `translate3d(0, ${(-delta * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [speed])

  return ref
}
