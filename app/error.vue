<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number, statusMessage?: string } }>()

const isNotFound = computed(() => props.error.statusCode === 404)
const pageTitle = computed(() => isNotFound.value ? 'Page not found' : 'Page unavailable')
const pageMessage = computed(() => isNotFound.value
  ? 'The page you requested could not be found. It may have moved, or the address may be incomplete.'
  : 'The page could not be loaded. Return to the homepage or contact the Global F.O.R team if the problem continues.')

useSeoMeta({
  title: () => pageTitle.value,
  robots: 'noindex, nofollow',
})
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-paper px-5 text-ink">
    <div class="max-w-2xl text-center">
      <p class="section-label justify-center">{{ pageTitle }}</p>
      <span class="mt-8 block font-serif text-5xl text-brand-blue" aria-hidden="true">{{ error.statusCode || '!' }}</span>
      <h1 class="display-heading mt-5">Something is<br><span class="text-brand-blue">out of place.</span></h1>
      <p class="body-copy mx-auto mt-7 max-w-lg">{{ pageMessage }}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" class="arrow-link border-0" @click="clearError({ redirect: '/' })"><span>Return home</span><span aria-hidden="true">↗</span></button>
        <button type="button" class="inline-flex min-h-[3.4rem] items-center border border-line bg-transparent px-5 text-sm font-bold text-ink" @click="clearError({ redirect: '/contact' })">Contact our team</button>
      </div>
    </div>
  </main>
</template>
