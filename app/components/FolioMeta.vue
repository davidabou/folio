<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

const props = defineProps<{
  page: ContentCollectionItem
}>()

useSeoMeta({
  title: props.page.title,
  titleTemplate: '%s',
  description: props.page.description,
  ogImage: props.page.image,
  twitterTitle: props.page.title,
  twitterDescription: props.page.description,
  twitterImage: props.page.image
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

defineOgImageComponent('Folio')
</script>

<template>
  <slot />
</template>
