import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    works: defineCollection({
      type: 'data',
      source: 'works/*.json',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        category: z.string(),
        stack: z.array(z.string()).optional(),
        thumbnail: z.string().optional(),
        url: z.string().url().optional(),
        releaseDate: z.string().date()
      })
    })
  }
})
