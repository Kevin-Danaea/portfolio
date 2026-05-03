import { test, expect } from '@playwright/test'

/**
 * Smoke test per the spec: load /en and /es and verify each section
 * heading is present. Uses role-based selectors so tests survive
 * cosmetic markup changes.
 */

const headings = {
  en: {
    hero: 'Kevin Danae',
    about: 'Two trajectories',
    stack: 'The toolkit',
    work: 'Experience',
    education: 'Education & credentials',
    now: 'Now',
    contact: "Let's connect",
  },
  es: {
    hero: 'Kevin Danae',
    about: 'Dos trayectorias',
    stack: 'El instrumental',
    work: 'Experiencia',
    education: 'Educación y credenciales',
    now: 'Ahora',
    contact: 'Conectemos',
  },
}

for (const locale of ['en', 'es'] as const) {
  test.describe(`${locale.toUpperCase()} smoke`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${locale}`)
    })

    test(`html lang attribute is locale-correct`, async ({ page }) => {
      const lang = await page.locator('html').getAttribute('lang')
      // @nuxtjs/i18n emits the BCP 47 form (en-US / es-MX)
      expect(lang).toMatch(new RegExp(`^${locale}`))
    })

    test('hero name renders', async ({ page }) => {
      await expect(page.getByRole('heading', { level: 1 })).toContainText(headings[locale].hero)
    })

    test('all 6 section IDs are present in the DOM', async ({ page }) => {
      for (const id of ['about', 'stack', 'work', 'education', 'now', 'contact']) {
        await expect(page.locator(`#${id}`)).toBeVisible()
      }
    })

    test('every section heading is present', async ({ page }) => {
      const h = headings[locale]
      for (const k of ['about', 'stack', 'work', 'education', 'now', 'contact'] as const) {
        await expect(
          page.getByRole('heading', { level: 2 }).filter({ hasText: h[k] }),
        ).toBeVisible()
      }
    })

    test('SkipLink and CTAs are reachable by keyboard', async ({ page }) => {
      await page.keyboard.press('Tab')
      const focused = page.locator(':focus')
      await expect(focused).toHaveClass(/skip-link/)
    })

    test('CV download link exists with correct href', async ({ page }) => {
      const cv = page.locator('a[href="/cv.pdf"]')
      await expect(cv.first()).toBeVisible()
    })

    test('LangToggle switches locale', async ({ page }) => {
      // Strategy is prefix_and_default: EN (default) sits at root, ES at /es.
      // From /en  → click → '/es'
      // From /es  → click → '/'   (root, default locale)
      const expectedPath = locale === 'en' ? '/es' : '/'
      await page.locator('a.lang-toggle').click()
      await expect(page).toHaveURL(new RegExp(`${expectedPath.replace('/', '\\/')}$`))
    })

    test('section anchor links scroll into view', async ({ page }) => {
      await page.locator('a.nav__link[href="#contact"]').click()
      await expect(page.locator('#contact')).toBeInViewport()
    })
  })
}
