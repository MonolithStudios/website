<script setup>
import { ref, onMounted } from 'vue'

// emailjs is dynamically imported on submit to avoid SSR issues
// (the @emailjs/browser package uses browser globals at module level)

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const success = ref(false)
const error = ref('')
const nameError = ref('')
const emailError = ref('')
const messageError = ref('')

function validate() {
  nameError.value = name.value.trim() ? '' : 'Please enter your name.'
  emailError.value = !email.value.trim()
    ? 'Please enter your email.'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
      ? 'Please enter a valid email address.'
      : ''
  messageError.value = message.value.trim() ? '' : 'Please enter a message.'
  return !nameError.value && !emailError.value && !messageError.value
}

async function handleSubmit() {
  if (!validate()) return

  sending.value = true
  error.value = ''

  try {
    const { default: emailjs } = await import('@emailjs/browser')
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { from_name: name.value, message: `${message.value}<br>${email.value.trim()}` },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    success.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  } catch {
    error.value = 'Something went wrong. Please try again or email us directly.'
  } finally {
    sending.value = false
  }
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
    { threshold: 0.12 },
  )
  sectionRef.value?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section class="section-3" id="contact" ref="sectionRef">
    <div class="s3-inner">

      <div class="s3-contact fade-in">
        <h2 class="s3-heading">Get in touch</h2>
        <p class="s3-sub">Drop us a message or reach out directly — we'd love to hear from you.</p>

        <div class="contact-details">
          <a href="mailto:ethan@mlith.co.za" class="contact-row">
            <span class="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <span>ethan@mlith.co.za</span>
          </a>

          <a href="tel:+27739048474" class="contact-row">
            <span class="contact-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            <span>+27 73 904 8474</span>
          </a>
        </div>
      </div>

      <form class="s3-form fade-in" style="transition-delay: 0.15s" @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="contact-name" class="form-label">Name</label>
          <input
            id="contact-name"
            v-model="name"
            type="text"
            :class="['form-input', { 'form-input--error': nameError }]"
            placeholder="Your name"
            @input="nameError = ''"
          />
          <p v-if="nameError" class="form-field-error">{{ nameError }}</p>
        </div>

        <div class="form-group">
          <label for="contact-email" class="form-label">Email</label>
          <input
            id="contact-email"
            v-model="email"
            type="email"
            :class="['form-input', { 'form-input--error': emailError }]"
            placeholder="your@email.com"
            @input="emailError = ''"
          />
          <p v-if="emailError" class="form-field-error">{{ emailError }}</p>
        </div>

        <div class="form-group">
          <label for="contact-message" class="form-label">Message</label>
          <textarea
            id="contact-message"
            v-model="message"
            :class="['form-input form-textarea', { 'form-input--error': messageError }]"
            placeholder="Tell us about your business..."
            @input="messageError = ''"
          ></textarea>
          <p v-if="messageError" class="form-field-error">{{ messageError }}</p>
        </div>

        <p v-if="error" class="form-error">{{ error }}</p>
        <p v-if="success" class="form-success">Message sent! We'll be in touch soon.</p>

        <button type="submit" class="btn-send" :disabled="sending || success">
          {{ sending ? 'Sending…' : success ? 'Message Sent' : 'Send Message' }}
        </button>
      </form>

    </div>
  </section>
</template>

<style scoped>
.section-3 {
  padding: 100px 0;
  background: #faf9f8;
}

.s3-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

/* Contact side */
.s3-heading {
  font-family: var(--font-major);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.s3-sub {
  font-size: 1.05rem;
  color: #666;
  line-height: 1.75;
  margin-bottom: 2rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: #1a1a1a;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s;
}

.contact-row:hover {
  color: var(--color-orange);
}

.contact-icon {
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.contact-icon svg {
  width: 20px;
  height: 20px;
  color: var(--color-orange);
}

/* Form side */
.s3-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  letter-spacing: 0.02em;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid #e5e0de;
  border-radius: 10px;
  font-family: var(--font-minor);
  font-size: 0.95rem;
  color: #1a1a1a;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
}

.form-input::placeholder {
  color: #bbb;
}

.form-input:focus {
  border-color: var(--color-orange);
}

.form-input--error {
  border-color: #e53e3e;
}

.form-field-error {
  font-size: 0.8rem;
  color: #e53e3e;
  margin-top: 2px;
}

.form-textarea {
  min-height: 140px;
  resize: vertical;
  line-height: 1.6;
}

.btn-send {
  background: var(--color-orange);
  color: #fff;
  border: none;
  padding: 14px 24px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;
}

.btn-send:hover:not(:disabled) {
  opacity: 0.85;
}

.btn-send:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-success {
  font-size: 0.9rem;
  color: var(--color-green);
  font-weight: 500;
}

.form-error {
  font-size: 0.9rem;
  color: #e53e3e;
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
  .section-3 {
    padding: 72px 0;
  }

  .s3-inner {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
</style>
