import './assets/main.css'

// Self-hosted fonts (eliminates render-blocking Google Fonts request)
import '@fontsource-variable/league-spartan'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/dm-sans/wght-italic.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
