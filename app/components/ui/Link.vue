<script setup lang="ts">
const props = defineProps<{
  to?: string
  target?: string
  class?: any
}>()
</script>

<template>
  <NuxtLink
    class="inline-block text-neutral-500 underline underline-offset-2 decoration-dotted decoration-1 decoration-neutral-500 hover:text-neutral-700 transition-colors"
    :class="props.class"
    :to="props.to"
  >
    <slot />
  </NuxtLink>
</template>
