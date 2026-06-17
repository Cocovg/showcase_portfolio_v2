<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    slideId: string
    slideCount: number
    isActive: boolean
    showMountains: boolean
    mountainBackStyle: Record<string, string>
    mountainFrontStyle: Record<string, string>
    animatedMountains: boolean
    sunPosition: 'low' | 'high'
    sceneBackground?: string
    mountainBackColor?: string
    mountainFrontColor?: string
    sunSrc?: string
    sunColor?: string
    labelColor?: string
    topLabel: string
    bottomLabel: string
    bodyHtml?: string
    topLabelInteractive?: boolean
    bottomLabelInteractive?: boolean
  }>(),
  {
    sceneBackground: '#ffffff',
    mountainBackColor: '#919191',
    mountainFrontColor: '#363636',
    sunSrc: '/img/ellipse_blue.svg',
    sunColor: '#5E7AB5',
    labelColor: '#5e7ab5',
  },
)

const emit = defineEmits<{
  topLabelClick: []
  bottomLabelClick: []
}>()

const textBlockVisible = ref(false)

watch(
  () => props.isActive,
  (active) => {
    if (!active) {
      textBlockVisible.value = false
    }
  },
)

function toggleTextBlock() {
  if (props.showMountains) {
    textBlockVisible.value = !textBlockVisible.value
  }
}

const bottomEllipses = [
  { hint: 'This', y: 10 },
  { hint: 'isn\'t', y: 36 },
  { hint: 'a', y: 62 },
  { hint: 'navigationbar', y: 88 },
] as const
</script>

<template>
  <div
    class="landing__slide"
    :class="{ 'landing__slide--active': isActive }"
    :style="{
      flex: `0 0 ${100 / slideCount}%`,
      backgroundColor: sunColor,
    }"
  >
    <!-- Corner blobs (disabled for now)
    <div
      class="landing__blobs"
      aria-hidden="true"
    >
      <div class="landing__blob landing__blob--top-right">
        <div
          class="landing__blob-inner"
          :class="{ 'landing__blob-inner--animated': isActive }"
        >
          <img
            src="/img/blob.svg"
            alt=""
            class="landing__blob-image"
          >
        </div>
      </div>

      <div class="landing__blob landing__blob--bottom-left">
        <div
          class="landing__blob-inner"
          :class="{ 'landing__blob-inner--animated': isActive }"
        >
          <img
            src="/img/blob.svg"
            alt=""
            class="landing__blob-image"
          >
        </div>
      </div>
    </div>
    -->

    <div class="landing__stage">
      <div
        class="landing__scene"
        :style="{ backgroundColor: sceneBackground }"
      >
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
                  :fill="mountainBackColor"
                />
              </svg>
            </div>
          </div>

          <div
            class="landing__mountain-sun"
            :class="[
              sunPosition === 'low' ? 'landing__mountain-sun--low' : 'landing__mountain-sun--high',
              { 'landing__mountain-sun--clickable': showMountains && isActive && !textBlockVisible },
            ]"
          >
            <div
              v-if="showMountains && isActive && !textBlockVisible"
              class="landing__mountain-sun-effects"
              aria-hidden="true"
              :style="{ '--sun-accent': sunColor }"
            >
              <span class="landing__mountain-sun-ring" />
            </div>
            <img
              :src="sunSrc"
              alt=""
              class="landing__mountain-sun-image"
            >
          </div>

          <button
            v-if="showMountains && isActive"
            type="button"
            class="landing__mountain-sun-hit"
            :class="sunPosition === 'low' ? 'landing__mountain-sun--low' : 'landing__mountain-sun--high'"
            :aria-label="textBlockVisible ? 'Hide text' : 'Show text'"
            :aria-expanded="textBlockVisible"
            @click="toggleTextBlock"
          />

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
                  :fill="mountainFrontColor"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          v-if="showMountains ? textBlockVisible : !showMountains"
          class="landing__content"
        >
          <div class="landing__text-block">
            <div
              v-if="bodyHtml"
              class="landing__text-block-body"
              v-html="bodyHtml"
            />
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
        overflow="visible"
      >
        <g
          v-for="(ellipse, index) in bottomEllipses"
          :key="ellipse.hint"
          class="landing__ellipse-float"
          :class="`landing__ellipse-float--bl-${index + 1}`"
        >
          <g
            class="landing__ellipse-fall landing__ellipse-group"
            :class="`landing__ellipse-fall--bl-${index + 1}`"
          >
            <circle
              :cx="16"
              :cy="ellipse.y"
              r="10"
              fill="transparent"
              class="landing__ellipse-hit"
            />
            <circle
              :cx="16"
              :cy="ellipse.y"
              r="8"
              :fill="sunColor"
            />
            <text
              :x="28"
              :y="ellipse.y + 3"
              class="landing__ellipse-hint"
              :class="{ 'landing__ellipse-hint--long': index === 3 }"
            >
              {{ ellipse.hint }}
            </text>
          </g>
        </g>
      </svg>

      <div class="landing__bar-group landing__bar-group--top">
        <div
          class="landing__bar"
          :style="{ backgroundColor: mountainBackColor }"
        />
        <component
          :is="topLabelInteractive ? 'button' : 'p'"
          class="landing__label landing__label--top"
          :class="{ 'landing__label--interactive': topLabelInteractive }"
          :style="{ color: sunColor }"
          :type="topLabelInteractive ? 'button' : undefined"
          @click="topLabelInteractive && emit('topLabelClick')"
        >
          {{ topLabel }}
        </component>
      </div>

      <div class="landing__bar-group landing__bar-group--bottom">
        <div
          class="landing__bar"
          :style="{ backgroundColor: mountainBackColor }"
        />
        <component
          :is="bottomLabelInteractive ? 'button' : 'p'"
          class="landing__label landing__label--bottom"
          :class="{ 'landing__label--interactive': bottomLabelInteractive }"
          :style="{ color: sunColor }"
          :type="bottomLabelInteractive ? 'button' : undefined"
          @click="bottomLabelInteractive && emit('bottomLabelClick')"
        >
          {{ bottomLabel }}
        </component>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing__slide {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0.75rem 0;
  overflow: hidden;
}

