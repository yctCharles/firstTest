// plugins/pinia.js
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia()
  pinia.use(piniaPersist)
  nuxtApp.provide('pinia', pinia)
})
