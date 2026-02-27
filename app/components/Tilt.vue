<script setup lang="ts">
interface TiltProps {
  class?: string
  rotationFactor?: number
  reverse?: boolean
  springOptions?: Record<string, unknown>
}

const props = withDefaults(defineProps<TiltProps>(), {
  rotationFactor: 15,
  isReverse: false
})

const tiltRef = ref<HTMLElement | null>(null)

const x = useMotionValue(0)
const y = useMotionValue(0)

const xSpring = useSpring(x, props.springOptions)
const ySpring = useSpring(y, props.springOptions)

const rotateX = useTransform(
  ySpring,
  [-0.5, 0.5],
  props.reverse
    ? [props.rotationFactor, -props.rotationFactor]
    : [-props.rotationFactor, props.rotationFactor]
)

const rotateY = useTransform(
  xSpring,
  [-0.5, 0.5],
  props.reverse
    ? [-props.rotationFactor, props.rotationFactor]
    : [props.rotationFactor, -props.rotationFactor]
)

const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

const handleMouseMove = (e: MouseEvent) => {
  const el = tiltRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const xPos = (e.clientX - rect.left) / rect.width - 0.5
  const yPos = (e.clientY - rect.top) / rect.height - 0.5

  x.set(xPos)
  y.set(yPos)
}

const handleMouseLeave = () => {
  x.set(0)
  y.set(0)
}
</script>

<template>
  <Motion
    as-child
    :style="{
      transformStyle: 'preserve-3d',
      transform
    }"
  >
    <div
      ref="tiltRef"
      :class="props.class"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <slot />
    </div>
  </Motion>
</template>
