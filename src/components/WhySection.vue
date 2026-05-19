<script setup>
import { ref, onMounted } from 'vue'

const year = new Date().getFullYear()

const clients = [
  {
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    label: 'Local Businesses',
    desc: 'Stand out online',
    color: 'var(--color-orange)',
  },
  {
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    label: 'Holiday Homes',
    desc: 'Attract guests',
    color: 'var(--color-blue)',
  },
  {
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    label: 'Personal Portfolios',
    desc: 'Show your work',
    color: 'var(--color-green)',
  },
]

const sectionRef = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  sectionRef.value?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section class="section-1" ref="sectionRef">
    <div class="s1-inner">

      <div class="s1-text fade-in">
        <h2 class="s1-heading">It's {{ year }}, your business needs a website</h2>
        <p class="s1-sub">A website helps your business stand out, provides a central communication point, and gives your business an identity.</p>
      </div>

      <div class="s1-cards">
        <div
          v-for="(client, i) in clients"
          :key="client.label"
          class="client-card fade-in"
          :style="{ transitionDelay: `${0.1 + i * 0.12}s` }"
        >
          <div class="client-icon" :style="{ background: client.color }">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              class="client-svg"
              fill="none"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path :d="client.icon" />
            </svg>
          </div>
          <div class="client-text">
            <p class="client-label">{{ client.label }}</p>
            <p class="client-desc">{{ client.desc }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.section-1 {
  padding: 100px 0;
  background: #faf9f8;
}

.s1-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.s1-heading {
  font-family: var(--font-major);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  line-height: 1.15;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
}

.s1-sub {
  font-size: 1.05rem;
  color: #666;
  line-height: 1.75;
}

/* Cards */
.s1-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.client-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.client-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.client-svg {
  width: 26px;
  height: 26px;
}

.client-label {
  font-family: var(--font-major);
  font-weight: 700;
  font-size: 0.95rem;
  color: #1a1a1a;
  margin-bottom: 3px;
}

.client-desc {
  font-size: 0.85rem;
  color: #999;
}

/* Scroll animation */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .section-1 {
    padding: 72px 0;
  }

  .s1-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>