/**
 * Pure factories for every entity type. All randomness goes through the
 * injected `Rng` function so tests can pass a seeded RNG and assert
 * deterministic output.
 */

import type {
  BlackHole,
  Comet,
  CometKind,
  DustParticle,
  DustHue,
  Hex,
  Planet,
  Quasar,
  Rng,
  Scene,
  SceneConfig,
  Star,
} from './types'

/** Stellar classes — real-ish color temperatures (O blue → M red). */
const STAR_TYPES: ReadonlyArray<{ c: Hex; w: number }> = [
  { c: '#aac8ff', w: 0.1 }, // O — blue
  { c: '#cad8ff', w: 0.2 }, // B — blue-white
  { c: '#f8f7ff', w: 0.32 }, // A — white
  { c: '#fff2cc', w: 0.18 }, // F/G — yellow-white
  { c: '#ffd9a8', w: 0.1 }, // K — orange
  { c: '#ff9b6c', w: 0.1 }, // M — red dwarf
]

const PLANET_PALETTE: ReadonlyArray<{ base: Hex; band: string; ring: boolean }> = [
  { base: '#c2493b', band: 'rgba(255,180,120,0.35)', ring: false }, // Mars-ish
  { base: '#7a86b8', band: 'rgba(180,200,255,0.25)', ring: false }, // ice giant
  { base: '#d4a574', band: 'rgba(120,80,40,0.45)', ring: true }, //   Saturn-ish
  { base: '#5a8f7b', band: 'rgba(180,255,220,0.2)', ring: false }, //  alien green
  { base: '#b8884a', band: 'rgba(255,210,150,0.4)', ring: true }, //   gas giant
]

function rand(rng: Rng, a: number, b: number): number {
  return a + rng() * (b - a)
}

function pick<T>(rng: Rng, arr: ReadonlyArray<T>): T {
  const i = Math.floor(rng() * arr.length)
  // arr.length > 0 is a precondition; the `!` is justified by the constants above.
  return arr[i] ?? (arr[0] as T)
}

export function pickStarColor(rng: Rng): Hex {
  const r = rng()
  let acc = 0
  for (const s of STAR_TYPES) {
    acc += s.w
    if (r <= acc) return s.c
  }
  return '#ffffff'
}

export function createStar(rng: Rng, w: number, h: number): Star {
  return {
    x: rng() * w,
    y: rng() * h,
    vx: rand(rng, -0.12, 0.12),
    vy: rand(rng, -0.12, 0.12),
    r: rand(rng, 0.3, 1.6),
    tw: rng() * Math.PI * 2,
    tws: rand(rng, 0.005, 0.025),
    color: pickStarColor(rng),
    big: rng() < 0.04,
  }
}

export function createDust(rng: Rng, w: number, h: number): DustParticle {
  const hue: DustHue = rng() < 0.55 ? 'warm' : rng() < 0.5 ? 'cool' : 'violet'
  return {
    x: rng() * w,
    y: rng() * h,
    vx: rand(rng, -0.04, 0.04),
    vy: rand(rng, -0.04, 0.04),
    r: rand(rng, 0.4, 1.4),
    alpha: rand(rng, 0.04, 0.16),
    hue,
  }
}

export function createPlanet(rng: Rng, w: number, h: number): Planet {
  const palette = pick(rng, PLANET_PALETTE)
  return {
    x: rand(rng, w * 0.1, w * 0.9),
    y: rand(rng, h * 0.1, h * 0.9),
    vx: rand(rng, -0.05, 0.05),
    vy: rand(rng, -0.05, 0.05),
    r: rand(rng, 8, 18),
    base: palette.base,
    band: palette.band,
    ring: palette.ring,
    rot: rng() * Math.PI,
    rotS: rand(rng, -0.0015, 0.0015),
    phase: rng() * Math.PI * 2,
  }
}

export function createQuasar(rng: Rng, w: number, h: number): Quasar {
  return {
    x: rand(rng, w * 0.05, w * 0.95),
    y: rand(rng, h * 0.05, h * 0.95),
    r: rand(rng, 2, 3.5),
    angle: rng() * Math.PI * 2,
    phase: rng() * Math.PI * 2,
  }
}

export function createBlackHole(rng: Rng, w: number, h: number): BlackHole {
  return {
    x: rand(rng, w * 0.25, w * 0.75),
    y: rand(rng, h * 0.25, h * 0.75),
    vx: rand(rng, -0.03, 0.03),
    vy: rand(rng, -0.03, 0.03),
    r: 14,
    diskR: 38,
    rot: 0,
  }
}

/** Spawns a comet entering from a random edge. */
export function createComet(rng: Rng, w: number, h: number, accent: Hex): Comet {
  const side = Math.floor(rng() * 4)
  const speed = rand(rng, 2.4, 3.8)
  let x: number, y: number, vx: number, vy: number
  if (side === 0) {
    x = -40
    y = rng() * h
    vx = speed
    vy = rand(rng, -0.6, 0.6)
  } else if (side === 1) {
    x = w + 40
    y = rng() * h
    vx = -speed
    vy = rand(rng, -0.6, 0.6)
  } else if (side === 2) {
    x = rng() * w
    y = -40
    vx = rand(rng, -0.6, 0.6)
    vy = speed
  } else {
    x = rng() * w
    y = h + 40
    vx = rand(rng, -0.6, 0.6)
    vy = -speed
  }
  const kind: CometKind = rng() < 0.7 ? 'comet' : 'ship'
  const hue: Hex = rng() < 0.5 ? accent : '#9bb6ff'
  return { x, y, vx, vy, trail: [], life: 0, maxLife: 600, kind, hue }
}

export function createScene(config: SceneConfig, rng: Rng = Math.random): Scene {
  const { width, height, density } = config
  // `accent` lives in config for spawn-time use by createComet during ticks;
  // not consumed here at seed time.

  const starCount = Math.floor(((width * height) / 13000) * density)
  const stars: Star[] = []
  for (let i = 0; i < starCount; i++) stars.push(createStar(rng, width, height))

  const dustCount = Math.floor(((width * height) / 9000) * Math.max(0.6, density * 0.7))
  const dust: DustParticle[] = []
  for (let i = 0; i < dustCount; i++) dust.push(createDust(rng, width, height))

  const planetCount = 3 + Math.floor(density * 0.5)
  const planets: Planet[] = []
  for (let i = 0; i < planetCount; i++) planets.push(createPlanet(rng, width, height))

  const quasars: Quasar[] = [createQuasar(rng, width, height), createQuasar(rng, width, height)]

  const blackHole = createBlackHole(rng, width, height)

  return {
    stars,
    dust,
    planets,
    quasars,
    blackHole,
    comets: [],
    t: 0,
    nextComet: 240 + Math.floor(rng() * 600),
  }
}
