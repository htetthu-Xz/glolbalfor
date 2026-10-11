<script setup lang="ts">
import type { NewsItem } from '~/data/news'

const props = withDefaults(defineProps<{
  item: NewsItem
  index: number
  featured?: boolean
}>(), {
  featured: false,
})

const displayIndex = computed(() => String(props.index + 1).padStart(2, '0'))
</script>

<template>
  <NuxtLink
    :to="`/news/${item.slug}`"
    class="news-card"
    :class="{ 'news-card--featured': featured }"
    v-motion="{
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      inViewOptions: { once: true, amount: .18 },
      transition: { duration: .58, delay: index * .06 },
    }"
  >
    <span class="news-card-media">
      <img :src="item.coverImage" :alt="item.coverAlt" loading="lazy" decoding="async">
      <span class="news-card-index">{{ displayIndex }}</span>
      <span class="news-card-category">{{ item.category }}</span>
    </span>
    <span class="news-card-copy">
      <small>{{ item.eyebrow }}</small>
      <strong>{{ item.title }}</strong>
      <span>{{ item.summary }}</span>
      <b>Read the full story <i aria-hidden="true">↗</i></b>
    </span>
  </NuxtLink>
</template>

<style scoped>
.news-card {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
  box-shadow: 0 1.2rem 3rem rgba(16, 36, 43, .055);
  transition: transform .45s var(--ease), box-shadow .45s var(--ease);
}

.news-card-media {
  position: relative;
  display: block;
  min-height: 17rem;
  overflow: hidden;
  background: #dce7e3;
}

.news-card-media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(16, 36, 43, .04), rgba(16, 36, 43, .45));
  content: '';
}

.news-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .7s var(--ease), filter .7s var(--ease);
}

.news-card-index,
.news-card-category {
  position: absolute;
  z-index: 1;
}

.news-card-index {
  top: 1rem;
  left: 1rem;
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .7);
  border-radius: 50%;
  background: rgba(16, 36, 43, .3);
  color: white;
  font-family: Georgia, serif;
}

.news-card-category {
  right: 1rem;
  bottom: 1rem;
  padding: .55rem .75rem;
  background: rgba(247, 248, 243, .94);
  color: var(--ink);
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.news-card-copy {
  display: flex;
  min-height: 20rem;
  flex-direction: column;
  padding: 1.5rem;
}

.news-card-copy small {
  color: var(--blue);
  font-size: .56rem;
  font-weight: 700;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.news-card-copy > strong {
  margin-top: 2.25rem;
  font-family: Manrope, sans-serif;
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -.055em;
  line-height: 1.05;
}

.news-card-copy > span {
  margin-top: 1.15rem;
  color: var(--muted);
  font-size: .8rem;
  line-height: 1.75;
}

.news-card-copy b {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid var(--line);
  padding-top: 1.2rem;
  font-size: .68rem;
}

.news-card-copy i {
  font-size: 1rem;
  font-style: normal;
  transition: transform .35s var(--ease);
}

@media (hover: hover) {
  .news-card:hover {
    box-shadow: 0 2rem 4.5rem rgba(16, 36, 43, .12);
    transform: translateY(-.4rem);
  }

  .news-card:hover .news-card-media img {
    filter: saturate(1.08);
    transform: scale(1.045);
  }

  .news-card:hover .news-card-copy i {
    transform: translate(3px, -3px);
  }
}

@media (min-width: 48rem) {
  .news-card--featured {
    grid-template-columns: 1.08fr .92fr;
  }

  .news-card--featured .news-card-media,
  .news-card--featured .news-card-copy {
    min-height: 32rem;
  }

  .news-card--featured .news-card-copy {
    padding: 2.4rem;
  }

  .news-card--featured .news-card-copy > strong {
    font-size: clamp(2.5rem, 4.2vw, 4.1rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .news-card,
  .news-card-media img,
  .news-card-copy i {
    transition: none;
  }
}
</style>
