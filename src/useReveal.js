import { useEffect } from 'react'

// Fade-up on scroll for every .reveal element. Content stays visible
// without JS: the hiding styles only activate once .js-reveal is set here.
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    document.documentElement.classList.add('js-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    for (const el of document.querySelectorAll('.reveal')) observer.observe(el)
    return () => observer.disconnect()
  }, [])
}
