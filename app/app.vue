<script setup lang="ts">
import type { SiteSettingsApiItem } from '~/composables/useCompany'

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
const company = useCompany()

const { data: siteSettings, refresh: refreshSiteSettings } = await useAsyncData('site-settings', async () => {
  try {
    const response = await $fetch<{ data: SiteSettingsApiItem }>(`${config.public.apiBase}/api/v1/site-settings`)
    return response.data
  }
  catch {
    return null
  }
})

watch(siteSettings, (settings) => {
  if (settings) applySiteSettings(company, settings)
}, { immediate: true })

function refreshSettingsWhenVisible() {
  if (document.visibilityState === 'visible') refreshSiteSettings()
}

function refreshSettingsOnFocus() {
  refreshSiteSettings()
}

onMounted(() => {
  window.addEventListener('focus', refreshSettingsOnFocus)
  document.addEventListener('visibilitychange', refreshSettingsWhenVisible)
})

onBeforeUnmount(() => {
  window.removeEventListener('focus', refreshSettingsOnFocus)
  document.removeEventListener('visibilitychange', refreshSettingsWhenVisible)
})

useHead({
  script: [
    {
      key: 'site-structured-data',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: company.name,
            alternateName: company.shortName,
            url: `${siteUrl}/`,
            logo: {
              '@type': 'ImageObject',
              url: company.logoUrl.startsWith('http') ? company.logoUrl : `${siteUrl}${company.logoUrl}`,
            },
            email: company.email,
            telephone: company.phoneDisplay,
            sameAs: [company.facebookUrl, company.languageCenterUrl],
            address: {
              '@type': 'PostalAddress',
              streetAddress: company.address,
              addressLocality: 'Yangon',
              postalCode: '11051',
              addressCountry: 'MM',
            },
            areaServed: ['Myanmar', 'Japan', 'Singapore'],
          },
          {
            '@type': ['LocalBusiness', 'EmploymentAgency', 'EducationalOrganization'],
            '@id': `${siteUrl}/#localbusiness`,
            name: company.name,
            url: `${siteUrl}/`,
            image: `${siteUrl}/images/company-community-group.jpg`,
            telephone: company.phoneDisplay,
            email: company.email,
            parentOrganization: { '@id': `${siteUrl}/#organization` },
            address: {
              '@type': 'PostalAddress',
              streetAddress: company.address,
              addressLocality: 'Yangon',
              postalCode: '11051',
              addressCountry: 'MM',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 16.844479,
              longitude: 96.12324,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '17:00',
              },
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: company.name,
            publisher: { '@id': `${siteUrl}/#organization` },
            inLanguage: 'en',
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
