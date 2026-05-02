<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useCosmicEngine } from './engine/useCosmicEngine'
import type { Hex } from './engine/types'

interface Props {
  /** 0.2 – 2.5 ; default 1. Scales star and dust counts. */
  density?: number
  /** Hex accent for tinted comet trails. */
  accent?: Hex
  /** Force a single static frame (auto-true if prefers-reduced-motion). */
  paused?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  density: 1,
  accent: '#e8a06b',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

// All physics + drawing live in the composable. This component is the
// canvas+lifecycle wrapper, nothing more.
const { start, stop } = useCosmicEngine({
  canvas: canvasRef,
  density: props.density,
  accent: props.accent,
  paused: props.paused,
})

onMounted(() => start())
onBeforeUnmount(() => stop())
</script>

<template>
  <canvas ref="canvasRef" class="cosmic-field" aria-hidden="true" />
</template>

<style scoped>
.cosmic-field {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: transparent;
}
</style>
