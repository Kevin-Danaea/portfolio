import type { BlackHole } from '../types'

export function drawBlackHole(ctx: CanvasRenderingContext2D, bh: BlackHole): void {
  ctx.save()
  ctx.translate(bh.x, bh.y)

  // Outer glow
  const glow = ctx.createRadialGradient(0, 0, bh.r, 0, 0, bh.diskR * 2.2)
  glow.addColorStop(0, 'rgba(232,160,107,0.45)')
  glow.addColorStop(0.4, 'rgba(194,73,59,0.15)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(0, 0, bh.diskR * 2.2, 0, Math.PI * 2)
  ctx.fill()

  // Accretion disk — rotated ellipse
  ctx.rotate(bh.rot)
  ctx.strokeStyle = 'rgba(255,200,120,0.85)'
  ctx.lineWidth = 1.6
  ctx.beginPath()
  ctx.ellipse(0, 0, bh.diskR, bh.diskR * 0.32, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = 'rgba(255,240,200,0.55)'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.ellipse(0, 0, bh.diskR * 1.18, bh.diskR * 0.38, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Inner photon ring
  ctx.strokeStyle = 'rgba(255,240,200,0.6)'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.arc(0, 0, bh.r + 3, 0, Math.PI * 2)
  ctx.stroke()

  // Event horizon (pure black sphere)
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(0, 0, bh.r, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
