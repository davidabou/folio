<script setup lang="ts">
const props = defineProps<{
  email: string
  greetings: string[]
  name: string
  job: string
  cta: {
    label: string
    link: string
  }
  description?: string
}>()

const slots = defineSlots<{
  description(props?: {}): any
}>()
</script>

<template>
  <div>
    <Motion
      as-child
      :initial="{
        opacity: 0,
        y: -16,
        filter: 'blur(10px)',
        fontVariationSettings: '\'wght\' 400'
      }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :while-hover="{ fontVariationSettings: '\'wght\' 500' }"
      :transition="{
        opacity: { ease: 'easeOut', delay: 0.2 },
        y: { ease: 'easeOut', delay: 0.2 },
        filter: { ease: 'easeOut', delay: 0.2 },
        fontVariationSettings: {
          duration: 0.2,
          ease: [0.25, 0.1, 0.25, 1]
        }
      }"
    >
      <UiLink :to="`mailto:${props.email}`" class="mb-6">
        {{ props.email }}
      </UiLink>
    </Motion>

    <Motion
      as="h2"
      class="flex whitespace-pre leading-snug font-serif text-6xl text-neutral-700"
      :initial="{ opacity: 0, y: -16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut' }"
    >
      <LayoutGroup>
        <TextRotate
          as="span"
          mainClass="overflow-hidden justify-center"
          splitLevelClass="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          staggerFrom="last"
          :texts="props.greetings"
          :initial="{ y: '100%' }"
          :animate="{ y: 0 }"
          :exit="{ y: '-120%' }"
          :staggerDuration="0.025"
          :transition="{ type: 'spring', damping: 30, stiffness: 400 }"
          :rotationInterval="5000"
        />

        <Motion
          as="span"
          layout
          :transition="{ type: 'spring', damping: 30, stiffness: 400 }"
          >, I'm {{ props.name }}</Motion
        >
      </LayoutGroup>
    </Motion>
    <Motion
      as="h1"
      class="font-serif text-6xl text-neutral-700"
      :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut' }"
    >
      {{ props.job }}
    </Motion>

    <Motion
      as="div"
      class="flex items-center gap-x-6 mt-6"
      :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut', delay: 0.2 }"
    >
      <UiButton :to="props.cta.link" :label="props.cta.label" />

      <p
        v-if="!!slots.description || props.description"
        class="max-w-xl text-lg text-neutral-600"
      >
        <slot name="description" mdc-unwrap="p">
          {{ props.description }}
        </slot>
      </p>
    </Motion>
  </div>
</template>