.landing__blobs {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.landing__blob {
  position: absolute;
  width: min(58vw, 28rem);
}

.landing__blob-image {
  display: block;
  width: 100%;
  height: auto;
}

.landing__blob--top-right {
  top: -4%;
  right: -10%;
}

.landing__blob--bottom-left {
  bottom: 15%;
  left: -14%;
}

.landing__blob-inner--animated {
  animation: blob-drift 8s ease-in-out infinite;
}

.landing__blob--bottom-left .landing__blob-inner--animated {
  animation-name: blob-drift-alt;
  animation-duration: 10s;
  animation-delay: -4s;
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
.landing__bar-group {
  position: absolute;
}

.landing__scene {
  inset: 2.2% 2%;
  z-index: 1;
  overflow: hidden;
  isolation: isolate;
}

.landing__content {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9% 5%;
  animation: text-block-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__text-block {
  width: fit-content;
  max-width: min(100%, 46rem);
  min-width: min(100%, 16rem);
  max-height: 100%;
  padding: 1.35rem 1.5rem;
  background-color: #1f1f1f;
  color: #ffffff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: clamp(0.6875rem, 1.05vw, 0.8125rem);
  font-weight: 400;
  line-height: 1.55;
  text-align: left;
  overflow: auto;
}

.landing__text-block:has(.landing__text-block-body > p:only-child) {
  max-width: min(100%, 22rem);
}

.landing__text-block:has(.landing__text-block-body > :nth-child(3)) {
  min-width: min(100%, 30rem);
  max-width: min(100%, 46rem);
}

.landing__text-block-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: clamp(1.25rem, 3vw, 2.5rem);
  row-gap: 0;
}

.landing__text-block-body :deep(h1),
.landing__text-block-body :deep(h2),
.landing__text-block-body :deep(h3),
.landing__text-block-body :deep(p:first-child:nth-last-child(3)) {
  grid-column: 1 / -1;
  margin: 0 0 1rem;
  font-size: inherit;
  font-weight: 400;
  font-family: inherit;
}

.landing__text-block-body :deep(p) {
  margin: 0;
}

.landing__text-block-body :deep(p:only-child),
.landing__text-block-body :deep(p:nth-child(2):last-child) {
  grid-column: 1 / -1;
}

.landing__text-block-body :deep(a) {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.landing__text-block-body :deep(strong) {
  font-weight: 700;
}

.landing__text-block-body :deep(ul),
.landing__text-block-body :deep(ol) {
  margin: 0 0 1em;
  padding-left: 1.25em;
}

.landing__text-block-body :deep(li + li) {
  margin-top: 0.35em;
}

@media (max-width: 720px) {
  .landing__text-block-body {
    grid-template-columns: 1fr;
  }

  .landing__text-block-body :deep(p) {
    grid-column: 1 / -1;
  }

  .landing__text-block-body :deep(p + p) {
    margin-top: 1rem;
  }
}

.landing__mountains {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.landing__mountain-wrap {
  position: absolute;
  left: 50%;
  bottom: -8%;
  transition: transform 0.35s ease-out;
  will-change: transform;
  pointer-events: none;
}

.landing__mountain-wrap--back {
  width: 100%;
  z-index: 1;
}

.landing__mountain-sun {
  position: absolute;
  right: 10%;
  width: 26%;
  aspect-ratio: 1;
  z-index: 2;
  pointer-events: none;
}

.landing__mountain-sun-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.landing__mountain-sun-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  aspect-ratio: 1;
  border: 2.5px solid var(--sun-accent, #5e7ab5);
  border-radius: 50%;
  opacity: 0;
  transform: translate(-50%, -50%) scale(1);
  animation: sun-ring-pulse 3.5s ease-out 1.1s infinite;
}

.landing__mountain-sun-image {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
}

.landing__mountain-sun--low {
  top: 22%;
}

.landing__mountain-sun--high {
  top: 6%;
}

.landing__slide:not(.landing__slide--active) .landing__mountain-sun {
  opacity: 0;
  animation: none;
}

.landing__slide--active .landing__mountain-sun--high {
  animation: sun-arrive-high 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.landing__slide--active .landing__mountain-sun--low {
  animation: sun-arrive-low 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}

.landing__slide--active .landing__mountain-sun--clickable .landing__mountain-sun-image {
  animation: sun-pulse 3.5s linear 1.1s infinite;
}

.landing__mountain-sun-hit {
  position: absolute;
  right: 10%;
  width: 26%;
  aspect-ratio: 1;
  z-index: 4;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.landing__mountain-sun-hit:focus-visible {
  outline: 2px solid #1f1f1f;
  outline-offset: 4px;
}

.landing__mountain-wrap--front {
  width: 100%;
  z-index: 3;
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
  pointer-events: auto;
  overflow: visible;
  z-index: 25;
}

.landing__ellipse-hit {
  cursor: default;
  pointer-events: all;
}

.landing__ellipse-group circle:not(.landing__ellipse-hit) {
  pointer-events: none;
}

.landing__ellipse-hint {
  opacity: 0;
  fill: #ffffff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 6px;
  pointer-events: none;
  transition: opacity 0.15s ease;
}

.landing__ellipse-hint--long {
  font-size: 4.5px;
}

.landing__ellipse-group:hover .landing__ellipse-hint {
  opacity: 1;
}

.landing__ellipse-fall,
.landing__ellipse-float {
  transform-box: fill-box;
  transform-origin: top center;
}

.landing__slide:not(.landing__slide--active) .landing__ellipses--bottom-left {
  pointer-events: none;
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

.landing__bar-group {
  z-index: 4;
  display: inline-grid;
  grid-template-rows: var(--bar-height);
  align-items: end;
  --bar-height: clamp(1.85rem, 6.5vw, 3.5rem);
  --label-drop: 0.18em;
}

.landing__bar-group--top {
  top: 16%;
  left: calc(-50vw + 50%);
  padding-left: calc(50vw - 50% + 6%);
  padding-inline-end: 0.65rem;
  max-width: calc(50vw - 50% + 94%);
}

.landing__bar-group--bottom {
  top: calc(90% - var(--bar-height));
  right: calc(-50vw + 50%);
  left: auto;
  padding-right: calc(50vw - 50% + 6%);
  padding-inline-start: 0.65rem;
  justify-items: end;
  max-width: calc(50vw - 50% + 94%);
}

.landing__bar-group .landing__bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--bar-height);
  box-shadow: 0 4px 14px rgba(31, 31, 31, 0.28);
}

.landing__bar-group .landing__label {
  position: relative;
  z-index: 1;
  grid-row: 1;
  align-self: end;
  transform: translateY(var(--label-drop));
}

.landing__bar-group--top .landing__bar {
  transform-origin: left center;
}

.landing__bar-group--bottom .landing__bar {
  transform-origin: right center;
}

.landing__slide--active .landing__bar-group--top .landing__bar {
  animation: bar-slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__slide--active .landing__bar-group--bottom .landing__bar {
  animation: bar-slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing__slide--active .landing__label--top {
  animation: label-slide-in-from-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
}

.landing__slide--active .landing__label--bottom {
  animation: label-slide-in-from-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both;
}

.landing__slide:not(.landing__slide--active) .landing__bar-group {
  opacity: 0;
  animation: none;
}

.landing__label {
  margin: 0;
  font-family: 'Kapakana', cursive;
  font-size: clamp(6rem, 7.8vw, 10.25rem);
  font-weight: 100;
  line-height: 0.75;
  overflow: visible;
  white-space: nowrap;
  -webkit-text-stroke: 0.01em currentColor;
  paint-order: stroke fill;
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

.landing__label--bottom {
  text-align: right;
}

@keyframes blob-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }

  25% {
    transform: translate(36px, -32px) scale(1.08) rotate(5deg);
  }

  50% {
    transform: translate(-28px, 26px) scale(0.92) rotate(-4deg);
  }

  75% {
    transform: translate(24px, 38px) scale(1.06) rotate(3deg);
  }
}

@keyframes blob-drift-alt {
  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
  }

  25% {
    transform: translate(-34px, 28px) scale(1.07) rotate(-5deg);
  }

  50% {
    transform: translate(30px, -24px) scale(0.93) rotate(4deg);
  }

  75% {
    transform: translate(-22px, -36px) scale(1.05) rotate(-3deg);
  }
}

@keyframes text-block-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes sun-pulse {
  0%,
  14.29%,
  100% {
    transform: scale(1);
  }

  3.57% {
    transform: scale(1.1);
  }

  7.14% {
    transform: scale(1);
  }

  10.71% {
    transform: scale(1.1);
  }
}

@keyframes sun-ring-pulse {
  0%,
  3%,
  32%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }

  3.57% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.06);
  }

  12% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1.2);
  }

  22% {
    opacity: 0.2;
    transform: translate(-50%, -50%) scale(1.38);
  }

  30% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.52);
  }
}

