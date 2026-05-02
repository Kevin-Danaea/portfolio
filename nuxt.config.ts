// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,

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

  site: {
    url: 'https://kevinaguilera.tech',
    name: 'Kevin Aguilera',
    description: 'Software Engineer · Full Stack',
    defaultLocale: 'en',
  },

  i18n: {
    strategy: 'prefix_and_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.ts', name: 'English', dir: 'ltr' },
      { code: 'es', language: 'es-MX', file: 'es.ts', name: 'Español', dir: 'ltr' },
    ],
    restructureDir: 'app/i18n',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    baseUrl: 'https://kevinaguilera.tech',
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
    defaults: {
      subsets: ['latin'],
    },
  },

  image: {
    format: ['avif', 'webp'],
    quality: 85,
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  schemaOrg: {
    identity: 'Person',
  },

  robots: {
    sitemap: 'https://kevinaguilera.tech/sitemap.xml',
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
      },
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
