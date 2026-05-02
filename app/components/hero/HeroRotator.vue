<script setup lang="ts">
// Rotates through `words` every `intervalMs` with a soft cross-fade.
// Caret blink is pure CSS; reduced-motion neutralizes it via the global rule
// in app/assets/styles/base.css.
const props = withDefaults(
  defineProps<{
    words: readonly string[]
    intervalMs?: number
  }>(),
  { intervalMs: 2200 },
)

const idx = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (props.words.length < 2) return
  timer = setInterval(() => {
    idx.value = (idx.value + 1) % props.words.length
  }, props.intervalMs)
})

onBeforeUnmount(() => {
  if (timer !== null) clearInterval(timer)
})

const current = computed(() => props.words[idx.value] ?? '')
</script>

<template>
  <span class="rotator">
    <span :key="idx" class="rotator__word">{{ current }}</span>
    <span class="rotator__caret" aria-hidden="true">_</span>
  </span>
</template>

<style scoped>
.rotator {
  display: inline-block;
  position: relative;
  vertical-align: baseline;
  min-width: 160px;
}

.rotator__word {
  display: inline-block;
  padding: 0 8px;
  border-radius: 4px;
  background: rgb(232 160 107 / 0.08);
  color: var(--color-accent);
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 0.85em;
  animation: rotator-in var(--dur-base) var(--ease-out);
}

@keyframes rotator-in {
  from {
    opacity: 0;
    transform: translateY(8px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.rotator__caret {
  display: inline-block;
  margin-left: 2px;
  color: var(--color-accent);
  animation: rotator-blink 1.2s steps(1) infinite;
}

@keyframes rotator-blink {
  50% {
    opacity: 0;
  }
}
</style>
