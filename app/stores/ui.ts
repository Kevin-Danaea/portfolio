import { defineStore } from 'pinia'

// Cross-component UI prefs. Locale itself is owned by @nuxtjs/i18n;
// this store exists for future toggles (theme, reduced-motion override, etc.).
// Kept minimal in v1 — extend with care.
export const useUiStore = defineStore('ui', () => {
  return {}
})
