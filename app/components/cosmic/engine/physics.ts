/**
 * Pure physics helpers. Every function here is referentially transparent:
 * given the same inputs it returns the same outputs and mutates nothing.
 *
 * The orchestrator in useCosmicEngine.ts calls these in a tight loop and
 * applies the results in place to avoid per-frame allocation.
 */

import type { BlackHole, Planet, Star } from './types'

// Tunables — extracted from the prototype, kept as named constants so
// behavior changes show up as a single-line diff with intent.
export const STAR_BH_RANGE = 180
export const STAR_BH_FORCE = 0.05
export const PLANET_BH_RANGE = 220
export const PLANET_BH_FORCE = 0.004
export const STAR_FRICTION = 0.985
export const PLANET_FRICTION = 0.998
/** Distance from event horizon at which a star is "consumed" and respawns. */
export const STAR_CONSUME_BUFFER = 6
/** Visual collision bodies overlap before merging, so rings do not over-trigger. */
export const PLANET_COLLISION_SOFTNESS = 0.82
export const PLANET_MAX_RADIUS = 30

export interface Body2D {
  x: number
  y: number
  vx: number
  vy: number
}

export interface Velocity2D {
  vx: number
  vy: number
}

/** Apply an inverse-linear gravity pull from `bh` to `body` if within `range`. */
export function applyBlackHoleGravity(
  body: Body2D,
  bh: BlackHole,
  range: number,
  force: number,
): Velocity2D {
  const dx = bh.x - body.x
  const dy = bh.y - body.y
  const d = Math.sqrt(dx * dx + dy * dy) + 0.001
  if (d >= range) return { vx: body.vx, vy: body.vy }
  const f = ((range - d) / range) * force
  return {
    vx: body.vx + (dx / d) * f,
    vy: body.vy + (dy / d) * f,
  }
}

/** True when a star has crossed (or is about to cross) the event horizon. */
export function shouldStarBeConsumed(star: Star, bh: BlackHole): boolean {
  const dx = bh.x - star.x
  const dy = bh.y - star.y
  const d = Math.sqrt(dx * dx + dy * dy)
  return d < bh.r + STAR_CONSUME_BUFFER
}

/** Volume-like mass proxy for spherical bodies in a 2D visual field. */
export function planetMass(planet: Pick<Planet, 'r'>): number {
  return Math.max(1, planet.r ** 3)
}

export function arePlanetsColliding(a: Planet, b: Planet): boolean {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const d = Math.sqrt(dx * dx + dy * dy)
  return d <= (a.r + b.r) * PLANET_COLLISION_SOFTNESS
}

/**
 * Perfectly inelastic planet collision: bodies merge, momentum is conserved,
 * and radius grows by volume rather than by simple addition.
 */
export function mergePlanets(a: Planet, b: Planet): Planet {
  const ma = planetMass(a)
  const mb = planetMass(b)
  const total = ma + mb
  const dominant = ma >= mb ? a : b
  const passenger = ma >= mb ? b : a

  return {
    ...dominant,
    x: (a.x * ma + b.x * mb) / total,
    y: (a.y * ma + b.y * mb) / total,
    vx: (a.vx * ma + b.vx * mb) / total,
    vy: (a.vy * ma + b.vy * mb) / total,
    r: Math.min(PLANET_MAX_RADIUS, total ** (1 / 3)),
    ring: a.ring || b.ring,
    rotS: (a.rotS * ma + b.rotS * mb) / total,
    phase: dominant.phase,
    band: dominant.band || passenger.band,
  }
}

export function shouldPlanetBeConsumed(planet: Planet, bh: BlackHole): boolean {
  const dx = bh.x - planet.x
  const dy = bh.y - planet.y
  const d = Math.sqrt(dx * dx + dy * dy)
  return d < bh.r + planet.r * 0.35
}

/**
 * Absorption transfers a tiny visual amount of mass into the black hole.
 * The cap keeps the decorative backdrop from swallowing the whole page.
 */
export function growBlackHoleAfterPlanetCapture(bh: BlackHole, planet: Planet): BlackHole {
  const growth = Math.min(5, planet.r * 0.08)
  const nextR = Math.min(22, bh.r + growth)
  return {
    ...bh,
    r: nextR,
    diskR: Math.max(bh.diskR, nextR * 2.7),
  }
}

/** Wrap a coordinate around the field with a margin so wrap is invisible. */
export function wrap(value: number, min: number, max: number, margin = 10): number {
  if (value < min - margin) return max + margin
  if (value > max + margin) return min - margin
  return value
}

/** Bounce a body horizontally if it leaves the playfield by `inset` px. */
export function bounceHorizontal(body: Body2D, width: number, inset: number): number {
  if (body.x < inset || body.x > width - inset) return -body.vx
  return body.vx
}

export function bounceVertical(body: Body2D, height: number, inset: number): number {
  if (body.y < inset || body.y > height - inset) return -body.vy
  return body.vy
}

/**
 * Star jitter — small sinusoidal nudge that keeps stars from looking too
 * regular. Pure function of (time, index) so frames are reproducible.
 */
export function starJitter(t: number, index: number): Velocity2D {
  return {
    vx: Math.sin(t * 0.001 + index) * 0.001,
    vy: Math.cos(t * 0.0013 + index) * 0.001,
  }
}

/**
 * Twinkle intensity in [0, 1] for a given phase. Sin-based, smooth.
 */
export function twinkleAmount(phase: number): number {
  return (Math.sin(phase) + 1) / 2
}

/** Black hole rotation step (constant angular velocity). */
export const BH_ROT_PER_FRAME = 0.012

/** Planet rotation modulation magnitude (used by the renderer). */
export function planetBandOffset(rot: number, bandIndex: number, radius: number): number {
  return -radius * 0.6 + bandIndex * (radius * 0.5) + Math.sin(rot * 4 + bandIndex) * 1.2
}
