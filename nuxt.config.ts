// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
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
})