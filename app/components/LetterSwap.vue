<script setup lang="ts">
import { stagger } from 'motion-v'

interface TextProps {
  label: string
  reverse?: boolean
  transition?: Record<string, unknown>
  staggerDuration?: number
  class?: string
}

const props = withDefaults(defineProps<TextProps>(), {
  reverse: true,
  transition: () => ({ type: 'spring', duration: 0.8 }),
  staggerDuration: 0.02
})

const emit = defineEmits<{ click: [] }>()

const [scope, animate] = useAnimate()
const blocked = ref(false)

const letters = computed(() => props.label.split(''))

const hoverStart = useDebounceFn(
  async () => {
    if (blocked.value) return
    blocked.value = true

    await Promise.all([
      animate(
        '.letter',
        { y: [0, props.reverse ? '100%' : '-100%'] },
        { ...props.transition, delay: stagger(props.staggerDuration) }
      ),
      animate(
        '.letter-secondary',
        { top: [props.reverse ? '-100%' : '100%', '0%'] },
        { ...props.transition, delay: stagger(props.staggerDuration) }
      )
    ])

    animate('.letter', { y: 0 }, { duration: 0 })
    animate(
      '.letter-secondary',
      { top: props.reverse ? '-100%' : '100%' },
      { duration: 0 }
    )

    blocked.value = false
  },
  100,
  { maxWait: 100 }
)
</script>

<template>
  <Motion
    as="span"
    ref="scope"
    :class="[
      'inline-flex justify-center items-center relative overflow-hidden',
      props.class
    ]"
    @mouseenter="hoverStart"
    @click="emit('click')"
  >
    <span class="sr-only">{{ label }}</span>

    <span
      v-for="(letter, i) in letters"
      :key="i"
      aria-hidden="true"
      class="whitespace-pre relative flex"
    >
      <Motion as="span" class="relative letter" :style="{ top: 0 }">
        {{ letter }}
      </Motion>
      <Motion
        as="span"
        class="absolute letter-secondary"
        :style="{ top: reverse ? '-100%' : '100%' }"
      >
        {{ letter }}
      </Motion>
    </span>
  </Motion>
</template>
