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
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-llms',
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

  site: {
    url: 'https://abou.dev',
    name: 'David A.',
    indexable: true
  },

  studio: {
    route: '/admin',
    repository: {
      provider: 'github',
      owner: 'davidabou',
      repo: 'folio'
    }
  },

  robots: {
    disallow: ['/admin']
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  ogImage: {
    zeroRuntime: true
  },

  llms: {
    domain: 'https://abou.dev',
    title: 'David A. - Full-Stack Developer',
    description:
      'I craft high-performance web applications using modern technologies, with a dedicated focus on seamless user experiences.',
    full: {
      title: 'David A. - Complete Profile',
      description:
        "Comprehensive overview of David's career path, educational background at Epitech, and key milestones including the creation of Harmonix and OverDev."
    },
    notes: [
      'Contact email: hey@abou.dev',
      'Current Role: Full-Stack Developer',
      'Call to action: Book a 30min call via https://www.cal.eu/davidabou/30min'
    ],
    sections: [
      {
        title: 'Home',
        description:
          "Showcase of David's latest projects and a brief introduction to his expertise in web development.",
        contentCollection: 'content',
        contentFilters: [{ field: 'path', operator: '=', value: '/' }]
      }
    ]
  }
})
