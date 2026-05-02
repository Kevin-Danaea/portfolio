<script setup lang="ts">
// Decorative — physics equations as language-agnostic flavor. Doubled
// for seamless marquee loop. aria-hidden because they're typography only.
const equations = [
  'iℏ ∂Ψ/∂t = ĤΨ',
  'Rμν − ½ R gμν + Λ gμν = 8πG/c⁴ · Tμν',
  '∮ E·dA = Q/ε₀',
  'F = G m₁m₂ / r²',
  'E = mc²',
  'ΔxΔp ≥ ℏ/2',
  'S = k_B ln Ω',
  '∇·B = 0',
  'λ = h/p',
  '(iγᵘ∂ᵤ − m)ψ = 0',
  'ds² = −c²dt² + dx² + dy² + dz²',
  '⟨ψ|Â|ψ⟩',
] as const

const track = [...equations, ...equations]
</script>

<template>
  <div class="eq" aria-hidden="true">
    <div class="eq__track">
      <span v-for="(e, i) in track" :key="i" class="eq__item" :data-accent="i % 3 === 2 || null">
        {{ e }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.eq {
  position: relative;
  margin-top: 80px;
  height: 48px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid var(--color-line);
  border-bottom: 1px solid var(--color-line);
}

.eq::before,
.eq::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.eq::before {
  left: 0;
  background: linear-gradient(90deg, var(--color-bg), transparent);
}

.eq::after {
  right: 0;
  background: linear-gradient(-90deg, var(--color-bg), transparent);
}

.eq__track {
  display: flex;
  gap: 64px;
  padding: 0 32px;
  white-space: nowrap;
  animation: eq-scroll 60s linear infinite;
}

@keyframes eq-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.eq__item {
  flex-shrink: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  color: var(--color-fg-mute);
}

.eq__item[data-accent] {
  color: var(--color-accent);
  opacity: 0.6;
}
</style>
