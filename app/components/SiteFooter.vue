<script setup lang="ts">
const company = useCompany()
const year = new Date().getFullYear()
const brandName = computed(() => company.shortName.toUpperCase())
const brandSuffix = computed(() => company.name.slice(company.shortName.length).trim().toUpperCase())
</script>

<template>
  <footer class="approved-footer">
    <div class="site-wrap">
      <div class="approved-footer-top">
        <div class="approved-footer-brand">
          <NuxtLink to="/#home" class="approved-brand" :aria-label="`${company.shortName} home`">
            <img :src="company.logoUrl" alt="">
            <span>{{ brandName }}<small>{{ brandSuffix || 'COMPANY' }}</small></span>
          </NuxtLink>
          <p>Japanese-language education and overseas employment services.</p>
        </div>

        <div class="approved-footer-cols">
          <div class="approved-footer-col">
            <h2>EXPLORE</h2>
            <NuxtLink to="/about">The company</NuxtLink>
            <NuxtLink to="/services">Services</NuxtLink>
            <NuxtLink to="/team">Our members</NuxtLink>
            <NuxtLink to="/activities">Activities</NuxtLink>
            <NuxtLink to="/news">Latest news</NuxtLink>
          </div>
          <div class="approved-footer-col">
            <h2>CONTACT</h2>
            <a :href="company.phoneHref">{{ company.phoneDisplay }}</a>
            <a :href="company.emailHref">{{ company.email }}</a>
            <p>Yangon, Myanmar</p>
          </div>
          <div class="approved-footer-col">
            <h2>COMPANY</h2>
            <p>{{ company.licence }}</p>
            <p>Myanmar · Japan · Singapore</p>
            <a :href="company.facebookUrl" target="_blank" rel="noopener noreferrer">Facebook ↗</a>
          </div>
        </div>
      </div>

      <div class="approved-footer-bottom">
        <span>© {{ year }} {{ company.name.toUpperCase() }}</span>
        <span>YANGON · MYANMAR</span>
        <NuxtLink to="/#home">BACK TO TOP ↑</NuxtLink>
      </div>
    </div>
  </footer>
</template>
