// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-chatgpt',
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  chatgpt: {
    apiKey: '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'
  },
})
