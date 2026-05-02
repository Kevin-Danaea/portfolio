import type { Comet } from '../types'

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

export function drawComet(ctx: CanvasRenderingContext2D, c: Comet): void {
  // Trail (tail behind head)
  const tail = c.trail
  for (let i = 0; i < tail.length; i++) {
    const seg = tail[i]
    if (!seg) continue
    const a = (i / tail.length) * 0.7
    ctx.fillStyle = `rgba(255,240,220,${a})`
    ctx.beginPath()
    ctx.arc(seg.x, seg.y, Math.max(0.4, 1.6 * (i / tail.length)), 0, Math.PI * 2)
    ctx.fill()
  }

  // Head (ship is smaller than comet)
  const [r, g, b] = hexToRgb(c.hue)
  ctx.fillStyle = `rgba(${r},${g},${b},0.95)`
  ctx.beginPath()
  ctx.arc(c.x, c.y, c.kind === 'ship' ? 1.6 : 2.2, 0, Math.PI * 2)
  ctx.fill()

  // Halo around the head
  const halo = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 14)
  halo.addColorStop(0, `rgba(${r},${g},${b},0.6)`)
  halo.addColorStop(1, `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(c.x, c.y, 14, 0, Math.PI * 2)
  ctx.fill()
}
