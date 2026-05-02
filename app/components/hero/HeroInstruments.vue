<script setup lang="ts">
// Top instrumentation bar — green pulse "open to opportunities" + coords + UTC clock.
const { t } = useI18n()
const utc = useUtcClock()
</script>

<template>
  <div class="instruments">
    <div class="instruments__cell">
      <span class="instruments__dot" aria-hidden="true" />
      <span>{{ t('hero.status') }}</span>
    </div>
    <div class="instruments__cell mono">{{ t('hero.coords') }}</div>
    <div class="instruments__cell mono">T+ {{ utc }}</div>
  </div>
</template>

<style scoped>
.instruments {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 36px;
  padding: 10px 0;
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
  font-size: 11px;
  color: var(--color-fg-mute);
}

.instruments__cell {
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.instruments__dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6fcf97;
  box-shadow: 0 0 0 0 rgb(111 207 151 / 0.6);
  animation: dot-pulse 1.8s infinite;
}

@keyframes dot-pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(111 207 151 / 0.6);
  }
  70% {
    box-shadow: 0 0 0 8px rgb(111 207 151 / 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(111 207 151 / 0);
  }
}
</style>
