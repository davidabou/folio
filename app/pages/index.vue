<script setup lang="ts">
const { data: page } = await useAsyncData('index', () =>
  queryCollection('content').path('/').first()
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found'
  })
}

useSeoMeta({
  title: page.value.title,
  titleTemplate: '%s',
  description: page.value.description
})
</script>

<template>
  <div v-if="page">
    <ContentRenderer :value="page" class="space-y-16" />
  </div>
</template>
