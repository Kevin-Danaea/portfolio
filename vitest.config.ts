import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/unit/**/*.{test,spec}.ts', 'app/**/*.{test,spec}.ts'],
    exclude: ['node_modules', '.nuxt', '.output', 'dist', 'tests/e2e/**'],
  },
})
