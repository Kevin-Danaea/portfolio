<script setup lang="ts">
// Persistent top navigation. Section links are in-page anchors that resolve
// to the IDs defined by section components in step 8. Adds a "scrolled"
// class once we cross 40px so the bar gains a backdrop and a subtle border.

const { t } = useI18n()
const scrolled = useScrollState(40)

const links = computed(() => [
  { id: 'about', label: t('nav.about') },
  { id: 'stack', label: t('nav.stack') },
  { id: 'work', label: t('nav.work') },
  { id: 'education', label: t('nav.education') },
  { id: 'now', label: t('nav.now') },
  { id: 'contact', label: t('nav.contact') },
])
</script>

<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <a class="nav__brand" href="#top">
      <span class="nav__brand-mark" aria-hidden="true">⌬</span>
      <span class="nav__brand-name">Kevin Aguilera</span>
      <span class="nav__brand-meta mono">/ engineer + cosmonaut</span>
    </a>

    <div class="nav__links">
      <a v-for="l in links" :key="l.id" :href="`#${l.id}`" class="nav__link mono">
        {{ l.label }}
      </a>
    </div>

    <div class="nav__right">
      <LangToggle />
    </div>
  </nav>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  backdrop-filter: blur(10px) saturate(120%);
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  transition:
    background var(--dur-base) var(--ease-out),
    padding var(--dur-base) var(--ease-out),
    border-color var(--dur-base) var(--ease-out);
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgb(8 8 14 / 0.7);
  border-bottom-color: var(--color-line);
  padding: 12px 32px;
}

.nav__brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.nav__brand-mark {
  display: inline-block;
  color: var(--color-accent);
  font-size: 22px;
  line-height: 1;
  animation: nav-spin 24s linear infinite;
}

@keyframes nav-spin {
  to {
    transform: rotate(360deg);
  }
}

.nav__brand-name {
  font-family: var(--font-serif);
  font-size: 18px;
  letter-spacing: 0.01em;
}

.nav__brand-meta {
  color: var(--color-fg-mute);
  font-size: 11px;
  letter-spacing: 0.05em;
}

.nav__links {
  display: flex;
  gap: 28px;
}

.nav__link {
  position: relative;
  color: var(--color-fg-dim);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color var(--dur-base) var(--ease-out);
}

.nav__link:hover {
  color: var(--color-accent);
}

.nav__link::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width var(--dur-base) var(--ease-out);
}

.nav__link:hover::before {
  width: 100%;
}

.nav__right {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (max-width: 880px) {
  .nav__links,
  .nav__brand-meta {
    display: none;
  }
}
</style>
