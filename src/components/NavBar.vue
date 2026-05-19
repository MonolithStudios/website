<script setup>
import logoSrc from '../assets/logo.svg'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <div class="navbar-brand">
        <img :src="logoSrc" alt="Monolith Studios" class="navbar-logo" />
        <span class="navbar-name">MONOLITH STUDIOS</span>
      </div>
      <button class="btn-contact" @click="scrollToContact">Contact Us</button>
      <button class="btn-mail" @click="scrollToContact" aria-label="Contact us">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: var(--navbar-top);
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0 16px;
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: var(--navbar-height);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-logo {
  height: 48px;
  width: auto;
}

.navbar-name {
  font-family: var(--font-major);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: #1a1a1a;
}

.btn-contact {
  background: var(--color-orange);
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-contact:hover {
  opacity: 0.85;
}

.btn-mail {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--color-orange);
  color: #fff;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.btn-mail:hover {
  opacity: 0.85;
}

.btn-mail svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .navbar-inner .btn-contact {
    display: none;
  }

  .btn-mail {
    display: flex;
  }

  .navbar-name {
    font-size: 0.85rem;
  }
}
</style>