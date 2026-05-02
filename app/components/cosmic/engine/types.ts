/**
 * Domain types for the cosmic field. The renderer is open over the entity
 * set: adding a new entity means adding (a) a type here, (b) a factory
 * in seed.ts, (c) optional pure helpers in physics.ts, (d) a drawer in
 * draw/, then wiring it in useCosmicEngine. The orchestrator stays small.
 */

export type Hex = `#${string}`
export type Rng = () => number

export interface Star {
  x: number
  y: number
  vx: number
  vy: number
  /** Visual radius in CSS pixels. */
  r: number
  /** Twinkle phase. */
  tw: number
  /** Twinkle speed. */
  tws: number
  color: Hex
  /** Renders diffraction spikes when true. */
  big: boolean
}

export type DustHue = 'warm' | 'cool' | 'violet'

export interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  hue: DustHue
}

export interface Planet {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  base: Hex
  /** rgba band overlay color. */
  band: string
  ring: boolean
  rot: number
  rotS: number
  phase: number
}

export interface Quasar {
  x: number
  y: number
  r: number
  angle: number
  phase: number
}

export interface BlackHole {
  x: number
  y: number
  vx: number
  vy: number
  /** Event horizon radius. */
  r: number
  /** Outer accretion disk radius. */
  diskR: number
  rot: number
}

export type CometKind = 'comet' | 'ship'

export interface TrailPoint {
  x: number
  y: number
}

export interface Comet {
  x: number
  y: number
  vx: number
  vy: number
  trail: TrailPoint[]
  life: number
  maxLife: number
  kind: CometKind
  hue: Hex
}

export interface Scene {
  stars: Star[]
  dust: DustParticle[]
  planets: Planet[]
  quasars: Quasar[]
  blackHole: BlackHole
  comets: Comet[]
  /** Frame counter, used for nebula breathing and twinkle phases. */
  t: number
  /** Frames remaining until next comet spawn. */
  nextComet: number
}

export interface SceneConfig {
  width: number
  height: number
  /** 0.2 – 2.5; default 1. Scales the count of stars and dust. */
  density: number
  /** Used for accent-tinted comet hue selection. */
  accent: Hex
}
