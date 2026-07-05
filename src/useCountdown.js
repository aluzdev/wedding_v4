import { useEffect, useState } from 'react'

export function computeRemaining(targetMs, nowMs) {
  const diff = targetMs - nowMs
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }
  const seconds = Math.floor(diff / 1000) % 60
  const minutes = Math.floor(diff / 60_000) % 60
  const hours = Math.floor(diff / 3_600_000) % 24
  const days = Math.floor(diff / 86_400_000)
  return { days, hours, minutes, seconds, passed: false }
}

export function useCountdown(targetISO) {
  const targetMs = Date.parse(targetISO)
  const [remaining, setRemaining] = useState(() => computeRemaining(targetMs, Date.now()))

  useEffect(() => {
    const id = setInterval(() => setRemaining(computeRemaining(targetMs, Date.now())), 1000)
    return () => clearInterval(id)
  }, [targetMs])

  return remaining
}
