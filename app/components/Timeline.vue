<script setup lang="ts">
import { ref, computed } from 'vue'

export interface TimelineEvent {
  year: number
  icon: string
  title: string
  description: string
}

interface MainTick {
  index: number
  isMain: true
  eventIdx: number
  showYear: boolean
  event: TimelineEvent
}

interface MinorTick {
  index: number
  isMain: false
  eventIdx: -1
  showYear: false
  event: null
}

type TimelineTick = MainTick | MinorTick

interface Props {
  events?: TimelineEvent[]
  activeIndex?: number | null
  ticksBetween?: number
  leadingTicks?: number
  trailingTicks?: number
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  activeIndex: null,
  ticksBetween: 8,
  leadingTicks: 0,
  trailingTicks: 0
})

const emit = defineEmits<{
  click: [index: number]
}>()

const hoverIndex = ref<number | null>(null)
const exactHoverIndex = ref<number | null>(null)

const MAJOR_MAX_HEIGHT = 42
const MAJOR_MIN_HEIGHT = 24
const MINOR_MAX_HEIGHT = 20
const MINOR_MIN_HEIGHT = 10
const WAVE_DECAY = 0.65

const step = computed(() => props.ticksBetween + 1)
const lastMainIndex = computed(
  () => props.leadingTicks + ((props.events?.length || 1) - 1) * step.value
)

const timelineData = computed<TimelineTick[]>(() => {
  if (!props.events || props.events.length === 0) return []

  const total =
    props.leadingTicks +
    (props.events.length - 1) * step.value +
    1 +
    props.trailingTicks
  const data: TimelineTick[] = []

  for (let i = 0; i < total; i++) {
    const isMain =
      i >= props.leadingTicks &&
      i <= lastMainIndex.value &&
      (i - props.leadingTicks) % step.value === 0

    if (isMain) {
      const eventIdx = (i - props.leadingTicks) / step.value
      const showYear =
        eventIdx === 0
          ? true
          : props.events[eventIdx]!.year !== props.events[eventIdx - 1]!.year

      data.push({
        index: i,
        isMain: true,
        eventIdx,
        showYear,
        event: props.events[eventIdx]!
      })
    } else {
      data.push({
        index: i,
        isMain: false,
        eventIdx: -1,
        showYear: false,
        event: null
      })
    }
  }

  return data
})

const currentCenterIndex = computed(() => {
  if (hoverIndex.value !== null) return hoverIndex.value
  if (props.activeIndex !== null)
    return props.leadingTicks + props.activeIndex * step.value
  return null
})

const currentTargetIndex = computed(() => {
  if (exactHoverIndex.value !== null) return exactHoverIndex.value
  if (props.activeIndex !== null)
    return props.leadingTicks + props.activeIndex * step.value
  return -1
})

const activeTooltipEventIndex = computed(() => {
  if (hoverIndex.value !== null)
    return (hoverIndex.value - props.leadingTicks) / step.value
  return props.activeIndex
})

const getHeight = (tick: any) => {
  const maxH = tick.isMain ? MAJOR_MAX_HEIGHT : MINOR_MAX_HEIGHT
  const minH = tick.isMain ? MAJOR_MIN_HEIGHT : MINOR_MIN_HEIGHT

  if (currentCenterIndex.value === null) return `${maxH}px`

  const distance = Math.abs(tick.index - currentCenterIndex.value)
  if (distance === 0) return `${maxH}px`

  const exponentialBonus = Math.pow(WAVE_DECAY, distance - 1)
  return `${minH + (maxH - minH) * exponentialBonus}px`
}

const getBarColor = (globalIndex: number) => {
  return globalIndex <= currentTargetIndex.value
    ? 'bg-neutral-600'
    : 'bg-neutral-300'
}

const handleMouseEnter = (globalIndex: number) => {
  exactHoverIndex.value = globalIndex

  if (globalIndex < props.leadingTicks) {
    hoverIndex.value = props.leadingTicks
  } else if (globalIndex > lastMainIndex.value) {
    hoverIndex.value = lastMainIndex.value
  } else {
    const adjustedIndex = globalIndex - props.leadingTicks
    hoverIndex.value =
      props.leadingTicks + Math.floor(adjustedIndex / step.value) * step.value
  }
}

const handleMouseLeave = () => {
  hoverIndex.value = null
  exactHoverIndex.value = null
}

const handleClick = (tick: any) => {
  if (tick.isMain) emit('click', tick.eventIdx)
}
</script>

<template>
  <div
    class="flex flex-row items-start h-52 w-fit pt-8 mx-auto gap-x-px"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-for="tick in timelineData"
      :key="tick.index"
      class="relative flex flex-col items-center justify-start px-0.5 pb-1 h-20"
      :class="{ 'cursor-pointer': tick.isMain }"
      @mouseenter="handleMouseEnter(tick.index)"
      @click="handleClick(tick)"
    >
      <template v-if="tick.isMain">
        <div class="absolute top-8 w-4 h-10 z-0 cursor-pointer" />

        <span
          v-if="tick.showYear"
          class="absolute -top-6 left-1/2 font-medium -translate-x-1/2 text-xs transition-colors duration-200"
          :class="
            activeTooltipEventIndex === tick.eventIdx
              ? 'text-neutral-700'
              : 'text-neutral-400'
          "
        >
          {{ tick.event.year }}
        </span>

        <Motion
          v-if="activeTooltipEventIndex === tick.eventIdx"
          class="absolute top-full left-1/2 flex flex-col items-center text-center w-[240px] -translate-x-1/2 text-xs z-10 cursor-default"
          :initial="{ opacity: 0, y: 10, filter: 'blur(5px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.15, delay: 0.0875 }"
          @click.stop
        >
          <span class="font-medium text-neutral-700">{{
            tick.event.title
          }}</span>
          <p
            class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1"
          >
            {{ tick.event.description }}
          </p>
        </Motion>
      </template>

      <Motion
        class="rounded transition-colors w-0.5 relative flex flex-col justify-end items-center pointer-events-none"
        :class="getBarColor(tick.index)"
        :initial="{
          height: tick.isMain ? `${MAJOR_MIN_HEIGHT}px` : `${MINOR_MIN_HEIGHT}px`
        }"
        :animate="{ height: getHeight(tick) }"
        :transition="{ type: 'spring', stiffness: 200, damping: 15 }"
      >
        <span
          v-if="tick.isMain"
          class="absolute top-full mt-2 text-base transition-colors duration-200 pointer-events-none"
          :class="
            activeTooltipEventIndex === tick.eventIdx
              ? 'text-neutral-700'
              : 'text-neutral-400'
          "
        >
          <Icon :name="tick.event.icon" />
        </span>
      </Motion>
    </div>
  </div>
</template>
