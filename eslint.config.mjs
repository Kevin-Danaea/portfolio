// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      // Optional props expressed via `prop?: T` in `defineProps<...>()` already
      // convey "may be absent" — adding a `default: undefined` is noise.
      'vue/require-default-prop': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  prettier,
)
