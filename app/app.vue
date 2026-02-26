<script setup lang="ts">
import { useAnimate } from 'motion-v'
import type { TimelineEvent } from './components/Timeline.vue'

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  htmlAttrs: { lang: 'en' }
})

const [scope, animate] = useAnimate()
const isVibrating = ref(false)

function startVibration() {
  if (isVibrating.value) return

  isVibrating.value = true
  animate(
    'svg',
    {
      rotate: [0, -8, 8, -6, 6, -4, 4, 0],
      scale: [1, 1.04, 1.08, 1.08, 1.08, 1.08, 1.08, 1]
    },
    { duration: 0.6, ease: 'easeInOut' }
  ).finished.then(() => {
    isVibrating.value = false
  })
}

const events = ref<TimelineEvent[]>([
  {
    year: 2019,
    icon: 'proicons:code-square',
    title: 'The Code Revelation',
    description:
      'In 2019 I discover HTML, CSS, and JavaScript. I built small projects and websites, which ignited my passion for web development.'
  },
  {
    year: 2020,
    icon: 'proicons:hat-graduation',
    title: 'Epitech Journey',
    description:
      'I enrolled at Epitech, where I honed my skills in various programming languages and technologies.'
  },
  {
    year: 2021,
    icon: 'proicons:vuejs',
    title: 'Vue Discovery',
    description:
      'During my time at Epitech, I discovered Vue.js and was captivated by its simplicity and flexibility.'
  },
  {
    year: 2022,
    icon: 'simple-icons:nuxt',
    title: 'Nuxt Exploration',
    description:
      'As I delved deeper into Vue.js, I came across Nuxt.js, a powerful framework for server-side rendering and static site generation.'
  },
  {
    year: 2024,
    icon: 'custom:harmonix',
    title: 'Harmonix Creation',
    description:
      "Create Discord bots should be as intuitive as creating a Nuxt app. That's why I created Harmonix."
  },
  {
    year: 2025,
    icon: 'proicons:script',
    title: 'OverDev Launch',
    description:
      'I launched OverDev, a platform dedicated to providing development resources to help developers grow their skills and knowledge.'
  }
])

const activeIndex = ref<number | null>(events.value.length - 1)
</script>

<template>
  <div class="bg-neutral-50">
    <div class="px-8 mx-auto max-w-4xl">
      <div class="px-2 bg-neutral-100 ring ring-neutral-200 shadow-xs">
        <main
          class="space-y-16 px-8 py-16 border-x border-neutral-200 min-h-dvh bg-white shadow-xs"
        >
          <div>
            <Motion
              as-child
              :initial="{
                opacity: 0,
                y: -10,
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
              <NuxtLink
                to="mailto:hey@abou.dev"
                class="inline-block mb-6 text-neutral-500 underline underline-offset-2 decoration-dotted decoration-1 decoration-neutral-500 hover:text-neutral-700 transition-colors"
              >
                hey@abou.dev
              </NuxtLink>
            </Motion>

            <Motion
              as="h2"
              class="flex whitespace-pre leading-snug font-serif text-6xl text-neutral-700"
              :initial="{ opacity: 0, y: -20, filter: 'blur(10px)' }"
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
                  :texts="['Salut', 'Hi', 'Ciao', '👋']"
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
                  >, I'm David</Motion
                >
              </LayoutGroup>
            </Motion>
            <Motion
              as="h1"
              class="font-serif text-6xl text-neutral-700"
              :initial="{ opacity: 0, y: 20, filter: 'blur(10px)' }"
              :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :in-view-options="{ once: true }"
              :transition="{ ease: 'easeOut' }"
            >
              I am a Full-Stack Developer
            </Motion>

            <Motion
              as="div"
              class="flex items-center gap-x-6 mt-6"
              :initial="{ opacity: 0, y: 10, filter: 'blur(10px)' }"
              :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :in-view-options="{ once: true }"
              :transition="{ ease: 'easeOut', delay: 0.2 }"
            >
              <NuxtLink
                ref="scope"
                to="https://www.cal.eu/davidabou/30min"
                class="group flex items-center gap-x-2.5 h-fit py-3 pl-4 pr-6 rounded-xl font-medium text-sm text-white text-inverted bg-linear-to-b from-neutral-600 to-neutral-900 shadow-md hover:brightness-110 active:scale-97 active:shadow-transparent select-none cursor-pointer transition-[scale,filter,box-shadow] duration-150"
                @mouseenter="startVibration"
              >
                <Icon name="proicons:call" class="size-3.5" />

                Book a call
              </NuxtLink>

              <p class="max-w-xl text-lg text-neutral-600">
                I craft high-performance web applications using modern
                technologies, with a dedicated focus on
                <LetterSwap label="seamless " class="italic font-serif" />user
                experiences.
              </p>
            </Motion>
          </div>

          <Works />

          <div class="flex flex-col space-y-4">
            <Motion
              as="h3"
              class="mx-auto font-serif text-2xl text-neutral-700"
              :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
              :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :in-view-options="{ once: true }"
              :transition="{ ease: 'easeOut', delay: 0.4 }"
            >
              Timeline
            </Motion>

            <Motion
              :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
              :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :in-view-options="{ once: true }"
              :transition="{ ease: 'easeOut', delay: 0.6 }"
            >
              <Timeline
                :leading-ticks="2"
                :events="events"
                :activeIndex="activeIndex"
                @click="activeIndex = $event"
              />
            </Motion>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
