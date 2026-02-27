<script setup lang="ts">
const props = defineProps<{
  title?: string
  number?: number
}>()

const slots = defineSlots<{
  title(props?: { number: string }): any
  default(props?: { number: number }): any
}>()
</script>

<template>
  <Motion
    class="flex flex-col space-y-8"
    :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
    :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
    :in-view-options="{ once: true }"
    :transition="{ ease: 'easeOut', delay: (props.number || 0) * 0.2 }"
  >
    <h3
      v-if="!!slots.title || props.title"
      class="inline-flex font-serif text-2xl text-neutral-700"
    >
      <slot name="title" mdc-unwrap="p" :number="props.number">
        {{ props.title }}
      </slot>
    </h3>

    <slot :number="number" />
  </Motion>
</template>
