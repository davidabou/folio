<script setup lang="ts">
useSeoMeta({
  title: '404 - Page not found | David Abou'
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <h1 class="font-serif font-bold text-7xl text-neutral-700">404</h1>
    <p class="text-lg text-neutral-500">It would seem that you are lost...</p>
    <UiLink to="/" class="mt-4">Go back home</UiLink>
  </div>
</template>
