<script setup lang="ts">
// Photo + concentric SVG orbital rings + floating data callouts.
// The portrait uses a native image intentionally; see the inline note below.
const ticks = Array.from({ length: 36 }, (_, i) => i)
function tickAt(i: number) {
  const a = (i / 36) * Math.PI * 2
  const r1 = 175
  const r2 = i % 9 === 0 ? 188 : 181
  return {
    x1: 200 + Math.cos(a) * r1,
    y1: 200 + Math.sin(a) * r1,
    x2: 200 + Math.cos(a) * r2,
    y2: 200 + Math.sin(a) * r2,
  }
}
</script>

<template>
  <div class="portrait">
    <svg class="portrait__orbits" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <radialGradient id="portrait-halo" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stop-color="rgba(232,160,107,0)" />
          <stop offset="100%" stop-color="rgba(232,160,107,0.18)" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="195" fill="url(#portrait-halo)" />
      <circle
        cx="200"
        cy="200"
        r="170"
        fill="none"
        stroke="rgba(232,160,107,0.35)"
        stroke-width="0.6"
        stroke-dasharray="2 4"
      />
      <circle
        cx="200"
        cy="200"
        r="155"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        stroke-width="0.4"
      />
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="rgba(232,160,107,0.18)"
        stroke-width="0.4"
        stroke-dasharray="1 3"
      />
      <line
        v-for="i in ticks"
        :key="i"
        v-bind="tickAt(i)"
        stroke="rgba(255,255,255,0.25)"
        stroke-width="0.5"
      />
      <g class="portrait__orbit">
        <circle cx="200" cy="30" r="3" fill="#e8a06b" />
        <circle cx="200" cy="30" r="6" fill="rgba(232,160,107,0.2)" />
      </g>
      <g class="portrait__orbit portrait__orbit--rev">
        <circle cx="370" cy="200" r="2" fill="#9bb6ff" />
      </g>
    </svg>

    <div class="portrait__frame">
      <!-- Plain <img> on purpose. NuxtImg's IPX provider generates URLs with
           "&" and "," in the path (/_ipx/w_1024&f_avif,webp&q_85/...) which
           Vercel's static routing doesn't serve correctly. The PNG is small
           and eager-loaded above the fold, so IPX optimization isn't worth
           the deploy fragility here. -->
      <img
        src="/images/kevin.png"
        alt="Portrait of Kevin Aguilera"
        class="portrait__img"
        loading="eager"
        decoding="async"
        width="420"
        height="420"
      />
      <div class="portrait__grid" aria-hidden="true" />
      <span class="portrait__corner portrait__corner--tl" aria-hidden="true">▘</span>
      <span class="portrait__corner portrait__corner--tr" aria-hidden="true">▝</span>
      <span class="portrait__corner portrait__corner--bl" aria-hidden="true">▖</span>
      <span class="portrait__corner portrait__corner--br" aria-hidden="true">▗</span>
      <span class="portrait__tag mono">SUBJECT_001 · K.D.A.B</span>
    </div>

    <div class="portrait__callout portrait__callout--top mono">
      <span class="portrait__pulse" aria-hidden="true" />
      ψ(t) = stable
    </div>
    <div class="portrait__callout portrait__callout--bottom mono">Ω_dev = 1.0</div>
  </div>
</template>

<style scoped>
.portrait {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 1;
}

.portrait__orbits {
  position: absolute;
  inset: -8%;
  width: 116%;
  height: 116%;
  /* Global reset applies max-width: 100% to svg — override so the ring
     can extend 8% outside the portrait frame on all sides. */
  max-width: none;
  z-index: 1;
}

.portrait__orbit {
  /* transform-box: view-box makes transform-origin percentages relative to the
     SVG viewport (the viewBox), not the <g> element's own bounding box.
     center center = (200, 200) in viewBox coords = the ring's true center. */
  transform-box: view-box;
  transform-origin: center center;
  animation: orbit-spin 18s linear infinite;
}

.portrait__orbit--rev {
  transform-box: view-box;
  transform-origin: center center;
  animation: orbit-spin 28s linear infinite reverse;
}

@keyframes orbit-spin {
  to {
    transform: rotate(360deg);
  }
}

.portrait__frame {
  position: absolute;
  inset: 12%;
  z-index: 2;
  border: 1px solid rgb(232 160 107 / 0.4);
  border-radius: 50%;
  overflow: hidden;
  box-shadow:
    inset 0 0 60px rgb(0 0 0 / 0.5),
    0 30px 80px rgb(194 73 59 / 0.18);
}

.portrait__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05) saturate(1.05);
}

.portrait__grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  background:
    repeating-linear-gradient(0deg, transparent 0 19px, rgb(255 255 255 / 0.04) 19px 20px),
    repeating-linear-gradient(90deg, transparent 0 19px, rgb(255 255 255 / 0.04) 19px 20px);
}

.portrait__corner {
  position: absolute;
  font-size: 22px;
  line-height: 1;
  color: var(--color-accent);
}
.portrait__corner--tl {
  top: 4%;
  left: 4%;
}
.portrait__corner--tr {
  top: 4%;
  right: 4%;
}
.portrait__corner--bl {
  bottom: 4%;
  left: 4%;
}
.portrait__corner--br {
  bottom: 4%;
  right: 4%;
}

.portrait__tag {
  position: absolute;
  bottom: 12%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 4px 10px;
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(4px);
  border-radius: 999px;
  color: rgb(255 255 255 / 0.6);
  font-size: 9px;
  letter-spacing: 0.2em;
}

.portrait__callout {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: rgb(13 13 24 / 0.85);
  border: 1px solid var(--color-line-strong);
  border-radius: 6px;
  color: var(--color-fg-dim);
  font-size: 10px;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.portrait__callout--top {
  top: 8%;
  right: -4%;
}

.portrait__callout--bottom {
  bottom: 14%;
  left: -8%;
}

.portrait__pulse {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6fcf97;
  box-shadow: 0 0 0 0 rgb(111 207 151 / 0.6);
  animation: portrait-pulse 1.8s infinite;
}

@keyframes portrait-pulse {
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

@media (max-width: 980px) {
  .portrait__callout--top {
    right: 4%;
  }
  .portrait__callout--bottom {
    left: 4%;
  }
}
</style>
