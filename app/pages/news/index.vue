<script setup lang="ts">
import { mapNewsApiItem, newsItems, type NewsApiResponse } from '~/data/news'

const config = useRuntimeConfig()
const { data: apiNews } = await useAsyncData('public-news', async () => {
  try {
    const response = await $fetch<NewsApiResponse>(`${config.public.apiBase}/api/v1/news`)
    return response.data.map(mapNewsApiItem)
  }
  catch {
    return null
  }
})
const displayedNews = computed(() => apiNews.value ?? newsItems)

usePageSeo({
  title: 'Latest News & Information',
  description: 'Read course, service and company information from Global F.O.R Co., Ltd. in Yangon, Myanmar.',
  path: '/news',
  image: '/images/training-class.jpg',
  imageAlt: 'Students attending a Global F.O.R Japanese-language training class',
})
</script>

<template>
  <div class="news-index">
    <header class="news-masthead">
      <div class="site-wrap news-masthead-shell">
        <div class="news-masthead-meta" v-reveal>
          <p class="section-label">Latest information</p>
          <span>06 / NEWSROOM</span>
        </div>
        <div class="news-masthead-copy" v-reveal>
          <h1>News <em>&</em> guides.</h1>
          <p>Useful company, course and service information from the Global F.O.R team—prepared as clear reading for your next step.</p>
        </div>
        <div class="news-masthead-topics" aria-label="News topics">
          <span>Company</span><i aria-hidden="true" />
          <span>Language education</span><i aria-hidden="true" />
          <span>Employment support</span>
        </div>
      </div>
    </header>

    <section class="news-index-list" aria-labelledby="news-index-title">
      <div class="site-wrap">
        <div class="news-index-heading" v-reveal>
          <div>
            <p class="section-label">Selected reading</p>
            <h2 id="news-index-title">Start with what<br><em>matters to you.</em></h2>
          </div>
          <p>These evergreen guides use verified company information. Dated client announcements can be added through the planned publishing system.</p>
        </div>

        <template v-if="displayedNews.length">
          <NewsCard :item="displayedNews[0]!" :index="0" featured />
          <div class="news-index-grid">
            <NewsCard v-for="(item, index) in displayedNews.slice(1)" :key="item.slug" :item="item" :index="index + 1" />
          </div>
        </template>
        <div v-else class="news-index-empty">
          <p class="section-label">No published entries yet</p>
          <h3>News is being prepared.</h3>
          <p>Please check again soon or contact our team for current information.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-masthead {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 86% 20%, rgba(15, 133, 229, .13), transparent 22rem),
    var(--paper);
}

.news-masthead::after {
  position: absolute;
  top: -16rem;
  right: -8rem;
  width: 31rem;
  height: 31rem;
  border: 1px solid rgba(15, 133, 229, .28);
  border-radius: 50%;
  content: '';
}

.news-masthead-shell { position: relative; z-index: 1; padding-block: 3.5rem 2rem; }
.news-masthead-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.news-masthead-meta > span { color: var(--muted); font-size: .56rem; font-weight: 700; letter-spacing: .14em; }
.news-masthead-copy { display: grid; gap: 1.5rem; align-items: end; margin-top: 3rem; }
.news-masthead-copy h1 { max-width: 10ch; margin: 0; font-family: Manrope, sans-serif; font-size: clamp(3.8rem, 12vw, 7.6rem); font-weight: 500; letter-spacing: -.08em; line-height: .88; }
.news-masthead-copy h1 em { color: var(--blue); font-family: Georgia, serif; font-weight: 400; }
.news-masthead-copy p { max-width: 36rem; margin: 0; border-left: 1px solid var(--blue); padding-left: 1.2rem; color: var(--muted); font-size: .84rem; line-height: 1.8; }
.news-masthead-topics { display: flex; align-items: center; gap: .65rem; margin-top: 2.75rem; border-top: 1px solid var(--line); padding-top: 1.2rem; overflow: hidden; color: var(--muted); font-size: .52rem; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; white-space: nowrap; }
.news-masthead-topics i { width: .35rem; height: .35rem; flex: 0 0 auto; border-radius: 50%; background: var(--blue); }

.news-index-list {
  padding-block: 5rem;
}

.news-index-heading {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.news-index-heading h2 {
  margin: 1.75rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.5rem);
  font-weight: 500;
  letter-spacing: -.07em;
  line-height: .94;
}

.news-index-heading h2 em {
  color: var(--blue);
  font-family: Georgia, serif;
  font-weight: 400;
}

.news-index-heading > p {
  max-width: 35rem;
  margin: 0;
  color: var(--muted);
  font-size: .9rem;
  line-height: 1.85;
}

.news-index-grid {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.news-index-empty { border: 1px solid var(--line); padding: clamp(2rem, 7vw, 5rem); background: white; }
.news-index-empty h3 { margin: 1.5rem 0 .75rem; font-family: Manrope, sans-serif; font-size: clamp(2rem, 6vw, 4rem); font-weight: 500; letter-spacing: -.06em; }
.news-index-empty > p:last-child { max-width: 34rem; color: var(--muted); line-height: 1.8; }

@media (min-width: 48rem) {
  .news-masthead-shell { padding-block: 4.5rem 2rem; }
  .news-masthead-copy { grid-template-columns: 1.1fr .9fr; gap: 4rem; margin-top: 3.5rem; }
  .news-masthead-copy p { margin-bottom: .6rem; }
  .news-index-list { padding-block: 7rem; }
  .news-index-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 64rem) {
  .news-index-heading {
    grid-template-columns: 1fr .72fr;
    align-items: end;
    margin-bottom: 4.5rem;
  }

  .news-index-heading > p { justify-self: end; }
}
</style>
