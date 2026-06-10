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
        >
        <img
          src="/img/mountain_layer1_dark.svg"
          alt=""
          class="landing__mountain landing__mountain--front"
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

        <line x1="10" y1="0" x2="10" y2="34" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="10" cy="42" r="8" fill="#1F1F1F" />

        <line x1="28" y1="0" x2="28" y2="40" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="30" cy="46" r="8" fill="#1F1F1F" />

        <line x1="46" y1="0" x2="46" y2="46" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="50" cy="50" r="8" fill="#1F1F1F" />

        <line x1="64" y1="0" x2="64" y2="50" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="70" cy="54" r="8" fill="#1F1F1F" />

        <line x1="82" y1="0" x2="82" y2="54" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="90" cy="58" r="8" fill="#1F1F1F" />

        <line x1="100" y1="0" x2="100" y2="58" stroke="url(#ellipses-line-gradient)" stroke-width="2.5" stroke-linecap="round" />
        <circle cx="110" cy="62" r="8" fill="#1F1F1F" />
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

<style scoped>
.landing {
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #CFCFCF;
  padding: 1.5rem 0.5rem;
}

.landing__stage {
  position: relative;
  width: min(90vw, 960px);
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
  inset: 2.8% 2.6%;
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
  transform: translateX(-50%);
  width: 97%;
  max-width: none;
  object-fit: contain;
  object-position: bottom center;
}

.landing__mountain--back {
  width: 100%;
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
}

.landing__bar {
  height: 14%;
  background-color: #1F1F1F;
  z-index: 3;
}

.landing__bar--top {
  top: 10%;
  left: calc(-50vw + 50%);
  width: calc(5vw + 38%);
}

.landing__bar--bottom {
  bottom: 10%;
  right: calc(-50vw + 50%);
  width: calc(5vw + 38%);
}

.landing__label {
  display: flex;
  align-items: center;
  margin: 0;
  font-family: 'Kapakana', cursive;
  font-size: clamp(3rem, 7vw, 7rem);
  line-height: 1;
  z-index: 4;
}

.landing__label--top {
  top: 20%;
  height: 1%;
  left: -10%;
  color: #9ba3e8;
}

.landing__label--bottom {
  bottom: -10%;
  top: 64%;
  right: 2%;
  color: #adebb3;
}
</style>
