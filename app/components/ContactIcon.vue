<script setup lang="ts">
defineProps<{
  name: 'phone' | 'mail' | 'facebook' | 'clock' | 'pin' | 'directions'
}>()
</script>

<template>
  <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'phone'">
      <path d="M7.2 3.7 9.6 7.9 7.8 9.7c1.2 2.7 3.5 5 6.2 6.2l1.8-1.8 4.2 2.4-.8 3.2c-.2.8-.9 1.3-1.7 1.3C9.5 21 3 14.5 3 6.5c0-.8.5-1.5 1.3-1.7l2.9-1.1Z" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </template>
    <template v-else-if="name === 'facebook'">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.7 7.5h-1.3c-1.2 0-2 .8-2 2.1V20M9 12.4h5" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </template>
    <template v-else>
      <path d="m14 4 6 6-6 6" />
      <path d="M20 10H9a5 5 0 0 0-5 5v5" />
    </template>
  </svg>
</template>

<style scoped>
.contact-icon {
  width: 1.65rem;
  height: 1.65rem;
}
</style>
