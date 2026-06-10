<template>
  <section class="landing">
    <div class="landing__stage">
      <div class="landing__scene">
        <img
          src="/img/background_white.svg"
          alt=""
          class="landing__bg"
        >
        <img
          src="/img/mountain_layer2_dark.svg"
          alt=""
          class="landing__mountain landing__mountain--back"
          :style="{ transform: mountainTransform(14) }"
        >
        <img
          src="/img/mountain_layer1_dark.svg"
          alt=""
          class="landing__mountain landing__mountain--front"
          :style="{ transform: mountainTransform(28) }"
        >
      </div>

      <img
        src="/img/frame.svg"
        alt=""
        class="landing__frame"
      >

      <!-- Edit ellipses below -->
      <svg
        class="landing__ellipses"
        viewBox="0 0 120 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ellipses-line-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1F1F1F" />
            <stop offset="100%" stop-color="#CFCFCF" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="landing__ellipse-float landing__ellipse-float--1">
          <g class="landing__ellipse-fall landing__ellipse-fall--1">
            <line x1="10" y1="0" x2="10" y2="34" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="10" cy="42" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--2">
          <g class="landing__ellipse-fall landing__ellipse-fall--2">
            <line x1="28" y1="0" x2="28" y2="40" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="30" cy="46" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--3">
          <g class="landing__ellipse-fall landing__ellipse-fall--3">
            <line x1="46" y1="0" x2="46" y2="46" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="50" cy="50" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--4">
          <g class="landing__ellipse-fall landing__ellipse-fall--4">
            <line x1="64" y1="0" x2="64" y2="50" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="70" cy="54" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--5">
          <g class="landing__ellipse-fall landing__ellipse-fall--5">
            <line x1="82" y1="0" x2="82" y2="54" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="90" cy="58" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--6">
          <g class="landing__ellipse-fall landing__ellipse-fall--6">
            <line x1="100" y1="0" x2="100" y2="58" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="110" cy="62" r="8" fill="#1F1F1F" />
          </g>
        </g>
      </svg>

      <!-- Bottom-left ellipses -->
      <svg
        class="landing__ellipses landing__ellipses--bottom-left"
        viewBox="0 0 32 108"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g class="landing__ellipse-float landing__ellipse-float--bl-1">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-1">
            <circle cx="16" cy="10" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-2">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-2">
            <circle cx="16" cy="36" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-3">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-3">
            <circle cx="16" cy="62" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-4">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-4">
            <circle cx="16" cy="88" r="8" fill="#1F1F1F" />
          </g>
        </g>
      </svg>

      <div class="landing__bar landing__bar--top" />
      <div class="landing__bar landing__bar--bottom" />

      <p class="landing__label landing__label--top">
        Portfolio showcase
      </p>
      <p class="landing__label landing__label--bottom">
        About me
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const prefersReducedMotion = ref(false)

let motionQuery: MediaQueryList | null = null

function handleMouseMove(event: MouseEvent) {
  if (prefersReducedMotion.value) {
    return
  }

  mouseX.value = (event.clientX / window.innerWidth - 0.5) * 2
  mouseY.value = (event.clientY / window.innerHeight - 0.5) * 2
}

function handleMotionPreference(event: MediaQueryListEvent) {
  prefersReducedMotion.value = event.matches

  if (event.matches) {
    mouseX.value = 0
    mouseY.value = 0
  }
}

function mountainTransform(depth: number) {
  if (prefersReducedMotion.value) {
    return 'translateX(-50%)'
  }

  const x = mouseX.value * depth
  const y = mouseY.value * depth * 0.35

  return `translate(calc(-50% + ${x}px), ${y}px)`
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', handleMotionPreference)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  motionQuery?.removeEventListener('change', handleMotionPreference)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.landing {
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #CFCFCF;
  padding: 0.75rem 0;
}

.landing__stage {
  position: relative;
  width: min(95vw, 1100px);
}

.landing__stage::before {
  content: '';
  display: block;
  padding-top: 63.24%;
}

