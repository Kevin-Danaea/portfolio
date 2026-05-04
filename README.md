# kevinaguilera.tech

Personal portfolio for Kevin Danae Aguilera Barragán — a software engineer at the intersection of **shipping software and studying physics**. Built as a Nuxt 3 SSG with a hand-rolled animated cosmic backdrop, bilingual content (EN/ES), and a focus on accessibility, performance, and convention-over-configuration.

> Live at [kevinaguilera.tech](https://kevinaguilera.tech)

---

## Stack

| Layer       | Choice                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| Framework   | Nuxt 3 (`compatibilityVersion: 4` — Nuxt 4 layout, `srcDir: app/`)                |
| Language    | TypeScript strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`     |
| Render mode | Static Site Generation (`nitro.preset: 'static'`)                                 |
| Styling     | Vanilla CSS with custom properties (no framework, no preprocessor)                |
| i18n        | `@nuxtjs/i18n` v10, `prefix_and_default` strategy, EN + ES                        |
| Animation   | Custom `<canvas>` engine (zero dependencies) for stars, planets, comets, BH       |
| SEO         | `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org` (Person + WebSite JSON-LD) |
| Fonts       | `@nuxt/fonts` — Instrument Serif, Geist, JetBrains Mono                           |
| Hosting     | Vercel (static)                                                                   |
| Tests       | Vitest (unit) + Playwright (E2E) + axe-core (a11y)                                |

---

## Architecture highlights

### Cosmic field engine

A self-contained canvas physics simulation under `app/components/cosmic/engine/` with a thin Vue wrapper:

```
engine/
  types.ts         shared shapes (Star, Planet, Comet, BlackHole, Scene)
  seed.ts          pure factories — createScene, createStar, createComet
  physics.ts       pure functions — gravity, friction, wrap, twinkle
  draw.ts          pure rendering — every body has a draw* function
  useCosmicEngine.ts  orchestrates seed → loop → draw, owns RAF lifecycle
```

The component (`CosmicField.vue`) is a dumb shell: it owns the `<canvas>` ref and forwards `start`/`stop` to the composable. All physics and drawing live in pure functions, which is what lets `tests/unit/cosmic-physics.test.ts` cover them without a DOM.

Two correctness details worth flagging:

- **Reduced motion**: the engine reads `prefers-reduced-motion` once at construction and renders a single static frame instead of running RAF.
- **iOS Safari resize storm**: the address bar collapses on scroll, firing `resize` constantly. The engine only re-seeds the scene on **width** changes, never height-only — otherwise every star teleports to a new random spot mid-scroll.

### Reveal-on-scroll

`useReveal` (in `app/composables/`) wraps `IntersectionObserver` with a one-shot toggle. Sections add a `.reveal` class; once they cross the viewport threshold the composable adds `.is-in`, transitioning opacity + Y offset. The reduced-motion media query collapses the transition to `0.01ms` globally (in `base.css`), so the same markup works for both motion preferences without conditional logic.

### i18n with build-breaking parity

Locales live in `app/i18n/locales/{en,es}.ts`. Both files share a `Messages` interface — adding a key in one without the other fails `nuxt typecheck`. There's also a `tests/unit/i18n-parity.test.ts` that walks both trees and fails if any path diverges, so CI catches drift before deploy.

### Convention over configuration

`nuxt.config.ts` only contains:

1. Opt-ins to non-defaults (`compatibilityVersion: 4`, strict TS via `tsconfig.json`).
2. Module config that the framework can't infer (locale list, font families, site identity).

Anything Nuxt does by default is **not** repeated. The components folders use `pathPrefix: false` only where the prefix would either repeat the folder name (`Ui*` for `ui/`, `Hero*` for `hero/`) or shadow a chosen convention (`The*` for `layout/` singletons).

---

## Local development

Requires Node 22+ and pnpm.

```bash
pnpm install        # install deps + nuxt prepare (runs automatically)
pnpm dev            # http://localhost:3000
```

### Other scripts

| Command               | What it does                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| `pnpm build`          | Build for production (writes to `.output/`)                            |
| `pnpm generate`       | Static site generation (writes pre-rendered HTML to `.output/public/`) |
| `pnpm preview`        | Preview the production build                                           |
| `pnpm preview:static` | Serve the SSG output locally on `:4173` (mirrors Vercel)               |
| `pnpm typecheck`      | `nuxt typecheck` — strict, blocks on any TS error                      |
| `pnpm lint`           | ESLint                                                                 |
| `pnpm lint:fix`       | ESLint with autofix                                                    |
| `pnpm format`         | Prettier write                                                         |
| `pnpm format:check`   | Prettier check (CI)                                                    |
| `pnpm test`           | Vitest unit tests (one shot)                                           |
| `pnpm test:watch`     | Vitest in watch mode                                                   |
| `pnpm test:e2e`       | Generates the static site, then runs Playwright + axe-core             |

A pre-commit hook runs `lint-staged` (ESLint + Prettier on staged files) and `nuxt typecheck`. A failing hook **doesn't** create the commit — fix the issue and re-stage rather than amending.

---

## Project structure

```
app/
  app.vue                    site shell (nav + page + footer + cosmic backdrop)
  pages/
    index.vue                single-page landing — composes all sections
  components/
    cosmic/                  CosmicField.vue + engine/
    hero/                    HeroSection, HeroInstruments, HeroRotator, PortraitCard, EquationStrip
    layout/                  TheNav, TheFooter, SkipLink, LangToggle
    sections/                AboutSection, StackSection, WorkSection, EducationSection, NowSection, ContactSection
    ui/                      BaseButton, BaseChip, BaseTag, SectionHeading, Eyebrow
  composables/               useReveal, useScrollState, usePrefersReducedMotion
  stores/                    Pinia (currently just locale-aware utilities)
  i18n/locales/              en.ts, es.ts (typed against shared Messages interface)
  assets/styles/             tokens.css → reset.css → base.css (loaded in that order)
  types/                     shared TS types
public/
  images/kevin.png           hero portrait (raw PNG, served as-is)
  cv.pdf, favicon.svg, robots.txt, og-image.png
tests/
  unit/                      Vitest — one file per behavior, not per file
  e2e/                       Playwright + axe-core — smoke, a11y, reduced-motion
nuxt.config.ts               see "Convention over configuration" above
tsconfig.json                strict + noUncheckedIndexedAccess + exactOptionalPropertyTypes
```

---

## Accessibility & performance

- **Lighthouse**: 100 / 100 / 100 / 100 desktop, 93 mobile (last measured: roadmap step 11).
- **`prefers-reduced-motion`** is honored everywhere: section reveals, hero rotator caret, portrait pulse, cosmic engine.
- **Skip link** to `#main` is the first focusable element in the DOM.
- All decorative SVGs and the cosmic canvas carry `aria-hidden="true"`.
- Bilingual: `lang` and `hreflang` are emitted by `@nuxtjs/i18n`; the canonical URL points at `https://kevinaguilera.tech` via `site.url`.

---

## Deployment

The site is deployed to Vercel as static output. Two specific things to know if you fork or self-host:

1. **Image optimization is intentionally native**. `@nuxt/image`/IPX URLs did not deploy cleanly to Vercel static in this project because the generated paths contained `&` and `,` (`/_ipx/w_1024&f_avif,webp&q_85/...`) and Vercel's static routing did not resolve them to the on-disk files. The portrait uses a plain `<img>` for that reason — the PNG is small and eager-loaded above the fold, so IPX size variants weren't earning their keep.
2. **DNS** is delegated to Vercel (`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) so SSL cert renewal and subdomain setup are managed automatically.

---

## License

Source code: MIT (do whatever you want with the engine, components, patterns).  
Content (copy, photo, CV): © Kevin Danae Aguilera Barragán — all rights reserved.
