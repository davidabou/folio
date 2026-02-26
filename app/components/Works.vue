<script setup lang="ts">
const { data: works, error } = await useAsyncData('works', () =>
  queryCollection('works').order('releaseDate', 'DESC').all()
)

if (error.value) {
  throw createError({
    status: 404,
    message: 'Works not found',
    fatal: false
  })
}
</script>

<template>
  <div class="space-y-4">
    <Motion
      as="h3"
      class="font-serif text-2xl text-neutral-700"
      :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
      :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
      :in-view-options="{ once: true }"
      :transition="{ ease: 'easeOut', delay: 0.4 }"
    >
      Works
    </Motion>

    <div class="grid grid-cols-3 gap-x-4">
      <Motion
        v-for="(work, i) in works"
        as-child
        :initial="{ opacity: 0, y: 16, filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :in-view-options="{ once: true }"
        :transition="{ ease: 'easeOut', delay: 0.4 + i * 0.2 }"
      >
        <NuxtLink class="group" target="_blank" :to="work.url">
          <div
            class="flex flex-col gap-y-2 p-2 rounded-xl border border-dashed border-neutral-200 h-full [transition:border-color_0.2s_ease,scale_0.2s_ease-in-out,translate_0.2s_ease-in-out,box-shadow_0.2s_ease] group-hover:border-neutral-300 group-hover:shadow-lg group-hover:scale-103 group-hover:-translate-y-[3%]"
          >
            <div class="aspect-video rounded-lg overflow-hidden">
              <NuxtImg
                class="flex items-center justify-center size-full font-serif text-neutral-700 bg-neutral-100 object-cover object-top"
                :src="work.thumbnail"
                :alt="work.name"
              />
            </div>

            <div class="flex flex-col space-y-1">
              <div class="flex items-center justify-between">
                <h4
                  class="tracking-tight font-medium text-base text-neutral-700"
                >
                  {{ work.name }}
                </h4>

                <Icon
                  v-if="work.url"
                  name="proicons:arrow-right"
                  class="size-4 text-neutral-500 opacity-0 translate-y-4 transition-[opacity,translate,rotate] group-hover:opacity-100 group-hover:translate-y-0 group-hover:-rotate-45"
                />
              </div>

              <NuxtTime
                v-if="new Date(work.releaseDate) <= new Date()"
                class="text-xs text-neutral-700"
                locale="en-US"
                month="long"
                year="numeric"
                :datetime="work.releaseDate"
              />
              <span v-else class="text-xs text-neutral-700">Soon</span>

              <p class="text-xs text-neutral-500">
                {{ work.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-1 mt-auto">
              <div
                v-for="tech in work.stack"
                class="px-1.5 py-0.5 rounded-md font-medium text-xs text-neutral-700 bg-neutral-100"
              >
                {{ tech }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </Motion>
    </div>
  </div>
</template>
