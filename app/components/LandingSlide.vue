<script setup lang="ts">
defineProps<{
  slideId: string
  slideCount: number
  isActive: boolean
  showMountains: boolean
  mountainBackStyle: Record<string, string>
  mountainFrontStyle: Record<string, string>
  animatedMountains: boolean
  topLabel: string
  bottomLabel: string
  bodyText?: string
  topLabelInteractive?: boolean
  bottomLabelInteractive?: boolean
}>()

const emit = defineEmits<{
  topLabelClick: []
  bottomLabelClick: []
}>()
</script>

<template>
  <div
    class="landing__slide"
    :class="{ 'landing__slide--active': isActive }"
    :style="{ flex: `0 0 ${100 / slideCount}%` }"
  >
    <div class="landing__stage">
      <div class="landing__scene">
        <div
          v-if="showMountains"
          class="landing__mountains"
        >
          <div
            class="landing__mountain-wrap landing__mountain-wrap--back"
            :style="mountainBackStyle"
          >
            <div
              class="landing__mountain-inner landing__mountain-inner--back"
              :class="{ 'landing__mountain-inner--animated': animatedMountains && isActive }"
            >
              <svg
                class="landing__mountain"
                viewBox="0 0 961 478"
                preserveAspectRatio="xMidYMax meet"
                aria-hidden="true"
              >
                <path
                  d="M81.1396 1.99526C-54.1994 -30.2049 20.6397 337.995 20.6397 337.995L32.1397 477.995H952.64C940.729 308.507 993.14 -128.505 922.14 43.9951C851.14 216.495 659.32 33.0015 554.14 43.9958C449.958 54.8857 314.309 326.605 209.64 322.495C151.838 320.225 137.415 15.3845 81.1396 1.99526Z"
                  fill="#919191"
                />
              </svg>
            </div>
          </div>

          <div
            class="landing__mountain-wrap landing__mountain-wrap--front"
            :style="mountainFrontStyle"
          >
            <div
              class="landing__mountain-inner landing__mountain-inner--front"
              :class="{ 'landing__mountain-inner--animated': animatedMountains && isActive }"
            >
              <svg
                class="landing__mountain"
                viewBox="0 0 1178 553"
                preserveAspectRatio="xMidYMax meet"
                aria-hidden="true"
              >
                <path
                  d="M130 261.517C23.714 277.06 0 430.018 0 430.018V552.518H1178L1168 143.018C1168 143.018 1129.01 1.62851 1032 0.017794C831.181 -3.31638 628 463.018 445.5 463.018C283.118 463.018 290.673 238.022 130 261.517Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          v-if="bodyText || !showMountains"
          class="landing__content"
        >
          <div class="landing__text-block">
            <p v-if="bodyText">
              {{ bodyText }}
            </p>
            <slot v-else />
          </div>
        </div>
      </div>

      <img
        src="/img/frame.svg"
        alt=""
        class="landing__frame"
      >

      <!-- Top-right ellipses (disabled for now)
      <svg
        class="landing__ellipses"
        viewBox="0 0 120 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient :id="`ellipses-line-gradient-${slideId}`" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1F1F1F" />
            <stop offset="100%" stop-color="#CFCFCF" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="landing__ellipse-float landing__ellipse-float--1">
          <g class="landing__ellipse-fall landing__ellipse-fall--1">
            <line x1="10" y1="0" x2="10" y2="34" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="10" cy="42" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--2">
          <g class="landing__ellipse-fall landing__ellipse-fall--2">
            <line x1="28" y1="0" x2="28" y2="40" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="30" cy="46" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--3">
          <g class="landing__ellipse-fall landing__ellipse-fall--3">
            <line x1="46" y1="0" x2="46" y2="46" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="50" cy="50" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--4">
          <g class="landing__ellipse-fall landing__ellipse-fall--4">
            <line x1="64" y1="0" x2="64" y2="50" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="70" cy="54" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--5">
          <g class="landing__ellipse-fall landing__ellipse-fall--5">
            <line x1="82" y1="0" x2="82" y2="54" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="90" cy="58" r="8" fill="#1F1F1F" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--6">
          <g class="landing__ellipse-fall landing__ellipse-fall--6">
            <line x1="100" y1="0" x2="100" y2="58" :stroke="`url(#ellipses-line-gradient-${slideId})`" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="110" cy="62" r="8" fill="#1F1F1F" />
          </g>
        </g>
      </svg>
      -->

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
            <circle cx="16" cy="10" r="8" fill="#5E7AB5" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-2">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-2">
            <circle cx="16" cy="36" r="8" fill="#5E7AB5" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-3">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-3">
            <circle cx="16" cy="62" r="8" fill="#5E7AB5" />
          </g>
        </g>

        <g class="landing__ellipse-float landing__ellipse-float--bl-4">
          <g class="landing__ellipse-fall landing__ellipse-fall--bl-4">
            <circle cx="16" cy="88" r="8" fill="#5E7AB5" />
          </g>
        </g>
      </svg>

      <div class="landing__bar landing__bar--top" />
      <div class="landing__bar landing__bar--bottom" />

      <component
        :is="topLabelInteractive ? 'button' : 'p'"
        class="landing__label landing__label--top"
        :class="{ 'landing__label--interactive': topLabelInteractive }"
        :type="topLabelInteractive ? 'button' : undefined"
        @click="topLabelInteractive && emit('topLabelClick')"
      >
        {{ topLabel }}
      </component>

      <component
        :is="bottomLabelInteractive ? 'button' : 'p'"
        class="landing__label landing__label--bottom"
        :class="{ 'landing__label--interactive': bottomLabelInteractive }"
        :type="bottomLabelInteractive ? 'button' : undefined"
        @click="bottomLabelInteractive && emit('bottomLabelClick')"
      >
        {{ bottomLabel }}
      </component>
    </div>
  </div>
