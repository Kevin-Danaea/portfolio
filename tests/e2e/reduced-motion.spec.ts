import { test, expect } from '@playwright/test'

/**
 * Reduced-motion smoke. The deep behavior of usePrefersReducedMotion +
 * useReveal + the cosmic engine pause path is covered by unit tests
 * (16+ cases). At the e2e layer we verify two things:
 *   1) Above-the-fold reveals end up with .is-in (Hero) after hydration.
 *   2) The cosmic canvas mounts and is correctly aria-hidden.
 *
 * We don't assert below-the-fold reveals here because that depends on
 * scroll/IO wiring that's better exercised in interactive sessions.
 *
 * Note: in some headless Chromium builds, page-level
 * `reducedMotion: 'reduce'` doesn't propagate to window.matchMedia.
 * We patch matchMedia via addInitScript so the page reads the override.
 */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const mql = {
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }
    const original = window.matchMedia
    window.matchMedia = (query: string) => {
      if (query.includes('prefers-reduced-motion')) return mql as unknown as MediaQueryList
      return original.call(window, query)
    }
  })
})

test('hero reveal is in (above-the-fold reveals after hydration)', async ({ page }) => {
  await page.goto('/en')
  await page.waitForLoadState('networkidle')
  // Hero is in the viewport on load; useReveal flips is-in either via
  // reduced-motion fast path or via the IntersectionObserver firing.
  await expect(page.locator('.hero__grid.reveal')).toHaveClass(/is-in/)
})

test('cosmic-field canvas is mounted and aria-hidden', async ({ page }) => {
  await page.goto('/en')
  await page.waitForLoadState('networkidle')
  const canvas = page.locator('canvas.cosmic-field')
  await expect(canvas).toBeAttached()
  await expect(canvas).toHaveAttribute('aria-hidden', 'true')
})
