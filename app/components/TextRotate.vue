<script setup lang="ts">
import type { MotionProps } from 'motion-v'

interface WordObject {
  characters: string[]
  needsSpace: boolean
}

interface TextRotateProps {
  texts: string[]
  as?: keyof HTMLElementTagNameMap
  rotationInterval?: number
  initial?: MotionProps['initial']
  animate?: MotionProps['animate']
  exit?: MotionProps['exit']
  animatePresenceMode?: 'wait' | 'sync' | 'popLayout'
  animatePresenceInitial?: boolean
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  transition?: MotionProps['transition']
  loop?: boolean
  auto?: boolean
  splitBy?: 'words' | 'characters' | 'lines' | string
  mainClass?: string
  splitLevelClass?: string
  elementLevelClass?: string
}

const props = withDefaults(defineProps<TextRotateProps>(), {
  as: 'p',
  rotationInterval: 2000,
  initial: () => ({ y: '100%', opacity: 0 }),
  animate: () => ({ y: 0, opacity: 1 }),
  exit: () => ({ y: '-120%', opacity: 0 }),
  animatePresenceMode: 'wait',
  animatePresenceInitial: false,
  staggerDuration: 0,
  staggerFrom: 'first',
  transition: () => ({ type: 'spring', damping: 25, stiffness: 300 }),
  loop: true,
  auto: true,
  splitBy: 'characters'
})

const emit = defineEmits<{ next: [index: number] }>()

const currentTextIndex = ref(0)

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), ({ segment }) => segment)
  }
  return Array.from(text)
}

const elements = computed((): WordObject[] => {
  const currentText = props.texts[currentTextIndex.value] ?? ''

  if (props.splitBy === 'characters') {
    return currentText.split(' ').map((word, i, arr) => ({
      characters: splitIntoCharacters(word),
      needsSpace: i !== arr.length - 1
    }))
  }

  const parts =
    props.splitBy === 'words'
      ? currentText.split(' ')
      : props.splitBy === 'lines'
        ? currentText.split('\n')
        : currentText.split(props.splitBy)

  return parts.map((el: string, i: number, arr: string[]) => ({
    characters: [el],
    needsSpace: i !== arr.length - 1
  }))
})

interface WordMeta extends WordObject {
  startIndex: number
}

const wordMeta = computed((): WordMeta[] => {
  let count = 0
  return elements.value.map((word): WordMeta => {
    const start = count
    count += word.characters.length
    return { ...word, startIndex: start }
  })
})

const totalChars = computed(() =>
  wordMeta.value.reduce((acc, w) => acc + w.characters.length, 0)
)

const getStaggerDelay = (index: number): number => {
  const total = totalChars.value
  const { staggerFrom, staggerDuration } = props

  if (staggerFrom === 'first') return index * staggerDuration
  if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration
  if (staggerFrom === 'center') {
    return Math.abs(Math.floor(total / 2) - index) * staggerDuration
  }
  if (staggerFrom === 'random') {
    return Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration
  }
  return Math.abs((staggerFrom as number) - index) * staggerDuration
}

const getAnimationProp = <
  T extends MotionProps['initial' | 'animate' | 'exit']
>(
  prop: T,
  index: number
) => {
  if (Array.isArray(prop)) return prop[index % prop.length]
  return prop
}

const getCharTransition = (globalIndex: number) => ({
  ...props.transition,
  delay: getStaggerDelay(globalIndex)
})

const handleIndexChange = (newIndex: number) => {
  currentTextIndex.value = newIndex
  emit('next', newIndex)
}

const next = () => {
  const nextIndex =
    currentTextIndex.value === props.texts.length - 1
      ? props.loop
        ? 0
        : currentTextIndex.value
      : currentTextIndex.value + 1

  if (nextIndex !== currentTextIndex.value) handleIndexChange(nextIndex)
}

const previous = () => {
  const prevIndex =
    currentTextIndex.value === 0
      ? props.loop
        ? props.texts.length - 1
        : currentTextIndex.value
      : currentTextIndex.value - 1

  if (prevIndex !== currentTextIndex.value) handleIndexChange(prevIndex)
}

const jumpTo = (index: number) => {
  const validIndex = Math.max(0, Math.min(index, props.texts.length - 1))
  if (validIndex !== currentTextIndex.value) handleIndexChange(validIndex)
}

const reset = () => {
  if (currentTextIndex.value !== 0) handleIndexChange(0)
}

defineExpose({ next, previous, jumpTo, reset })

let intervalId: ReturnType<typeof setInterval> | null = null

const startInterval = () => {
  if (!props.auto) return
  intervalId = setInterval(next, props.rotationInterval)
}

const stopInterval = () => {
  if (intervalId) clearInterval(intervalId)
}

onMounted(startInterval)
onUnmounted(stopInterval)

watch(
  () => props.auto,
  (val) => {
    stopInterval()
    if (val) startInterval()
  }
)
</script>

<template>
  <Motion
    :as="as"
    :class="['flex flex-wrap whitespace-pre-wrap', mainClass]"
    :transition="props.transition"
    layout
  >
    <span class="sr-only">{{ texts[currentTextIndex] }}</span>

    <AnimatePresence
      :mode="animatePresenceMode"
      :initial="animatePresenceInitial"
    >
      <Motion
        as="span"
        :key="currentTextIndex"
        :class="['flex flex-wrap', splitBy === 'lines' && 'flex-col w-full']"
        aria-hidden
        layout
      >
        <span
          v-for="(word, wordIndex) in wordMeta"
          :key="wordIndex"
          :class="['inline-flex', splitLevelClass]"
        >
          <span
            v-for="(char, charIndex) in word.characters"
            :key="word.startIndex + charIndex"
            :class="elementLevelClass"
          >
            <Motion
              as="span"
              class="inline-block"
              :initial="getAnimationProp(initial, word.startIndex + charIndex)"
              :animate="getAnimationProp(animate, word.startIndex + charIndex)"
              :exit="getAnimationProp(exit, word.startIndex + charIndex)"
              :transition="getCharTransition(word.startIndex + charIndex)"
            >
              {{ char }}
            </Motion>
          </span>

          <span v-if="word.needsSpace" class="whitespace-pre"> </span>
        </span>
      </Motion>
    </AnimatePresence>
  </Motion>
</template>
