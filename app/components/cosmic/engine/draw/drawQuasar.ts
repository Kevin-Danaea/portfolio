import type { Quasar } from '../types'

export function drawQuasar(ctx: CanvasRenderingContext2D, q: Quasar): void {
  const flicker = 0.6 + Math.sin(q.phase) * 0.4
  ctx.save()
  ctx.translate(q.x, q.y)

  // Cross-shaped flare
  const len = 18 + flicker * 10
  const grad = ctx.createLinearGradient(-len, 0, len, 0)
  grad.addColorStop(0, 'rgba(180,200,255,0)')
  grad.addColorStop(0.5, 'rgba(220,230,255,0.7)')
  grad.addColorStop(1, 'rgba(180,200,255,0)')
  ctx.strokeStyle = grad
  ctx.lineWidth = 0.7
  ctx.beginPath()
  ctx.moveTo(-len, 0)
  ctx.lineTo(len, 0)
  ctx.moveTo(0, -len)
  ctx.lineTo(0, len)
  ctx.stroke()

  // Bright core
  ctx.fillStyle = `rgba(220,230,255,${0.8 * flicker + 0.2})`
  ctx.beginPath()
  ctx.arc(0, 0, q.r, 0, Math.PI * 2)
  ctx.fill()

  // Hot halo
  const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, q.r * 6)
  halo.addColorStop(0, 'rgba(220,230,255,0.4)')
  halo.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(0, 0, q.r * 6, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
