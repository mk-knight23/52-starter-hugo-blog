import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routes } from './router'
import './style.css'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    const pinia = createPinia()
    app.use(pinia)
  }
)
