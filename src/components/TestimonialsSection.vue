<script setup>
import { ref, onMounted } from 'vue'

const customers = [
  {
    name: 'Leigh-Anne Edwards',
    role: "Ingonyama Rest",
    avatar: 'https://placehold.co/80x80/fe5944/ffffff?text=LE',
    screenshot: 'https://placehold.co/600x380/fef0ee/fe5944?text=ingonyama-rest.co.za',
    siteUrl: 'https://ingonyama-rest.co.za',
    review:
      'Monolith Studios completely transformed our online presence. Within weeks of launching we were getting new orders through the site every day. The design is clean, modern, and perfectly captures our brand.',
  },
]

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

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
    { threshold: 0.1 },
  )
  sectionRef.value?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section class="section-2" ref="sectionRef">
    <div class="s2-inner">

      <h2 class="s2-heading fade-in">Our Happy Customers</h2>

      <div class="customers-grid">
        <div
          v-for="customer in customers"
          :key="customer.name"
          class="customer-card fade-in"
        >
          <a :href="customer.siteUrl" target="_blank" rel="noopener noreferrer" class="screenshot-link">
            <img :src="customer.screenshot" :alt="`${customer.name} website preview`" class="screenshot" />
            <div class="screenshot-overlay">
              <span class="screenshot-cta">Visit Site &rarr;</span>
            </div>
          </a>

          <div class="customer-info">
            <div class="customer-profile">
              <img :src="customer.avatar" :alt="customer.name" class="customer-avatar" />
              <div>
                <p class="customer-name">{{ customer.name }}</p>
                <p class="customer-role">{{ customer.role }}</p>
              </div>
            </div>
            <p class="customer-review">"{{ customer.review }}"</p>
          </div>
        </div>

        <div class="customer-placeholder fade-in" style="transition-delay: 0.15s">
          <h3 class="placeholder-heading">You could be our next happy customer</h3>
          <p class="placeholder-sub">We're a new studio — but what we lack in years we make up for in craft, care, and commitment to every project we take on.</p>
          <button class="placeholder-cta" @click="scrollToContact">Get in touch &rarr;</button>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.section-2 {
  padding: 100px 0;
  background: #fff;
}

.s2-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.s2-heading {
  font-family: var(--font-major);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 56px;
}

/* Grid — 3 cols so real card takes 1, placeholder takes 2 */
.customers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: stretch;
}

/* Real card */
.customer-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.screenshot-link {
  display: block;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.screenshot {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.screenshot-link:hover .screenshot {
  transform: scale(1.04);
}

.screenshot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.screenshot-link:hover .screenshot-overlay {
  opacity: 1;
}

.screenshot-cta {
  color: #fff;
  font-family: var(--font-major);
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 8px 18px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.customer-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
}

.customer-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.customer-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.customer-name {
  font-family: var(--font-major);
  font-weight: 700;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.customer-role {
  font-size: 0.78rem;
  color: #aaa;
  margin-top: 1px;
}

.customer-review {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.7;
  font-style: italic;
}

/* Placeholder card */
.customer-placeholder {
  grid-column: span 2;
  border: 2px dashed #d4cbc8;
  border-radius: 20px;
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  background: #fdfcfb;
}

.placeholder-heading {
  font-family: var(--font-major);
  font-size: clamp(1.3rem, 2vw, 1.75rem);
  font-weight: 800;
  color: #1a1a1a;
  max-width: 380px;
  line-height: 1.2;
}

.placeholder-sub {
  font-size: 0.95rem;
  color: #999;
  line-height: 1.7;
  max-width: 360px;
}

.placeholder-cta {
  background: none;
  border: none;
  color: var(--color-orange);
  font-family: var(--font-minor);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.placeholder-cta:hover {
  opacity: 0.7;
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

@media (max-width: 600px) {
  .section-2 {
    padding: 72px 0;
  }

  .s2-heading {
    margin-bottom: 36px;
  }

  .customers-grid {
    grid-template-columns: 1fr;
  }

  .customer-placeholder {
    grid-column: span 1;
    padding: 36px 24px;
  }
}
</style>