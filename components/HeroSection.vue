<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasEl = ref(null)
let animId = null
let device = null
let pipeline = null
let uniformBuffer = null
let bindGroup = null
let gpuCtx = null
let W = 0, H = 0
let startTime = 0

const uData = new Float32Array(4) // [time, width, height, pad]

const WGSL = /* wgsl */`
struct U {
  time   : f32,
  width  : f32,
  height : f32,
  _pad   : f32,
}
@group(0) @binding(0) var<uniform> u: U;

@vertex
fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  var pos = array<vec2f, 3>(
    vec2f(-1.0, -1.0),
    vec2f( 3.0, -1.0),
    vec2f(-1.0,  3.0),
  );
  return vec4f(pos[vi], 0.0, 1.0);
}

@fragment
fn fs(@builtin(position) coord: vec4f) -> @location(0) vec4f {
  let dx = coord.x - u.width  * 0.5;
  let dy = coord.y - u.height * 0.5;

  // Rotate screen coords -45° into wave space
  let s = 0.7071067811865476;
  let rx = (dx + dy) * s;
  let ry = (dy - dx) * s;

  let tau = 6.283185307179586;
  // Scroll parallel to lines (bottom-right → top-left) by shifting rx
  let scroll = u.time * 24.0;
  let wave =
    22.0 * sin(tau * (rx + scroll) / 210.0) +
    14.0 * sin(tau * (rx + scroll) / 370.0) +
     9.0 * sin(tau * (rx + scroll) / 110.0) +
     6.0 * sin(tau * (rx + scroll) / 530.0);

  let d = fract((ry - wave) / 32.0);
  let dist = min(d, 1.0 - d) * 32.0;

  // Anti-aliased line, 0.5 opacity — output premultiplied alpha
  let a = 0.5 * (1.0 - smoothstep(0.0, 0.9, dist));
  return vec4f(0.996 * a, 0.349 * a, 0.267 * a, a);
}
`

async function initGPU() {
  if (!navigator.gpu) return false
  const adapter = await navigator.gpu.requestAdapter()
  if (!adapter) return false
  device = await adapter.requestDevice()

  const canvas = canvasEl.value
  gpuCtx = canvas.getContext('webgpu')
  const fmt = navigator.gpu.getPreferredCanvasFormat()
  gpuCtx.configure({ device, format: fmt, alphaMode: 'premultiplied' })

  uniformBuffer = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })

  const shader = device.createShaderModule({ code: WGSL })
  const bgl = device.createBindGroupLayout({
    entries: [{ binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: {} }],
  })

  pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
    vertex:   { module: shader, entryPoint: 'vs' },
    fragment: {
      module: shader, entryPoint: 'fs',
      targets: [{
        format: fmt,
        blend: {
          color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
          alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha', operation: 'add' },
        },
      }],
    },
    primitive: { topology: 'triangle-list' },
  })

  bindGroup = device.createBindGroup({
    layout: bgl,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  })

  return true
}

function resize() {
  const canvas = canvasEl.value
  W = canvas.offsetWidth
  H = canvas.offsetHeight
  canvas.width  = W
  canvas.height = H
}

function draw(ts) {
  if (!device) { animId = requestAnimationFrame(draw); return }

  uData[0] = (ts - startTime) / 1000
  uData[1] = W
  uData[2] = H
  device.queue.writeBuffer(uniformBuffer, 0, uData)

  const enc  = device.createCommandEncoder()
  const pass = enc.beginRenderPass({
    colorAttachments: [{
      view:       gpuCtx.getCurrentTexture().createView(),
      clearValue: { r: 0, g: 0, b: 0, a: 0 },
      loadOp:     'clear',
      storeOp:    'store',
    }],
  })
  pass.setPipeline(pipeline)
  pass.setBindGroup(0, bindGroup)
  pass.draw(3)
  pass.end()
  device.queue.submit([enc.finish()])

  animId = requestAnimationFrame(draw)
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(async () => {
  resize()
  window.addEventListener('resize', resize)
  const ok = await initGPU()
  if (!ok) return
  startTime = performance.now()
  animId = requestAnimationFrame(draw)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(animId)
  device?.destroy()
})
</script>

<template>
  <section class="hero">
    <canvas ref="canvasEl" class="hero-canvas" />

    <div class="hero-inner">

      <div class="hero-text">
        <h1 class="hero-headline">Beautiful Websites for<br>Your Business</h1>
        <p class="hero-sub">We design and build fast, modern websites for businesses in Durban and across South Africa.</p>
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