@keyframes sun-arrive-high {
  from {
    top: 22%;
    opacity: 0;
  }

  to {
    top: 6%;
    opacity: 1;
  }
}

@keyframes sun-arrive-low {
  from {
    top: 6%;
    opacity: 0;
  }

  to {
    top: 22%;
    opacity: 1;
  }
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

@keyframes bar-slide-in-from-left {
  from {
    opacity: 1;
    transform: scaleX(0);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes bar-slide-in-from-right {
  from {
    opacity: 1;
    transform: scaleX(0);
  }

  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes label-slide-in-from-left {
  from {
    opacity: 0;
    transform: translate(calc(-120%), var(--label-drop));
  }

  to {
    opacity: 1;
    transform: translateY(var(--label-drop));
  }
}

@keyframes label-slide-in-from-right {
  from {
    opacity: 0;
    transform: translate(120%, var(--label-drop));
  }

  to {
    opacity: 1;
    transform: translateY(var(--label-drop));
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
  .landing__slide--active .landing__bar-group--top .landing__bar,
  .landing__slide--active .landing__bar-group--bottom .landing__bar,
  .landing__slide--active .landing__label--top,
  .landing__slide--active .landing__label--bottom,
  .landing__slide--active .landing__ellipse-fall,
  .landing__slide--active .landing__ellipse-float,
  .landing__slide--active .landing__mountain-sun--high,
  .landing__slide--active .landing__mountain-sun--low,
  .landing__slide--active .landing__mountain-sun--clickable .landing__mountain-sun-image,
  .landing__slide--active .landing__mountain-sun-ring,
  .landing__blob-inner--animated {
    animation: none;
  }

  .landing__slide--active .landing__bar-group,
  .landing__slide--active .landing__label,
  .landing__slide--active .landing__ellipse-fall,
  .landing__slide--active .landing__mountain-sun {
    opacity: 1;
    transform: none;
  }

  .landing__content {
    animation: none;
  }

  .landing__mountain-inner--animated {
    animation: none;
  }

  .landing__mountain-wrap {
    transition: none;
  }
}
</style>
