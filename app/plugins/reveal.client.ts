export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<Element, IntersectionObserver>()

  nuxtApp.vueApp.directive('reveal', {
    mounted(element: HTMLElement) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      element.classList.add('reveal-ready')
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          element.classList.add('reveal-visible')
          observer.disconnect()
        },
        { threshold: 0.14 },
      )

      observers.set(element, observer)
      observer.observe(element)
    },
    unmounted(element: HTMLElement) {
      observers.get(element)?.disconnect()
      observers.delete(element)
    },
  })
})
