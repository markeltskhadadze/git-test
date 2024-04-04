// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-chatgpt',
    '@pinia/nuxt'
  ],
  chatgpt: {
    apiKey: process.env.CHATGPT_API_KEY
  },
})
