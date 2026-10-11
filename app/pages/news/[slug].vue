<script setup lang="ts">
import { getNewsItem, mapNewsApiItem, newsItems, type NewsApiItem, type NewsApiResponse } from '~/data/news'

const route = useRoute()
const config = useRuntimeConfig()
const company = useCompany()
const slug = String(route.params.slug)
const { data: apiNewsItem } = await useAsyncData(`news-${slug}`, async () => {
  try {
    const response = await $fetch<{ data: NewsApiItem }>(`${config.public.apiBase}/api/v1/news/${slug}`)
    return mapNewsApiItem(response.data)
  }
  catch {
    return null
  }
})
const newsItem = apiNewsItem.value ?? getNewsItem(slug)

if (!newsItem) {
  throw createError({ statusCode: 404, statusMessage: 'News item not found' })
}

const { data: apiNews } = await useAsyncData('public-news', async () => {
  try {
    const response = await $fetch<NewsApiResponse>(`${config.public.apiBase}/api/v1/news`)
    return response.data.map(mapNewsApiItem)
  }
  catch {
    return null
  }
})
const availableNews = apiNews.value?.length ? apiNews.value : newsItems
const currentIndex = Math.max(0, availableNews.findIndex(item => item.slug === newsItem.slug))
const nextItem = availableNews[(currentIndex + 1) % availableNews.length] ?? newsItem

usePageSeo({
  title: newsItem.title,
  description: newsItem.summary,
  path: `/news/${newsItem.slug}`,
  image: newsItem.coverImage,
  imageAlt: newsItem.coverAlt,
  type: 'article',
  datePublished: newsItem.publishedAt,
  dateModified: newsItem.updatedAt,
})
</script>

<template>
  <article class="news-detail">
    <header class="news-detail-hero">
      <div class="site-wrap news-detail-hero-grid">
        <div
          class="news-detail-title"
          v-motion="{
            initial: { opacity: 0, y: 26 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: .7 },
          }"
        >
          <NuxtLink to="/news" class="news-detail-back">← All news & information</NuxtLink>
          <p>{{ newsItem.category }} / GLOBAL F.O.R</p>
          <h1>{{ newsItem.title }}</h1>
          <span>{{ newsItem.summary }}</span>
        </div>
        <div
          class="news-detail-cover"
          v-motion="{
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: .8, delay: .1 },
          }"
        >
          <img :src="newsItem.coverImage" :alt="newsItem.coverAlt" fetchpriority="high" decoding="async">
          <small>{{ newsItem.eyebrow }}</small>
        </div>
      </div>
    </header>

    <div class="site-wrap news-detail-body">
      <aside v-reveal>
        <span>{{ String(currentIndex + 1).padStart(2, '0') }}</span>
        <p>INFORMATION<br>{{ company.name.toUpperCase() }}</p>
      </aside>
      <div class="news-detail-content">
        <section v-for="section in newsItem.sections" :key="section.title" v-reveal>
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="section.items">
            <li v-for="item in section.items" :key="item"><span aria-hidden="true" />{{ item }}</li>
          </ul>
        </section>
        <NuxtLink :to="newsItem.action.to" class="news-detail-action"><span>{{ newsItem.action.label }}</span><span aria-hidden="true">↗</span></NuxtLink>
      </div>
    </div>

    <footer class="news-detail-next">
      <NuxtLink :to="`/news/${nextItem.slug}`" class="site-wrap">
        <small>READ NEXT / {{ nextItem.category }}</small>
        <strong>{{ nextItem.title }}</strong>
        <span aria-hidden="true">↗</span>
      </NuxtLink>
    </footer>
  </article>
</template>

<style scoped>
.news-detail-hero {
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: var(--ink);
  color: white;
}

.news-detail-hero-grid {
  display: grid;
  gap: 3rem;
  padding-block: 3.5rem;
}

.news-detail-title {
  align-self: center;
}

.news-detail-back {
  display: inline-flex;
  border-bottom: 1px solid rgba(255, 255, 255, .35);
  padding-bottom: .45rem;
  color: white;
  font-size: .65rem;
}

