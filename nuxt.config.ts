// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  extends: [],
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],
  tailwindcss: {
    viewer: true,
    // viewer: { endpoint: '/_tailwind', exportViewer: true }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig:{
    public: {
      baseURL: 'http://localhost:8080'
    }
  }
})
