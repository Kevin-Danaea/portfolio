/**
 * Type-safe vue-i18n via module augmentation.
 *
 * After this declaration, both `useI18n().t('hero.role')` (Composition API)
 * and `$t('hero.role')` (template) get full key autocompletion + typo errors.
 *
 * Locale parity is enforced two ways:
 *  - statically: en.ts and es.ts both `satisfies LocaleMessages`
 *  - at test time: tests/unit/i18n-parity.test.ts walks both trees recursively
 */
import type { LocaleMessages } from '~/i18n/locales/schema'

declare module 'vue-i18n' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends LocaleMessages {}
}

export {}
