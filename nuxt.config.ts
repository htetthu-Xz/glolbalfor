import tailwindcss from '@tailwindcss/vite'

const isWindows = process.platform === 'win32'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  modules: ['motion-v/nuxt'],
  motionV: {
    directives: true,
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/home': { redirect: { to: '/', statusCode: 301 } },
    '/services/our-members': { redirect: { to: '/team', statusCode: 301 } },
    '/services/our-members/test': { redirect: { to: '/team', statusCode: 301 } },
  },
  // Nuxt 4.6 currently needs a path-safe inline rule on Windows. Nitro's
  // dependency tracer also cannot read OneDrive parent links in a restricted
  // Windows workspace, so tracing remains enabled for real Linux releases and
  // is disabled only for the local Windows verification build.
  // Remove these workarounds after https://github.com/nuxt/nuxt/issues/36467
  // and the upstream Windows node-file-trace issue are resolved.
  nitro: {
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]dist[\\/]/],
      trace: !isWindows,
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://globalformm.com',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | Global F.O.R Co., Ltd.',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap' },
      ],
      meta: [
        { name: 'theme-color', content: '#10242b' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
