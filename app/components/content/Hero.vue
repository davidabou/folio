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
      class="flex items-center justify-between mb-6"
      :initial="{
        opacity: 0,
        y: -16,
        filter: 'blur(10px)'
      }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut', delay: 0.2 }"
    >
      <UiLink :to="`mailto:${props.email}`">
        {{ props.email }}
      </UiLink>

      <div class="flex gap-x-3.5">
        <Tooltip>
          <UiLink to="https://www.linkedin.com/in/david-abou24" target="_blank">
            <Icon name="simple-icons:linkedin" />
          </UiLink>

          <template #content>
            <div class="flex gap-3">
              <NuxtImg
                src="/assets/profile/linkedin.jpg"
                format="webp"
                width="36"
                height="36"
                class="shrink-0 size-9 rounded-full"
              />
              <div>
                <p class="font-medium text-neutral-700">David Abou</p>
                <p class="text-xs text-neutral-500">in/david-abou24</p>
              </div>
            </div>
          </template>
        </Tooltip>

        <Tooltip>
          <UiLink to="https://github.com/davidabou" target="_blank">
            <Icon name="simple-icons:github" />
          </UiLink>

          <template #content>
            <div class="flex gap-3">
              <NuxtImg
                src="/assets/profile/github.jpg"
                format="webp"
                width="36"
                height="36"
                class="shrink-0 size-9 rounded-full"
                placeholder
              />
              <div>
                <p class="font-medium text-neutral-700">David Abou</p>
                <p class="text-xs text-neutral-500">@davidabou</p>
              </div>
            </div>
          </template>
        </Tooltip>
      </div>
    </Motion>

    <Motion
      as="h2"
      class="flex whitespace-pre leading-snug font-serif text-4xl md:text-6xl text-neutral-700"
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
      class="font-serif text-4xl md:text-6xl text-neutral-700"
      :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut' }"
    >
      {{ props.job }}
    </Motion>

    <Motion
      as="div"
      class="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6"
      :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut', delay: 0.2 }"
    >
      <UiButton :to="props.cta.link" :label="props.cta.label" />

      <p
        v-if="!!slots.description || props.description"
        class="max-w-xl text-sm md:text-lg text-neutral-600"
      >
        <slot name="description" mdc-unwrap="p">
          {{ props.description }}
        </slot>
      </p>
    </Motion>
  </div>
</template>
