<script setup lang="ts">
defineProps<{
  containerClass?: string
}>()

defineSlots<{
  default(): any
  content(): any
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const contentRef = ref<HTMLDivElement | null>(null)

const { width: windowWidth, height: windowHeight } = useWindowSize()
const { left: containerLeft, top: containerTop } =
  useElementBounding(containerRef)
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef)
const hasHover = useMediaQuery('(hover: hover)')

const { elementX, elementY, isOutside } = useMouseInElement(containerRef)

const isTouched = ref(false)

const isVisible = computed(() => {
  if (hasHover.value) return !isOutside.value

  return isTouched.value
})

const position = computed(() => {
  const tWidth = contentWidth.value || 160
  const tHeight = contentHeight.value || 40
  const offset = 12

  let finalX = elementX.value - tWidth - offset
  let finalY = elementY.value + offset

  const absCursorX = containerLeft.value + elementX.value
  const absCursorY = containerTop.value + elementY.value

  if (absCursorX + offset + tWidth > windowWidth.value) {
    finalX = elementX.value - tWidth - offset
  }
  if (containerLeft.value + finalX < 0) {
    finalX = -containerLeft.value + offset
  }
  if (absCursorY + offset + tHeight > windowHeight.value) {
    finalY = elementY.value - tHeight - offset
  }
  if (containerTop.value + finalY < 0) {
    finalY = -containerTop.value + offset
  }

  return { x: finalX, y: finalY }
})

const handleClick = (e: Event) => {
  if (hasHover.value) return
  e.preventDefault()
  isTouched.value = !isTouched.value
}

let touchTimeout: ReturnType<typeof setTimeout>
const handleTouchEnd = () => {
  if (hasHover.value) return
  clearTimeout(touchTimeout)
  touchTimeout = setTimeout(() => {
    isTouched.value = false
  }, 2000)
}
</script>

<template>
  <div
    ref="containerRef"
    :class="['relative inline-flex', containerClass]"
    @click="handleClick"
    @touchend="handleTouchEnd"
  >
    <slot />

    <AnimatePresence>
      <Motion
        v-if="isVisible"
        as="div"
        class="pointer-events-none absolute left-0 top-0 z-50 min-w-48 overflow-hidden rounded-xl bg-white shadow-sm ring-1 shadow-black/5 ring-neutral-200"
        :initial="{ scale: 0.97, opacity: 0, x: position.x, y: position.y }"
        :animate="{ scale: 1, opacity: 1, x: position.x, y: position.y }"
        :exit="{ scale: 0.97, opacity: 0, x: position.x, y: position.y }"
        :transition="{
          opacity: { ease: 'easeOut', duration: 0.15 },
          scale: { ease: 'easeOut', duration: 0.15 },
          x: { type: 'spring', damping: 20, stiffness: 300 },
          y: { type: 'spring', damping: 20, stiffness: 300 }
        }"
      >
        <div ref="contentRef" class="p-3 text-sm text-neutral-600">
          <slot name="content" />
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>
