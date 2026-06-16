<template>
  <section class="landing">
    <div
      class="landing__track"
      :style="trackStyle"
    >
      <LandingSlide
        v-for="(slide, index) in slides"
        :key="slide.id"
        :slide-id="slide.id"
        :slide-count="slides.length"
        :is-active="currentSlide === index"
        :show-mountains="slide.showMountains"
        :animated-mountains="slide.animatedMountains"
        :sun-position="slide.sunPosition"
        :scene-background="'sceneBackground' in slide ? slide.sceneBackground : undefined"
        :mountain-back-color="'mountainBackColor' in slide ? slide.mountainBackColor : undefined"
        :mountain-front-color="'mountainFrontColor' in slide ? slide.mountainFrontColor : undefined"
        :sun-src="'sunSrc' in slide ? slide.sunSrc : undefined"
        :sun-color="'sunColor' in slide ? slide.sunColor : undefined"
        :label-color="'labelColor' in slide ? slide.labelColor : undefined"
        :mountain-back-style="mountainStyle(index, 28)"
        :mountain-front-style="mountainStyle(index, 52)"
        top-label="Portfolio showcase"
        :bottom-label="slide.bottomLabel"
        :body-html="getSlideContentHtml(slide.id)"
        bottom-label-interactive
        @bottom-label-click="goToSlide(index + 1 >= slides.length ? 0 : index + 1)"
      />
    </div>

    <nav
      class="landing-nav"
      aria-label="Page navigation"
    >
      <button
        v-for="(item, index) in navItems"
        :key="item.id"
        type="button"
        class="landing-nav__link"
        :class="{ 'landing-nav__link--active': currentSlide === index }"
        :aria-current="currentSlide === index ? 'page' : undefined"
        @click="goToSlide(index)"
      >
        {{ navLabel(index) }}
      </button>
    </nav>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getSlideContentHtml } from '~/utils/slideContent'

const mouseX = ref(0)
const mouseY = ref(0)
const prefersReducedMotion = ref(false)
const currentSlide = ref(0)

const staticMountainStyle = { transform: 'translateX(-50%)' }

const slides = [
  {
    id: 'page-1',
    showMountains: true,
    animatedMountains: true,
    sunPosition: 'low',
    sceneBackground: '#EDB4C1',
    mountainBackColor: '#8CB6FF',
    mountainFrontColor: '#DB9330',
    sunSrc: '/img/ellipse_pink.svg',
    sunColor: '#C1576E',
    labelColor: '#8CB6FF',
    bottomLabel: 'About me',
  },
  {
    id: 'page-2',
    showMountains: true,
    animatedMountains: false,
    sunPosition: 'high',
    sceneBackground: '#D4E4FF',
    mountainBackColor: '#DB9330',
    mountainFrontColor: '#C1576E',
    sunSrc: '/img/ellipse_new_lbue.svg',
    sunColor: '#8CB6FF',
    labelColor: '#DB9330',
    bottomLabel: 'What I make',
  },
  {
    id: 'page-3',
    showMountains: true,
    animatedMountains: false,
    sunPosition: 'low',
    sceneBackground: '#FFCA74',
    mountainBackColor: '#C1576E',
    mountainFrontColor: '#7F479D',
    sunSrc: '/img/ellipse_orange.svg',
    sunColor: '#DB9330',
    labelColor: '#C1576E',
    bottomLabel: 'Why this page',
  },
  {
    id: 'page-4',
    showMountains: true,
    animatedMountains: false,
    sunPosition: 'high',
    sceneBackground: '#383838',
    mountainBackColor: '#7F479D',
    mountainFrontColor: '#8CB6FF',
    sunSrc: '/img/ellipse_black.svg',
    sunColor: '#1F1F1F',
    labelColor: '#7F479D',
    bottomLabel: 'Home',
  },
] as const

const navItems = [
  { id: 'nav-home', label: 'home', activeLabel: 'HOME' },
  { id: 'nav-page-2', label: 'about me' },
  { id: 'nav-page-3', label: 'what I make' },
  { id: 'nav-page-4', label: 'why this page' },
] as const

function navLabel(index: number) {
  const item = navItems[index]
  if (!item) {
    return ''
  }

  if (currentSlide.value === index) {
    return 'activeLabel' in item ? item.activeLabel : item.label.toUpperCase()
  }

  return item.label
}

const trackStyle = computed(() => ({
  width: `${slides.length * 100}%`,
  transform: `translateX(-${(currentSlide.value / slides.length) * 100}%)`,
}))

let motionQuery: MediaQueryList | null = null

function handleMouseMove(event: MouseEvent) {
  if (prefersReducedMotion.value || currentSlide.value !== 0) {
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

function mountainStyle(slideIndex: number, depth: number) {
  if (slideIndex !== 0 || prefersReducedMotion.value) {
    return staticMountainStyle
  }

  const x = mouseX.value * depth
  const y = mouseY.value * depth * 0.55

  return {
    transform: `translate(calc(-50% + ${x}px), ${y}px)`,
  }
}

function goToSlide(index: number) {
  currentSlide.value = index
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
  position: relative;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
  overflow: hidden;
}

.landing__track {
  display: flex;
  min-height: 100vh;
  transform: translateX(0);
  transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .landing__track {
    transition: none;
  }
}

.landing-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.25rem 0;
  background: transparent;
}

.landing-nav__link {
  position: relative;
  flex: 1;
  margin: 0;
  padding: 0 1rem;
  border: none;
  background: none;
  font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(0.75rem, 1.4vw, 0.9375rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1;
  color: #8a8a8a;
  text-align: center;
  text-transform: lowercase;
  cursor: pointer;
  transition: color 0.2s ease;
}

.landing-nav__link:not(:first-child)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 1.125rem;
  background-color: #b8b8b8;
  transform: translateY(-50%);
}

.landing-nav__link--active {
  font-weight: 700;
  color: #1f1f1f;
  text-transform: uppercase;
}

.landing-nav__link:hover:not(.landing-nav__link--active) {
  color: #555;
}
</style>
