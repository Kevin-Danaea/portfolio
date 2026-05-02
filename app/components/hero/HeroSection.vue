<script setup lang="ts">
// Composes the hero: instruments → text+portrait grid → equation strip.
const { t, tm, rt } = useI18n()

const nameLines = computed(() => t('hero.name').split('\n'))

// taglineWords is an array; tm() returns the raw message tree, rt() resolves
// each entry through vue-i18n so escapes (like {'@'}) render correctly.
const words = computed<string[]>(() => {
  const raw = tm('hero.taglineWords') as unknown[]
  return raw.map((w) => rt(w as string))
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-heading">
    <HeroInstruments />

    <div class="hero__grid">
      <div class="hero__text">
        <p class="hero__role mono">— {{ t('hero.role') }}</p>
        <h1 id="hero-heading" class="hero__name">
          <span v-for="(line, i) in nameLines" :key="i" class="hero__name-line">{{ line }}</span>
        </h1>
        <p class="hero__tag">
          {{ t('hero.tagline') }}
          <HeroRotator :words="words" />
        </p>
        <p class="hero__blurb">{{ t('hero.blurb') }}</p>
        <div class="hero__ctas">
          <BaseButton variant="primary" href="#contact">
            {{ t('hero.cta1') }}
            <template #icon>→</template>
          </BaseButton>
          <BaseButton variant="ghost" href="/cv.pdf" target="_blank" download>
            {{ t('hero.cta2') }}
            <template #icon>↓</template>
          </BaseButton>
        </div>
      </div>

      <div class="hero__portrait">
        <PortraitCard />
      </div>
    </div>

    <EquationStrip />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: var(--shell-max);
  min-height: 100vh;
  margin: 0 auto;
  padding: 140px var(--shell-pad-x) 80px;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero__role {
  margin-bottom: 24px;
  color: var(--color-accent);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.hero__name {
  margin: 0 0 28px;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--type-display);
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.hero__name-line {
  display: block;
}

.hero__name-line:nth-child(2) {
  padding-left: 0.4em;
  color: var(--color-accent);
  font-style: italic;
}

.hero__tag {
  margin: 0 0 24px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(20px, 2.6vw, 30px);
  line-height: 1.3;
  color: var(--color-fg-dim);
}

.hero__blurb {
  margin: 0 0 36px;
  max-width: 56ch;
  color: var(--color-fg-dim);
  font-size: 17px;
  line-height: 1.65;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

@media (max-width: 980px) {
  .hero {
    padding-top: 110px;
  }
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

@media (max-width: 700px) {
  .hero {
    padding-left: var(--shell-pad-x-sm);
    padding-right: var(--shell-pad-x-sm);
  }
}
</style>
