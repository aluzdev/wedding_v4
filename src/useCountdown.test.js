import { describe, it, expect } from 'vitest'
import { computeRemaining } from './useCountdown.js'

const WEDDING = Date.parse('2026-10-10T17:00:00-06:00')

describe('computeRemaining', () => {
  it('counts full units remaining', () => {
    const now = Date.parse('2026-10-08T15:30:10-06:00') // 2d 1h 29m 50s before
    expect(computeRemaining(WEDDING, now)).toEqual({
      days: 2, hours: 1, minutes: 29, seconds: 50, passed: false,
    })
  })

  it('flags the moment as passed at and after zero', () => {
    expect(computeRemaining(WEDDING, WEDDING).passed).toBe(true)
    expect(computeRemaining(WEDDING, WEDDING + 1000).passed).toBe(true)
  })

  it('never returns negative units once passed', () => {
    const r = computeRemaining(WEDDING, WEDDING + 90_000)
    expect(r).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true })
  })

  it('handles sub-minute remainders', () => {
    const r = computeRemaining(WEDDING, WEDDING - 59_000)
    expect(r).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 59, passed: false })
  })
})