.landing__scene,
.landing__frame,
.landing__ellipses,
.landing__bar,
.landing__label {
  position: absolute;
}

.landing__scene {
  inset: 2.2% 2%;
  overflow: hidden;
}

.landing__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.landing__mountain {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 105%;
  max-width: none;
  object-fit: contain;
  object-position: bottom center;
  transition: transform 0.35s ease-out;
  will-change: transform;
}

.landing__mountain--back {
  width: 108%;
}

.landing__frame {
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.landing__ellipses {
  top: -15%;
  right: -5%;
  width: 35%;
  height: auto;
  pointer-events: none;
  z-index: 5;
  overflow: visible;
}

.landing__ellipses--bottom-left {
  top: auto;
  right: auto;
  bottom: 6%;
  left: 1.5%;
  width: 8%;
  height: 52%;
}

.landing__ellipse-fall,
.landing__ellipse-float {
  transform-box: fill-box;
  transform-origin: top center;
}

.landing__ellipse-fall {
  animation: ellipse-fall 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__ellipse-fall--1 { animation-delay: 0.2s; }
.landing__ellipse-fall--2 { animation-delay: 0.35s; }
.landing__ellipse-fall--3 { animation-delay: 0.5s; }
.landing__ellipse-fall--4 { animation-delay: 0.65s; }
.landing__ellipse-fall--5 { animation-delay: 0.8s; }
.landing__ellipse-fall--6 { animation-delay: 0.95s; }

.landing__ellipse-float {
  animation: ellipse-float 2.6s ease-in-out infinite;
}

.landing__ellipse-float--1 { animation-delay: 0.9s; }
.landing__ellipse-float--2 { animation-delay: 1.05s; }
.landing__ellipse-float--3 { animation-delay: 1.2s; }
.landing__ellipse-float--4 { animation-delay: 1.35s; }
.landing__ellipse-float--5 { animation-delay: 1.5s; }
.landing__ellipse-float--6 { animation-delay: 1.65s; }

.landing__ellipse-fall--bl-1 { animation-delay: 0.25s; }
.landing__ellipse-fall--bl-2 { animation-delay: 0.4s; }
.landing__ellipse-fall--bl-3 { animation-delay: 0.55s; }
.landing__ellipse-fall--bl-4 { animation-delay: 0.7s; }

.landing__ellipse-float--bl-1 { animation-delay: 0.95s; }
.landing__ellipse-float--bl-2 { animation-delay: 1.1s; }
.landing__ellipse-float--bl-3 { animation-delay: 1.25s; }
.landing__ellipse-float--bl-4 { animation-delay: 1.4s; }

.landing__bar {
  height: 14%;
  background-color: #1F1F1F;
  z-index: 3;
}

.landing__bar--top {
  top: 10%;
  left: calc(-50vw + 50%);
  width: calc(5vw + 38%);
  animation: slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__bar--bottom {
  bottom: 10%;
  right: calc(-50vw + 50%);
  width: calc(5vw + 38%);
  animation: slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__label {
  display: flex;
  align-items: center;
  margin: 0;
  font-family: 'Kapakana', cursive;
  font-size: clamp(8rem, 10vw, 14rem);
  line-height: 1;
  z-index: 4;
}

.landing__label--top {
  top: 20%;
  height: 1%;
  left: -10%;
  color: #6e77c7;
  animation: slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

.landing__label--bottom {
  bottom: -10%;
  top: 62%;
  right: 2%;
  color: #6e77c7;
  animation: slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

@keyframes slide-in-from-left {
  from {
    opacity: 0;
    transform: translateX(-120%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(120%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes ellipse-fall {
  from {
    opacity: 0;
    transform: translateY(-36px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ellipse-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing__bar--top,
  .landing__bar--bottom,
  .landing__label--top,
  .landing__label--bottom,
  .landing__ellipse-fall,
  .landing__ellipse-float {
    animation: none;
  }

  .landing__mountain {
    transition: none;
  }
}
</style>
