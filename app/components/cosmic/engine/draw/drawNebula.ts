/**
 * Three big radial gradients in `screen` blend mode that breathe with time.
 * Cheap because we only paint 3 circles per frame.
 */
export function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, t: number): void {
  const time = t * 0.0003
  const blobs = [
    { x: w * 0.18 + Math.sin(time) * 30, y: h * 0.22, r: Math.max(w, h) * 0.45, c: [232, 100, 70], a: 0.05 },
    { x: w * 0.82 + Math.cos(time * 1.3) * 30, y: h * 0.78, r: Math.max(w, h) * 0.45, c: [110, 130, 220], a: 0.045 },
    { x: w * 0.55, y: h * 0.45 + Math.sin(time * 0.7) * 20, r: Math.max(w, h) * 0.55, c: [160, 90, 180], a: 0.035 },
  ] as const

  ctx.save()
  ctx.globalCompositeOperation = 'screen'
  for (const b of blobs) {
    const [r, g, bl] = b.c
    const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
    grad.addColorStop(0, `rgba(${r},${g},${bl},${b.a})`)
    grad.addColorStop(0.5, `rgba(${r},${g},${bl},${b.a * 0.4})`)
    grad.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  }
  ctx.restore()
}
