import { describe, it, expect } from 'vitest'
import {
  applyBlackHoleGravity,
  arePlanetsColliding,
  bounceHorizontal,
  bounceVertical,
  growBlackHoleAfterPlanetCapture,
  mergePlanets,
  planetMass,
  planetBandOffset,
  shouldPlanetBeConsumed,
  shouldStarBeConsumed,
  starJitter,
  twinkleAmount,
  wrap,
  STAR_CONSUME_BUFFER,
} from '~/components/cosmic/engine/physics'
import type { BlackHole, Planet, Star } from '~/components/cosmic/engine/types'
import { createStar } from '~/components/cosmic/engine/seed'

const bh = (over: Partial<BlackHole> = {}): BlackHole => ({
  x: 100,
  y: 100,
  vx: 0,
  vy: 0,
  r: 14,
  diskR: 38,
  rot: 0,
  ...over,
})

const planet = (over: Partial<Planet> = {}): Planet => ({
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  r: 10,
  base: '#c2493b',
  band: 'rgba(255,180,120,0.35)',
  ring: false,
  rot: 0,
  rotS: 0,
  phase: 0,
  ...over,
})

describe('applyBlackHoleGravity', () => {
  it('returns identity when body is outside the gravity range', () => {
    const body = { x: 500, y: 500, vx: 0.1, vy: -0.05 }
    const result = applyBlackHoleGravity(body, bh(), 100, 0.05)
    expect(result.vx).toBe(0.1)
    expect(result.vy).toBe(-0.05)
  })

  it('pulls a body toward the black hole when inside the range', () => {
    const body = { x: 150, y: 100, vx: 0, vy: 0 } // 50 px right of bh
    const result = applyBlackHoleGravity(body, bh(), 100, 0.05)
    expect(result.vx).toBeLessThan(0) // pulled left
    expect(Math.abs(result.vy)).toBeLessThan(1e-9) // no vertical pull on x-axis
  })

  it('pulls harder as the body gets closer (inverse-linear with range)', () => {
    const close = applyBlackHoleGravity({ x: 110, y: 100, vx: 0, vy: 0 }, bh(), 100, 0.05)
    const far = applyBlackHoleGravity({ x: 190, y: 100, vx: 0, vy: 0 }, bh(), 100, 0.05)
    expect(Math.abs(close.vx)).toBeGreaterThan(Math.abs(far.vx))
  })

  it('does not divide by zero when body is on the black hole', () => {
    const result = applyBlackHoleGravity({ x: 100, y: 100, vx: 0, vy: 0 }, bh(), 100, 0.05)
    expect(Number.isFinite(result.vx)).toBe(true)
    expect(Number.isFinite(result.vy)).toBe(true)
  })

  it('does not mutate the input body', () => {
    const body = { x: 150, y: 100, vx: 0, vy: 0 }
    applyBlackHoleGravity(body, bh(), 100, 0.05)
    expect(body).toEqual({ x: 150, y: 100, vx: 0, vy: 0 })
  })
})

describe('shouldStarBeConsumed', () => {
  const baseStar: Star = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 1,
    tw: 0,
    tws: 0.01,
    color: '#ffffff',
    big: false,
  }
  it('returns true when star is inside event horizon + buffer', () => {
    const star: Star = { ...baseStar, x: 100 + bh().r + STAR_CONSUME_BUFFER - 1, y: 100 }
    expect(shouldStarBeConsumed(star, bh())).toBe(true)
  })
  it('returns false when star is outside event horizon + buffer', () => {
    const star: Star = { ...baseStar, x: 100 + bh().r + STAR_CONSUME_BUFFER + 1, y: 100 }
    expect(shouldStarBeConsumed(star, bh())).toBe(false)
  })
})