.news-detail-title > p {
  margin: 4rem 0 0;
  color: var(--green);
  font-size: .58rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.news-detail-title h1 {
  max-width: 13ch;
  margin: 1.5rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.2rem);
  font-weight: 500;
  letter-spacing: -.072em;
  line-height: .94;
}

.news-detail-title > span {
  display: block;
  max-width: 36rem;
  margin-top: 2rem;
  color: rgba(255, 255, 255, .68);
  font-size: .9rem;
  line-height: 1.8;
}

.news-detail-cover {
  position: relative;
  min-height: 28rem;
  overflow: hidden;
  border-radius: 12rem 12rem 0 0;
}

.news-detail-cover::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(16, 36, 43, .65));
  content: '';
}

.news-detail-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-detail-cover small {
  position: absolute;
  z-index: 1;
  right: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, .45);
  padding-top: 1rem;
  color: white;
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.news-detail-body {
  display: grid;
  gap: 3rem;
  padding-block: 5rem;
}

.news-detail-body aside {
  display: flex;
  align-items: start;
  justify-content: space-between;
  border-top: 1px solid var(--ink);
  padding-top: 1rem;
}

.news-detail-body aside span {
  color: var(--blue);
  font-family: Georgia, serif;
  font-size: 2rem;
}

.news-detail-body aside p {
  margin: 0;
  color: var(--muted);
  font-size: .52rem;
  letter-spacing: .12em;
  line-height: 1.65;
  text-align: right;
}

.news-detail-content {
  max-width: 48rem;
}

.news-detail-content section + section {
  margin-top: 4rem;
  border-top: 1px solid var(--line);
  padding-top: 4rem;
}

.news-detail-content h2 {
  margin: 0 0 2rem;
  font-family: Manrope, sans-serif;
  font-size: clamp(2rem, 5vw, 3.6rem);
  font-weight: 500;
  letter-spacing: -.06em;
  line-height: 1;
}

.news-detail-content p {
  color: var(--muted);
  font-size: .95rem;
  line-height: 2;
}

.news-detail-content p + p { margin-top: 1.2rem; }

.news-detail-content ul {
  display: grid;
  gap: .8rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.news-detail-content li {
  display: grid;
  grid-template-columns: 1rem 1fr;
  gap: .8rem;
  border-bottom: 1px solid var(--line);
  padding-block: .8rem;
  color: var(--muted);
  font-size: .85rem;
  line-height: 1.65;
}

.news-detail-content li span {
  width: .5rem;
  height: .5rem;
  margin-top: .5rem;
  border-radius: 50%;
  background: var(--green);
}

.news-detail-action {
  display: flex;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rem;
  padding-inline: 1.5rem;
  background: var(--ink);
  color: white;
  font-size: .72rem;
  font-weight: 700;
}

.news-detail-action span:last-child {
  display: grid;
  width: 2.4rem;
  height: 2.4rem;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  color: var(--ink);
  font-size: 1.1rem;
}

.news-detail-next {
  background: #e8eeeb;
}

.news-detail-next a {
  position: relative;
  display: grid;
  min-height: 18rem;
  align-content: center;
  gap: 1.5rem;
  color: var(--ink);
}

.news-detail-next small {
  color: var(--blue);
  font-size: .54rem;
  font-weight: 700;
  letter-spacing: .13em;
}

.news-detail-next strong {
  max-width: 16ch;
  font-family: Manrope, sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 500;
  letter-spacing: -.06em;
  line-height: 1;
}

.news-detail-next a > span {
  position: absolute;
  right: 0;
  bottom: 3rem;
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  font-size: 1.4rem;
}

@media (min-width: 48rem) {
  .news-detail-hero-grid {
    grid-template-columns: 1.08fr .92fr;
    align-items: stretch;
    min-height: 42rem;
    padding-block: 4.5rem;
  }

  .news-detail-body {
    grid-template-columns: .32fr .68fr;
    gap: 5rem;
    padding-block: 7rem;
  }
}
</style>
