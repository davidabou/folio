<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const { data: page } = await useAsyncData('index', () =>
  queryCollection('content').path('/').first()
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}
</script>

<template>
  <div v-if="page">
    <Analytics />
    <FolioMeta :page />
    <ContentRenderer :value="page" class="space-y-16" />
  </div>
</template>
