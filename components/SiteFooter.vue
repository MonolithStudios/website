<script setup>
import logoSrc from '~/assets/logo.svg'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-copy">&copy; {{ year }} Monolith Studios &mdash; Durban, South Africa</p>
      <a href="mailto:ethan@mlith.co.za" class="footer-email" aria-label="Email us">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-green);
  padding: 28px 0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy {
  font-family: var(--font-minor);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
}

.footer-email {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.1);
  transition: background 0.2s, color 0.2s;
}

.footer-email:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.footer-email svg {
  width: 18px;
  height: 18px;
}

@media (max-width: 600px) {
  .footer-copy {
    font-size: 0.75rem;
  }
}
</style>
