import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: [
        {
          include: '**/*.md',
          prefix: '/'
        }
      ],
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.string().date().optional(),
        image: z.string().optional()
      })
    }),
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
