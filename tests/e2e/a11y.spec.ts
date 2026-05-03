import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Automated a11y audit via axe-core. Runs on /en and /es with WCAG
 * 2.1 AA + best-practice rules. Fails on any violation; informational
 * "incomplete" findings (where axe can't decide alone) are logged but
 * don't fail.
 *
 * Color-contrast is checked but the cosmic background gradient confuses
 * the static analyzer in a few spots — we exclude IDs known to false-
 * positive after manual review (none currently; revisit if it pings).
 */

for (const locale of ['en', 'es'] as const) {
  test(`a11y - ${locale} home (axe WCAG 2.1 AA + best-practice)`, async ({ page }) => {
    await page.goto(`/${locale}`)
    // Wait for any reveals to settle so visibility/contrast checks don't
    // fire against opacity:0 elements.
    await page.waitForTimeout(800)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze()

    if (results.violations.length > 0) {
      console.log('axe violations:', JSON.stringify(results.violations, null, 2))
    }
    expect(results.violations).toEqual([])
  })
}
