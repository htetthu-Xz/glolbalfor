<script setup lang="ts">
const company = useCompany()
</script>

<template>
  <aside aria-label="Contact Global F.O.R" class="border-y border-white/15 bg-ink py-5 text-white">
    <div class="site-wrap flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p class="m-0 text-white/70">Call or email to book an appointment.</p>
      <div class="flex flex-wrap gap-x-7 gap-y-2 font-semibold">
        <a :href="company.phoneHref" class="hover:text-brand-green">{{ company.phoneDisplay }}</a>
        <a :href="company.emailHref" class="hover:text-brand-cyan">{{ company.email }}</a>
      </div>
    </div>
  </aside>
</template>
