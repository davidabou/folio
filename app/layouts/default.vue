<template>
  <div class="bg-neutral-50">
    <div class="px-8 mx-auto max-w-4xl">
      <div class="px-2 bg-neutral-100 ring ring-neutral-200 shadow-xs">
        <main
          class="flex flex-col px-8 py-16 border-x border-neutral-200 min-h-dvh bg-white shadow-xs"
        >
          <slot />

          <Motion
            as="span"
            class="mx-auto mt-16 text-xs text-neutral-500"
            :initial="{ opacity: 0, y: 10 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true }"
            :transition="{ duration: 0.15 }"
          >
            <UiLink to="https://github.com/davidabou/folio">source</UiLink> ·
            crafted with 🖤 by me
          </Motion>
        </main>
      </div>
    </div>
  </div>
</template>
