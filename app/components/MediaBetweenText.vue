<script setup lang="ts">
import { useInView, type VariantLabels, type VariantType } from 'motion-v'

interface MediaBetweenTextProps {
  firstText: string
  secondText: string
  mediaUrl: string
  mediaType: 'image' | 'video'
  mediaContainerClass?: string
  fallbackUrl?: string
  as?: keyof HTMLElementTagNameMap
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  alt?: string
  triggerType?: 'hover' | 'ref' | 'inView'
  inViewOptions?: Parameters<typeof useInView>[1]
  animationVariants?: {
    initial: VariantLabels | VariantType
    animate: VariantLabels | VariantType
  }
  class?: string
  leftTextClass?: string
  rightTextClass?: string
}

const props = withDefaults(defineProps<MediaBetweenTextProps>(), {
  as: 'p',
  autoPlay: true,
  loop: true,
  muted: true,
  playsInline: true,
  triggerType: 'hover',
  inViewOptions: () => ({ once: true, amount: 0.5 }),
  animationVariants: () => ({
    initial: { width: 0, opacity: 1 },
    animate: {
      width: 'auto',
      opacity: 1,
      transition: { duration: 0.4, type: 'spring', bounce: 0 }
    }
  })
})

defineExpose({ animate: () => triggerAnimate(), reset: () => resetAnimate() })

const componentRef = ref<HTMLDivElement | null>(null)
const isHovered = ref(false)
const isAnimating = ref(false)

const isInView =
  props.triggerType === 'inView'
    ? useInView(componentRef, props.inViewOptions)
    : ref(false)

function triggerAnimate() {
  isAnimating.value = true
}
function resetAnimate() {
  isAnimating.value = false
}

const shouldAnimate = computed(() => {
  if (props.triggerType === 'hover') return isHovered.value
  if (props.triggerType === 'inView') return isInView.value
  if (props.triggerType === 'ref') return isAnimating.value
  return false
})

const animateState = computed(() =>
  shouldAnimate.value
    ? props.animationVariants.animate
    : props.animationVariants.initial
)

function onMouseEnter() {
  if (props.triggerType === 'hover') isHovered.value = true
}

function onMouseLeave() {
  if (props.triggerType === 'hover') isHovered.value = false
}
</script>

<template>
  <div
    ref="componentRef"
    class="flex"
    :class="props.class"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Left text -->
    <Motion as-child layout>
      <component :is="as" :class="leftTextClass">
        {{ firstText }}
      </component>
    </Motion>

    <!-- Media container -->
    <Motion
      as="div"
      :class="mediaContainerClass"
      :initial="animationVariants.initial"
      :animate="animateState"
    >
      <video
        v-if="mediaType === 'video'"
        class="w-full h-full object-cover"
        :autoplay="autoPlay"
        :loop="loop"
        :muted="muted"
        :playsinline="playsInline"
        :poster="fallbackUrl"
      >
        <source :src="mediaUrl" type="video/mp4" />
      </video>

      <img
        v-else
        :src="mediaUrl"
        :alt="alt || `${firstText} ${secondText}`"
        class="w-full h-full object-cover"
      />
    </Motion>

    <!-- Right text -->
    <Motion as-child layout>
      <component :is="as" :class="rightTextClass">
        {{ secondText }}
      </component>
    </Motion>
  </div>
</template>
