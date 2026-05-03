// https://nuxt.com/docs/api/configuration/nuxt-config
//
// Convention-over-configuration audit: this file only contains options that
// (a) opt into intentional non-defaults, or (b) configure modules with values
// the framework cannot infer (locales list, font families, site identity).
// Anything Nuxt or a module already does by default is NOT repeated here.
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    // Opts into Nuxt 4 layout (srcDir = app/) on Nuxt 3.x.
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },

  // Components folders that opt out of the default subfolder-name prefix.
  // - ui/        → Base* primitives, prefix would just repeat ("UiBaseButton")
  // - cosmic/    → single CosmicField.vue, prefix would double the word
  // - layout/    → The*-prefixed singletons, prefix would shadow the convention
  // - hero/      → Hero* and PortraitCard, names already speak for themselves
  // - sections/  → *Section components, prefix would just repeat
  // Everything else keeps the default convention.
  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/cosmic', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/hero', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    '~/components',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
    '@nuxtjs/robots',
  ],

  // Single source of truth consumed by sitemap, robots and schema-org modules.
  site: {
    url: 'https://kevinaguilera.tech',
    name: 'Kevin Aguilera',
    description: 'Software Engineer · Full Stack',
    defaultLocale: 'en',
  },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    baseUrl: 'https://kevinaguilera.tech',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.ts', name: 'English', dir: 'ltr' },
      { code: 'es', language: 'es-MX', file: 'es.ts', name: 'Español', dir: 'ltr' },
    ],
    // @nuxtjs/i18n@10 resolves restructureDir from rootDir (not srcDir),
    // so we point it explicitly at app/i18n to keep i18n co-located with code.
    restructureDir: 'app/i18n',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },

  fonts: {
    families: [
      {
        name: 'Instrument Serif',
        weights: [400],
        styles: ['normal', 'italic'],
        provider: 'google',
      },
      { name: 'Geist', weights: [300, 400, 500, 600], provider: 'google' },
      { name: 'JetBrains Mono', weights: [400, 500], provider: 'google' },
    ],
    defaults: { subsets: ['latin'] },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 85,
  },

  schemaOrg: {
    identity: 'Person',
  },

  robots: {
    sitemap: 'https://kevinaguilera.tech/sitemap.xml',
  },

  // Global CSS, in cascade order: tokens → reset → base.
  // Component/section styles live with their components (scoped or not).
  css: ['~/assets/styles/tokens.css', '~/assets/styles/reset.css', '~/assets/styles/base.css'],

  nitro: {
    preset: 'static',
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
