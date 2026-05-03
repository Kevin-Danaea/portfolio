/**
 * Engine composable — orchestrates seed → loop → draw and owns RAF lifecycle.
 *
 * The component CosmicField.vue stays dumb: it just owns the <canvas> ref
 * and forwards lifecycle events. All physics + drawing live here, behind a
 * tiny imperative API (start/stop/resize).
 */

import { ref, type Ref } from 'vue'
import { createComet, createScene, createStar } from './seed'
import {
  applyBlackHoleGravity,
  bounceHorizontal,
  bounceVertical,
  BH_ROT_PER_FRAME,
  PLANET_BH_FORCE,
  PLANET_BH_RANGE,
  PLANET_FRICTION,
  shouldStarBeConsumed,
  starJitter,
  STAR_BH_FORCE,
  STAR_BH_RANGE,
  STAR_FRICTION,
  twinkleAmount,
  wrap,
} from './physics'
import {
  drawBigStarSpikes,
  drawBlackHole,
  drawComet,
  drawDust,
  drawNebula,
  drawPlanet,
  drawQuasar,
  drawStar,
} from './draw'
import type { Hex, Scene } from './types'

export interface UseCosmicEngineOptions {
  canvas: Ref<HTMLCanvasElement | null>
  density?: number
  accent?: Hex
  paused?: boolean
}

const DEFAULT_DENSITY = 2.5
const DEFAULT_ACCENT: Hex = '#c2493b'
/** prefers-reduced-motion → cap DPR low and skip RAF (single static render). */
const DPR_CAP = 2

export function useCosmicEngine(options: UseCosmicEngineOptions) {
  const isRunning = ref(false)
  let raf = 0
  let scene: Scene | null = null
  let ctx: CanvasRenderingContext2D | null = null
  let dpr = 1
  let W = 0
  let H = 0

  const density = options.density ?? DEFAULT_DENSITY
  const accent = options.accent ?? DEFAULT_ACCENT
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const paused = options.paused ?? reducedMotion

  /** Re-seed only on width changes (or first run). iOS Safari fires `resize`
   *  every time the address bar collapses/expands during scroll — re-seeding
   *  on those would teleport every star to a new random position. The wrap
   *  helpers keep existing bodies on-screen as height changes. */
  function resize(): void {
    const canvas = options.canvas.value
    if (!canvas) return
    const prevW = W
    W = window.innerWidth
    H = window.innerHeight
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    const c2d = canvas.getContext('2d')
    if (!c2d) return
    ctx = c2d
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (!scene || prevW !== W) {
      scene = createScene({ width: W, height: H, density, accent })
    }
    if (paused) renderStaticFrame()
  }

  function tick(): void {
    if (!ctx || !scene) {
      raf = requestAnimationFrame(tick)
      return
    }
    const s = scene
    s.t += 1

    // Trailing fade — leaves star streaks (background-tinted)
    ctx.fillStyle = 'rgba(10, 6, 8, 0.32)'
    ctx.fillRect(0, 0, W, H)

    // 1) Nebula
    drawNebula(ctx, W, H, s.t)

    // 2) Dust (back layer)
    for (const d of s.dust) {
      d.x += d.vx
      d.y += d.vy
      d.x = wrap(d.x, 0, W, 5)
      d.y = wrap(d.y, 0, H, 5)
      drawDust(ctx, d)
    }

    // 3) Quasars (advance their flicker phase)
    for (const q of s.quasars) {
      q.phase += 0.025
      drawQuasar(ctx, q)
    }

    // 4) Black hole — drifts, bounces off insets, rotates
    const bh = s.blackHole
    bh.x += bh.vx
    bh.y += bh.vy
    bh.vx = bounceHorizontal(bh, W, 80)
    bh.vy = bounceVertical(bh, H, 80)
    bh.rot += BH_ROT_PER_FRAME
    drawBlackHole(ctx, bh)

    // 5) Planets — gentle gravity, friction, wrap
    for (const p of s.planets) {
      p.x += p.vx
      p.y += p.vy
      const next = applyBlackHoleGravity(p, bh, PLANET_BH_RANGE, PLANET_BH_FORCE)
      p.vx = next.vx * PLANET_FRICTION
      p.vy = next.vy * PLANET_FRICTION
      p.x = wrap(p.x, 0, W, 40)
      p.y = wrap(p.y, 0, H, 40)
      p.rot += p.rotS
      drawPlanet(ctx, p)
    }

    // 6) Stars — black-hole gravity + consume + jitter + twinkle
    for (let i = 0; i < s.stars.length; i++) {
      const star = s.stars[i]
      if (!star) continue

      if (shouldStarBeConsumed(star, bh)) {
        // Respawn at a random fresh position
        s.stars[i] = createStar(Math.random, W, H)
        continue
      }

      const next = applyBlackHoleGravity(star, bh, STAR_BH_RANGE, STAR_BH_FORCE)
      star.vx = next.vx * STAR_FRICTION
      star.vy = next.vy * STAR_FRICTION
      const jit = starJitter(s.t, i)
      star.vx += jit.vx
      star.vy += jit.vy
      star.x = wrap(star.x + star.vx, 0, W)
      star.y = wrap(star.y + star.vy, 0, H)
      star.tw += star.tws

      drawStar(ctx, star)
      if (star.big && twinkleAmount(star.tw) > 0.6) drawBigStarSpikes(ctx, star)
    }

    // 7) Comets / ships — spawn occasionally, advance, prune off-screen
    s.nextComet -= 1
    if (s.nextComet <= 0) {
      s.comets.push(createComet(Math.random, W, H, accent))
      s.nextComet = 360 + Math.floor(Math.random() * 1200)
    }
    for (let i = s.comets.length - 1; i >= 0; i--) {
      const c = s.comets[i]
      if (!c) continue
      c.x += c.vx
      c.y += c.vy
      c.life += 1
      c.trail.push({ x: c.x, y: c.y })
      if (c.trail.length > 28) c.trail.shift()
      drawComet(ctx, c)
      if (c.life > c.maxLife || c.x < -80 || c.x > W + 80 || c.y < -80 || c.y > H + 80) {
        s.comets.splice(i, 1)
      }
    }

    raf = requestAnimationFrame(tick)
  }

  function renderStaticFrame(): void {
    if (!ctx || !scene) return
    ctx.fillStyle = 'rgba(10, 6, 8, 1)'
    ctx.fillRect(0, 0, W, H)
    drawNebula(ctx, W, H, scene.t)
    for (const q of scene.quasars) drawQuasar(ctx, q)
    drawBlackHole(ctx, scene.blackHole)
    for (const p of scene.planets) drawPlanet(ctx, p)
    for (const star of scene.stars) drawStar(ctx, star)
  }

  function start(): void {
    if (isRunning.value) return
    isRunning.value = true
    resize()
    window.addEventListener('resize', resize)
    if (!paused) tick()
  }

  function stop(): void {
    if (!isRunning.value) return
    isRunning.value = false
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }

  return { start, stop, resize, isRunning }
}
