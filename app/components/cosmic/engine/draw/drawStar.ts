import type { Star } from '../types'
import { twinkleAmount } from '../physics'

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

export function drawStar(ctx: CanvasRenderingContext2D, s: Star): void {
  const t = twinkleAmount(s.tw)
  const alpha = 0.4 + t * 0.55
  const [r, g, b] = hexToRgb(s.color)
  ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
  ctx.beginPath()
  ctx.arc(s.x, s.y, s.r * (0.7 + t * 0.6), 0, Math.PI * 2)
  ctx.fill()
}

/** Cross-shaped diffraction spikes for the few bright stars. */
export function drawBigStarSpikes(ctx: CanvasRenderingContext2D, s: Star): void {
  const t = twinkleAmount(s.tw)
  const len = 6 + t * 8
  const grad = ctx.createLinearGradient(s.x - len, s.y, s.x + len, s.y)
  grad.addColorStop(0, 'rgba(255,255,255,0)')
  grad.addColorStop(0.5, 'rgba(255,255,255,0.55)')
  grad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.strokeStyle = grad
  ctx.lineWidth = 0.6
  ctx.beginPath()
  ctx.moveTo(s.x - len, s.y)
  ctx.lineTo(s.x + len, s.y)
  ctx.moveTo(s.x, s.y - len)
  ctx.lineTo(s.x, s.y + len)
  ctx.stroke()
}
