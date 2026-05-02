import type { DustParticle } from '../types'

const HUE_RGB: Record<DustParticle['hue'], readonly [number, number, number]> = {
  warm: [232, 140, 90],
  cool: [130, 160, 230],
  violet: [170, 110, 200],
}

export function drawDust(ctx: CanvasRenderingContext2D, d: DustParticle): void {
  const [r, g, b] = HUE_RGB[d.hue]
  ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha})`
  ctx.beginPath()
  ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
  ctx.fill()
}