</template>

<style scoped>
.landing__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0.75rem 0;
  overflow: hidden;
}

.landing__stage {
  position: relative;
  z-index: 1;
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
  background: #ffffff;
}

.landing__content {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12% 0%;
}

.landing__text-block {
  width: 100%;
  max-width: 18rem;
  min-height: 75%;
  max-height: 100%;
  padding: 1.75rem 2rem;
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(0.875rem, 1.6vw, 1rem);
  line-height: 1.6;
  overflow: auto;
}

.landing__text-block p {
  margin: 0;
}

.landing__mountains {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.landing__mountain-wrap {
  position: absolute;
  left: 50%;
  bottom: 0;
  transition: transform 0.35s ease-out;
  will-change: transform;
}

.landing__mountain-wrap--back {
  width: 100%;
  z-index: 1;
}

.landing__mountain-wrap--front {
  width: 105%;
  z-index: 2;
}

.landing__mountain-inner {
  width: 100%;
}

.landing__mountain-inner--animated {
  animation: mountain-drift 6s ease-in-out infinite;
}

.landing__mountain-inner--animated.landing__mountain-inner--back {
  animation-duration: 7s;
  animation-delay: -2s;
}

.landing__mountain-inner--animated.landing__mountain-inner--front {
  animation-duration: 5s;
  animation-delay: -3s;
}

.landing__mountain {
  display: block;
  width: 100%;
  height: auto;
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
  opacity: 0;
}

.landing__slide--active .landing__ellipse-fall {
  animation: ellipse-fall 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__slide--active .landing__ellipse-float {
  animation: ellipse-float 2.6s ease-in-out infinite;
}

.landing__slide--active .landing__ellipse-fall--1 { animation-delay: 0.2s; }
.landing__slide--active .landing__ellipse-fall--2 { animation-delay: 0.35s; }
.landing__slide--active .landing__ellipse-fall--3 { animation-delay: 0.5s; }
.landing__slide--active .landing__ellipse-fall--4 { animation-delay: 0.65s; }
.landing__slide--active .landing__ellipse-fall--5 { animation-delay: 0.8s; }
.landing__slide--active .landing__ellipse-fall--6 { animation-delay: 0.95s; }

.landing__slide--active .landing__ellipse-float--1 { animation-delay: 0.9s; }
.landing__slide--active .landing__ellipse-float--2 { animation-delay: 1.05s; }
.landing__slide--active .landing__ellipse-float--3 { animation-delay: 1.2s; }
.landing__slide--active .landing__ellipse-float--4 { animation-delay: 1.35s; }
.landing__slide--active .landing__ellipse-float--5 { animation-delay: 1.5s; }
.landing__slide--active .landing__ellipse-float--6 { animation-delay: 1.65s; }

.landing__slide--active .landing__ellipse-fall--bl-1 { animation-delay: 0.25s; }
.landing__slide--active .landing__ellipse-fall--bl-2 { animation-delay: 0.4s; }
.landing__slide--active .landing__ellipse-fall--bl-3 { animation-delay: 0.55s; }
.landing__slide--active .landing__ellipse-fall--bl-4 { animation-delay: 0.7s; }

.landing__slide--active .landing__ellipse-float--bl-1 { animation-delay: 0.95s; }
.landing__slide--active .landing__ellipse-float--bl-2 { animation-delay: 1.1s; }
.landing__slide--active .landing__ellipse-float--bl-3 { animation-delay: 1.25s; }
.landing__slide--active .landing__ellipse-float--bl-4 { animation-delay: 1.4s; }

.landing__slide:not(.landing__slide--active) .landing__ellipse-fall,
.landing__slide:not(.landing__slide--active) .landing__ellipse-float {
  animation: none;
  opacity: 0;
}

.landing__bar {
  height: 6%;
  background-color: #1F1F1F;
  z-index: 3;
}

.landing__bar--top {
  top: 16%;
  left: calc(-50vw + 50%);
  width: calc(5vw + 75%);
}

.landing__bar--bottom {
  bottom: 10%;
  right: calc(-50vw + 50%);
  width: calc(5vw + 38%);
}

.landing__slide--active .landing__bar--top {
  animation: slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__slide--active .landing__bar--bottom {
  animation: slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__slide:not(.landing__slide--active) .landing__bar,
.landing__slide:not(.landing__slide--active) .landing__label {
  opacity: 0;
  animation: none;
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

.landing__label--interactive {
  pointer-events: auto;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  text-align: left;
}

.landing__label--interactive.landing__label--bottom {
  text-align: right;
}

.landing__label--interactive:hover {
  opacity: 0.85;
}

.landing__label--top {
  top: 17%;
  height: 1%;
  left: -10%;
  color: #5e7ab5;
}

.landing__label--bottom {
  bottom: -10%;
  top: 62%;
  right: -5%;
  color: #5e7ab5;
}

.landing__slide--active .landing__label--top {
  animation: slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

.landing__slide--active .landing__label--bottom {
  animation: slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

@keyframes mountain-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(14px, -20px) scale(1.025);
  }

  66% {
    transform: translate(-12px, -32px) scale(1.035);
  }
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
  .landing__slide--active .landing__bar--top,
  .landing__slide--active .landing__bar--bottom,
  .landing__slide--active .landing__label--top,
  .landing__slide--active .landing__label--bottom,
  .landing__slide--active .landing__ellipse-fall,
  .landing__slide--active .landing__ellipse-float {
    animation: none;
  }

  .landing__slide--active .landing__bar,
  .landing__slide--active .landing__label,
  .landing__slide--active .landing__ellipse-fall {
    opacity: 1;
    transform: none;
  }

  .landing__mountain-inner--animated {
    animation: none;
  }

  .landing__mountain-wrap {
    transition: none;
  }
}
</style>
