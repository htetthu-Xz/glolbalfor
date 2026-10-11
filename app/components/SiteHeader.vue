<script setup lang="ts">
const company = useCompany()
const brandName = computed(() => company.shortName.toUpperCase())
const brandSuffix = computed(() => company.name.slice(company.shortName.length).trim().toUpperCase())
const route = useRoute()
const menuOpen = ref(false)
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')
const mobileNavigation = useTemplateRef<HTMLElement>('mobileNavigation')

const approvedNavigation = [
  { label: 'The company', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our members', to: '/team' },
  { label: 'Activities', to: '/activities' },
  { label: 'Latest news', to: '/news' },
]

async function openMenu() {
  menuOpen.value = true
  await nextTick()
  mobileNavigation.value?.querySelector<HTMLAnchorElement>('a')?.focus()
}

function closeMenu(restoreFocus = true) {
  menuOpen.value = false
  if (restoreFocus) nextTick(() => menuButton.value?.focus())
}

function toggleMenu() {
  if (menuOpen.value) closeMenu()
  else openMenu()
}

function trapMobileNavigation(event: KeyboardEvent) {
  if (!menuOpen.value || event.key !== 'Tab') return
  const focusable = Array.from(mobileNavigation.value?.querySelectorAll<HTMLElement>('a[href]') ?? [])
  const first = focusable[0]
  const last = focusable.at(-1)
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => route.fullPath,
  () => closeMenu(false),
)

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.body.classList.toggle('menu-open', open)
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.classList.remove('menu-open')
})
</script>

<template>
  <header class="approved-site-header" @keydown.esc="closeMenu()">
    <div class="site-wrap approved-header-inner">
      <NuxtLink to="/" class="approved-brand" :aria-label="`${company.shortName} home`">
        <img :src="company.logoUrl" alt="">
        <span>{{ brandName }}<small>{{ brandSuffix || 'COMPANY' }}</small></span>
      </NuxtLink>

      <nav class="approved-desktop-nav" aria-label="Primary navigation">
        <NuxtLink v-for="item in approvedNavigation" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <NuxtLink to="/contact" class="nav-cta">Contact us ↗</NuxtLink>
      </nav>

      <button
        ref="menuButton"
        type="button"
        class="approved-menu-button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-navigation"
        @click="toggleMenu"
      >
        <span>{{ menuOpen ? 'Close' : 'Menu' }}</span><i aria-hidden="true" />
      </button>
    </div>
  </header>

  <nav
    id="mobile-navigation"
    ref="mobileNavigation"
    v-show="menuOpen"
    class="approved-mobile-menu"
    aria-label="Mobile navigation"
    @keydown.esc="closeMenu()"
    @keydown.tab="trapMobileNavigation"
  >
    <NuxtLink v-for="item in approvedNavigation" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
    <NuxtLink to="/contact" class="mobile-contact"><span>Contact our team</span><span aria-hidden="true">↗</span></NuxtLink>
    <small>Myanmar · Japan · Singapore<br>{{ company.licence }}</small>
  </nav>
</template>
