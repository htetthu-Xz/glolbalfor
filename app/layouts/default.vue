<script setup lang="ts">
import { MotionConfig } from 'motion-v'

const route = useRoute()
</script>

<template>
  <MotionConfig reduced-motion="user">
    <div>
      <a
        href="#main-content"
        class="fixed left-4 top-4 z-[100] -translate-y-24 bg-ink px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabindex="-1">
        <slot />
      </main>
      <ContactStrip v-if="route.path !== '/'" />
      <SiteFooter />
    </div>
  </MotionConfig>
</template>
