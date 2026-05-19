<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let animId = null
let t = 0
let W = 0, H = 0, diag = 0

function wave(x) {
  return (
    22 * Math.sin((2 * Math.PI * x) / 210 + 0.70 * t) +
    14 * Math.sin((2 * Math.PI * x) / 370 + 0.42 * t) +
     9 * Math.sin((2 * Math.PI * x) / 110 + 1.15 * t) +
     6 * Math.sin((2 * Math.PI * x) / 530 + 0.28 * t)
  )
}

function resize() {
  const canvas = canvasEl.value
  W = canvas.offsetWidth
  H = canvas.offsetHeight
  canvas.width = W
  canvas.height = H
  diag = Math.sqrt(W * W + H * H)
}

function draw() {
  const canvas = canvasEl.value
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, W, H)
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.rotate(Math.PI / 4)

  ctx.strokeStyle = 'rgba(254, 89, 68, 0.5)'
  ctx.lineWidth = 1

  const spacing = 32
  const start = -Math.ceil(diag / spacing) * spacing

  for (let offset = start; offset <= diag; offset += spacing) {
    ctx.beginPath()
    let first = true
    for (let x = -diag; x <= diag; x += 4) {
      const y = offset + wave(x)
      if (first) { ctx.moveTo(x, y); first = false }
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
  }

  ctx.restore()

  t += 0.016
  animId = requestAnimationFrame(draw)
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
  animId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animId)
})
</script>

<template>
  <section class="hero">
    <canvas ref="canvasEl" class="hero-canvas" />

    <div class="hero-inner">

      <div class="hero-text">
        <h1 class="hero-headline">Up your<br>website game</h1>
        <p class="hero-sub">Let us build a beautiful, performant website to elevate your business.</p>
        <button class="btn-get-started" @click="scrollToContact">
          Get Started
        </button>
      </div>

      <div class="hero-right">
        <div class="card card-pricing">
          <p class="pricing-heading">Pricing</p>
          <div class="pricing-row">
            <span class="pricing-name">Design</span>
            <span class="pricing-value">R2,000<span class="pricing-asterisk">*</span></span>
          </div>
          <div class="pricing-divider"></div>
          <div class="pricing-row">
            <span class="pricing-name">Hosting</span>
            <span class="pricing-value">R150<span class="pricing-period">/mo</span></span>
          </div>
          <p class="pricing-note">* Pricing may vary for larger sites</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: calc(var(--navbar-top) + var(--navbar-height) + 48px);
  padding-bottom: 80px;
}

.hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
  width: 100%;
}

/* Text */
.hero-headline {
  font-family: var(--font-major);
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

.hero-sub {
  font-size: 1.3rem;
  color: #666;
  line-height: 1.75;
  max-width: 380px;
  margin-bottom: 2rem;
}

.btn-get-started {
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-get-started:hover {
  opacity: 0.85;
}

/* Right column */
.hero-right {
  display: flex;
  justify-content: flex-end;
}

/* Cards */
.card {
  border-radius: 20px;
  padding: 24px;
}

.card-pricing {
  background: #f7f4f3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 28px;
  width: 100%;
  max-width: 400px;
}

.pricing-heading {
  font-family: var(--font-major);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 4px;
}

.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pricing-name {
  font-weight: 400;
  color: #666;
  font-size: 0.95rem;
}

.pricing-value {
  font-family: var(--font-major);
  font-weight: 700;
  font-size: 1.3rem;
  color: #1a1a1a;
}

.pricing-asterisk {
  font-family: var(--font-minor);
  font-size: 0.72rem;
  vertical-align: super;
  color: #999;
  margin-left: 1px;
}

.pricing-period {
  font-family: var(--font-minor);
  font-size: 0.8rem;
  font-weight: 400;
  color: #999;
}

.pricing-divider {
  height: 1px;
  background: #e2dbd9;
}

.pricing-note {
  font-size: 0.72rem;
  color: #bbb;
  font-style: italic;
}

/* Mobile */
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 32px;
    padding-top: 16px;
  }

  .hero-sub {
    max-width: 100%;
  }

  .hero-right {
    justify-content: flex-start;
  }

  .card-pricing {
    max-width: 100%;
  }
}
</style>
