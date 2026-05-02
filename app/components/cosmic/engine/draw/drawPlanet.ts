import type { Planet } from '../types'
import { planetBandOffset } from '../physics'

export function drawPlanet(ctx: CanvasRenderingContext2D, p: Planet): void {
  ctx.save()
  ctx.translate(p.x, p.y)

  // Soft halo
  const halo = ctx.createRadialGradient(0, 0, p.r, 0, 0, p.r * 2.4)
  halo.addColorStop(0, 'rgba(255,255,255,0.05)')
  halo.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(0, 0, p.r * 2.4, 0, Math.PI * 2)
  ctx.fill()

  // Body — radial shading from upper-left
  const grad = ctx.createRadialGradient(-p.r * 0.4, -p.r * 0.4, p.r * 0.1, 0, 0, p.r)
  grad.addColorStop(0, p.base)
  grad.addColorStop(1, '#0a0608')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(0, 0, p.r, 0, Math.PI * 2)
  ctx.fill()

  // Atmospheric bands (clipped to the planet circle)
  ctx.save()
  ctx.beginPath()
  ctx.arc(0, 0, p.r, 0, Math.PI * 2)
  ctx.clip()
  ctx.strokeStyle = p.band
  ctx.lineWidth = 1.2
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    const yOff = planetBandOffset(p.rot, i, p.r)
    ctx.moveTo(-p.r, yOff)
    ctx.bezierCurveTo(-p.r * 0.3, yOff - 1.5, p.r * 0.3, yOff + 1.5, p.r, yOff)
    ctx.stroke()
  }
  ctx.restore()

  // Saturn-style rings
  if (p.ring) {
    ctx.save()
    ctx.rotate(0.4)
    ctx.strokeStyle = 'rgba(220,200,160,0.55)'
    ctx.lineWidth = 1.2
    ctx.beginPath()
    ctx.ellipse(0, 0, p.r * 2.0, p.r * 0.45, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.strokeStyle = 'rgba(220,200,160,0.25)'
    ctx.lineWidth = 0.8
    ctx.beginPath()
    ctx.ellipse(0, 0, p.r * 2.4, p.r * 0.55, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  ctx.restore()
}