describe('planet collision and black-hole capture', () => {
  it('uses radius cubed as a stable visual mass proxy', () => {
    expect(planetMass(planet({ r: 2 }))).toBe(8)
    expect(planetMass(planet({ r: 0 }))).toBe(1)
  })

  it('detects softened planet overlap as a collision', () => {
    expect(arePlanetsColliding(planet({ x: 0, r: 10 }), planet({ x: 15, r: 10 }))).toBe(true)
    expect(arePlanetsColliding(planet({ x: 0, r: 10 }), planet({ x: 25, r: 10 }))).toBe(false)
  })

  it('merges planets with momentum conservation and volume-based radius', () => {
    const a = planet({ x: 0, vx: 2, r: 10 })
    const b = planet({ x: 20, vx: -2, r: 10, ring: true })
    const merged = mergePlanets(a, b)

    expect(merged.x).toBe(10)
    expect(merged.vx).toBe(0)
    expect(merged.r).toBeCloseTo((10 ** 3 + 10 ** 3) ** (1 / 3))
    expect(merged.ring).toBe(true)
  })

  it('captures planets that cross the event horizon', () => {
    expect(shouldPlanetBeConsumed(planet({ x: 108, y: 100, r: 10 }), bh())).toBe(true)
    expect(shouldPlanetBeConsumed(planet({ x: 130, y: 100, r: 10 }), bh())).toBe(false)
  })

  it('grows the black hole accretion disk after planet capture without runaway sizing', () => {
    const grown = growBlackHoleAfterPlanetCapture(bh({ r: 20, diskR: 38 }), planet({ r: 100 }))
    expect(grown.r).toBe(22)
    expect(grown.diskR).toBeCloseTo(59.4)
  })
})

describe('wrap', () => {
  it('wraps left edge', () => expect(wrap(-15, 0, 100)).toBe(110))
  it('wraps right edge', () => expect(wrap(115, 0, 100)).toBe(-10))
  it('keeps value when in range', () => expect(wrap(50, 0, 100)).toBe(50))
  it('respects custom margin', () => {
    // value at -3 is inside the [min-margin, max+margin] band → returned unchanged
    expect(wrap(-3, 0, 100, 5)).toBe(-3)
    // value at -6 falls outside the left margin → wrapped to max + margin
    expect(wrap(-6, 0, 100, 5)).toBe(105)
  })
})

describe('bounce', () => {
  it('reverses vx near the left/right inset', () => {
    expect(bounceHorizontal({ x: 50, y: 0, vx: 1, vy: 0 }, 1000, 80)).toBe(-1)
    expect(bounceHorizontal({ x: 950, y: 0, vx: 1, vy: 0 }, 1000, 80)).toBe(-1)
    expect(bounceHorizontal({ x: 500, y: 0, vx: 1, vy: 0 }, 1000, 80)).toBe(1)
  })
  it('reverses vy near the top/bottom inset', () => {
    expect(bounceVertical({ x: 0, y: 50, vx: 0, vy: 1 }, 1000, 80)).toBe(-1)
    expect(bounceVertical({ x: 0, y: 950, vx: 0, vy: 1 }, 1000, 80)).toBe(-1)
    expect(bounceVertical({ x: 0, y: 500, vx: 0, vy: 1 }, 1000, 80)).toBe(1)
  })
})

describe('twinkleAmount', () => {
  it('returns values in [0, 1] for any phase', () => {
    for (let p = 0; p < 100; p++) {
      const a = twinkleAmount(p)
      expect(a).toBeGreaterThanOrEqual(0)
      expect(a).toBeLessThanOrEqual(1)
    }
  })
})

describe('starJitter', () => {
  it('is deterministic for the same (t, index)', () => {
    expect(starJitter(1234, 5)).toEqual(starJitter(1234, 5))
  })
  it('returns small magnitudes (within ±0.001 each axis)', () => {
    const j = starJitter(9999, 3)
    expect(Math.abs(j.vx)).toBeLessThanOrEqual(0.001)
    expect(Math.abs(j.vy)).toBeLessThanOrEqual(0.001)
  })
})

describe('planetBandOffset', () => {
  it('shifts up for index 0 then steps down through bands', () => {
    const r = 10
    const a = planetBandOffset(0, 0, r)
    const b = planetBandOffset(0, 1, r)
    const c = planetBandOffset(0, 2, r)
    expect(b).toBeGreaterThan(a)
    expect(c).toBeGreaterThan(b)
  })
})

describe('createStar (seed determinism with injected RNG)', () => {
  it('produces identical stars when RNG sequence is identical', () => {
    let i = 0
    const seq = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]
    const rngA = (): number => seq[i++ % seq.length] ?? 0
    let j = 0
    const rngB = (): number => seq[j++ % seq.length] ?? 0
    expect(createStar(rngA, 1000, 800)).toEqual(createStar(rngB, 1000, 800))
  })
})
