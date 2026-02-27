import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-studio'
  ],
  fonts: {
    families: [
      {
        name: 'Overused Grotesk VF',
        provider: 'local',
        src: '/fonts/overused-grotesk-vf.woff2',
        weights: ['100 900']
      }
    ]
  },
  icon: {
    mode: 'svg',
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
  },

  studio: {
    route: '/admin',
    repository: {
      provider: 'github',
      owner: 'davidabou',
      repo: 'folio'
    }
  }
})
