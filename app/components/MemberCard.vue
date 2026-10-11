<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  title: string
  image: string
  index: number
  group: string
  accent?: 'blue' | 'green' | 'gold' | 'orange'
}>(), {
  accent: 'blue',
})

const paddedIndex = computed(() => String(props.index).padStart(2, '0'))
</script>

<template>
  <article
    v-motion="{
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      inViewOptions: { once: true, amount: .16 },
      transition: { duration: .58, delay: (index % 3) * .05 },
    }"
    class="member-card"
    :class="`member-card--${accent}`"
  >
    <div class="member-card-media">
      <img :src="image" :alt="`${name}, ${title} at Global F.O.R`" loading="lazy" decoding="async">
      <span class="member-card-number">{{ paddedIndex }}</span>
      <span class="member-card-role">{{ group }}</span>
      <span class="member-card-ring" aria-hidden="true" />
    </div>
    <div class="member-card-copy">
      <small>GLOBAL F.O.R / {{ group }}</small>
      <h3>{{ name }}</h3>
      <p>{{ title }}</p>
    </div>
  </article>
</template>

<style scoped>
.member-card {
  --card-accent: var(--blue);
  position: relative;
  border-top: 1px solid var(--ink);
  background: white;
  box-shadow: 0 1.25rem 3.5rem rgba(16, 36, 43, .06);
  transition: transform .45s var(--ease), box-shadow .45s var(--ease);
}

.member-card--green { --card-accent: var(--green); }
.member-card--gold { --card-accent: var(--gold); }
.member-card--orange { --card-accent: var(--orange); }

.member-card::before {
  position: absolute;
  z-index: 3;
  top: -1px;
  left: 0;
  width: 5rem;
  height: 4px;
  background: var(--card-accent);
  content: '';
  transition: width .45s var(--ease);
}

.member-card-media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #dce7e3;
}

.member-card-media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 56%, rgba(16, 36, 43, .68));
  content: '';
}

.member-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(.78) contrast(.98);
  transform: scale(1.01);
  transition: filter .55s var(--ease), transform .75s var(--ease);
}

.member-card-number,
.member-card-role {
  position: absolute;
  z-index: 2;
  font-size: .56rem;
  font-weight: 600;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.member-card-number {
  top: 1rem;
  left: 1rem;
  display: grid;
  width: 2.65rem;
  height: 2.65rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .72);
  border-radius: 50%;
  background: rgba(16, 36, 43, .34);
  color: white;
  backdrop-filter: blur(8px);
}

.member-card-role {
  right: 1rem;
  bottom: 1rem;
  max-width: calc(100% - 2rem);
  border-left: 3px solid var(--card-accent);
  padding: .5rem .7rem;
  background: rgba(247, 248, 243, .92);
  color: var(--ink);
}

.member-card-ring {
  position: absolute;
  z-index: 1;
  top: -2.25rem;
  right: -2.25rem;
  width: 7rem;
  height: 7rem;
  border: 1px solid color-mix(in srgb, var(--card-accent) 75%, white);
  border-radius: 50%;
  opacity: 0;
  transform: scale(.75);
  transition: opacity .45s var(--ease), transform .55s var(--ease);
}

.member-card-copy {
  min-height: 10.5rem;
  padding: 1.35rem 1.25rem 1.5rem;
}

.member-card-copy small {
  color: var(--muted);
  font-size: .52rem;
  font-weight: 600;
  letter-spacing: .12em;
}

.member-card-copy h3 {
  margin: 2rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(1.35rem, 2.2vw, 1.8rem);
  font-weight: 500;
  letter-spacing: -.045em;
  line-height: 1.05;
}

.member-card-copy p {
  margin: .65rem 0 0;
  color: var(--muted);
  font-size: .78rem;
}

@media (hover: hover) {
  .member-card:hover {
    box-shadow: 0 2rem 5rem rgba(16, 36, 43, .12);
    transform: translateY(-.55rem);
  }

  .member-card:hover::before {
    width: 100%;
  }

  .member-card:hover .member-card-media img {
    filter: saturate(1) contrast(1);
    transform: scale(1.055);
  }

  .member-card:hover .member-card-ring {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .member-card,
  .member-card::before,
  .member-card-media img,
  .member-card-ring {
    transition: none;
  }
}
</style>
