<script setup lang="ts">
const props = defineProps<{
  label?: string
  to?: string
  target?: string
  class?: any
}>()
</script>

<template>
  <NuxtLink
    v-if="props.to"
    class="group flex items-center gap-x-2.5 h-fit py-3 px-6 rounded-xl whitespace-nowrap font-medium text-sm text-white text-inverted bg-linear-to-b from-neutral-600 to-neutral-900 shadow-md hover:brightness-110 active:scale-97 active:shadow-transparent select-none cursor-pointer transition-[scale,filter,box-shadow] duration-150"
    :to="props.to"
    :target="props.to && props.target"
  >
    <slot>{{ props.label }}</slot>
  </NuxtLink>
</template>
