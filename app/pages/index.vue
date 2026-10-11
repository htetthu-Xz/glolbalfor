<script setup lang="ts">
import { courses } from '~/data/site'
import { mapNewsApiItem, newsItems, type NewsApiResponse } from '~/data/news'

const company = useCompany()
const config = useRuntimeConfig()
const { data: apiHomepageNews } = await useAsyncData('homepage-news', async () => {
  try {
    const response = await $fetch<NewsApiResponse>(`${config.public.apiBase}/api/v1/news?homepage=1`)
    return response.data.map(mapNewsApiItem)
  }
  catch {
    return null
  }
})
const homepageNews = computed(() => apiHomepageNews.value ?? newsItems)

const journey = [
  { number: '01', title: 'Learn', detail: 'Japanese language', arrow: '→' },
  { number: '02', title: 'Prepare', detail: 'Skills & interview', arrow: '→' },
  { number: '03', title: 'Connect', detail: 'Employment services', arrow: '→' },
  { number: '04', title: 'Begin', detail: 'Your next chapter', arrow: '↗' },
]

const levels = [
  { label: 'Foundation', value: 'N5' },
  { label: 'Elementary', value: 'N4' },
  { label: 'Intermediate', value: 'N3' },
  { label: 'Advanced', value: 'N2' },
]

usePageSeo({
  title: 'Japanese Language & Overseas Employment Services',
  description: 'Global F.O.R Co., Ltd. provides Japanese-language education and overseas employment services from Yangon, Myanmar.',
  path: '/',
  image: '/images/students-group.jpg',
  imageAlt: 'Global F.O.R Japanese-language students in Yangon',
})
</script>

<template>
  <div class="approved-home">
    <section id="home" class="home-hero">
      <div class="site-wrap home-hero-grid">
        <div class="home-hero-copy">
          <p class="section-label">Language education & overseas employment</p>
          <h1>
            Learn the language.<br>
            <span>Build your future.</span><br>
            <em>Go further.</em>
          </h1>
          <p class="home-hero-lead">
            Global F.O.R connects Japanese-language learning in Myanmar with overseas employment opportunities in Japan and Singapore.
          </p>
          <div class="home-hero-actions">
            <NuxtLink to="/services" class="home-primary-action">
              <span>Explore our services</span><span aria-hidden="true">↗</span>
            </NuxtLink>
            <a :href="company.phoneHref" class="home-secondary-action">
              <span>Call our team</span><span>{{ company.phoneDisplay }}</span>
            </a>
          </div>
        </div>

        <div class="home-hero-visual" aria-label="Global F.O.R students and business connections">
          <div class="home-hero-main">
            <img src="/images/students-group.jpg" alt="Global F.O.R Japanese-language students" fetchpriority="high" decoding="async">
            <div class="home-hero-caption">
              <strong>From the classroom<br>to new possibilities.</strong>
              <small>MYANMAR → JAPAN<br>MYANMAR → SINGAPORE</small>
            </div>
          </div>
          <div class="home-hero-business">
            <img src="/images/business-connection.jpg" alt="Global F.O.R representative at a business gathering" decoding="async">
          </div>
          <div class="home-hero-orbit"><span>LEARN<br>CONNECT<br>GROW</span></div>
          <svg class="home-route-line" viewBox="0 0 600 650" aria-hidden="true">
            <path d="M30 570 C 140 390, 80 180, 275 150 S 450 55, 570 25" />
          </svg>
          <p class="home-hero-meta">{{ company.name.toUpperCase() }}<br>{{ company.licence.toUpperCase() }}</p>
        </div>
      </div>
    </section>

    <section class="home-journey-strip" aria-labelledby="journey-title">
      <div class="site-wrap">
        <div class="home-journey-intro">
          <div>
            <p class="section-label">One connected journey</p>
            <h2 id="journey-title">From learning to opportunity.</h2>
          </div>
          <p>Education and employment support presented as one clear progression.</p>
        </div>
        <ol class="home-journey">
          <li v-for="step in journey" :key="step.number">
            <b>{{ step.number }}</b>
            <span><strong>{{ step.title }}</strong><small>{{ step.detail }}</small></span>
            <i aria-hidden="true">{{ step.arrow }}</i>
          </li>
        </ol>
      </div>
    </section>

    <section id="company" class="home-intro">
      <div class="site-wrap home-intro-grid">
        <div v-reveal>
          <p class="section-label">Who we are</p>
          <h2>People prepared for<br><em>what comes next.</em></h2>
          <div class="home-bilingual">
            <p>Global F.O.R Co., Ltd. brings together overseas employment services for Japan and Singapore, and Japanese-language training in Myanmar.</p>
            <p lang="ja">ミャンマーを拠点に、日本・シンガポールへの海外就職サービスと日本語教育を提供しています。</p>
          </div>
          <NuxtLink to="/about" class="home-lane-link"><span>Discover the company</span><span>↗</span></NuxtLink>
        </div>
        <div class="home-intro-image" v-reveal>
          <img src="/images/company-conversation.jpg" alt="Global F.O.R business conversation" loading="lazy" decoding="async">
          <img src="/images/student-activity.jpg" alt="Students taking part in a Global F.O.R activity" loading="lazy" decoding="async">
          <div class="home-trust-row">
            <div class="home-trust-item"><small>EMPLOYMENT DESTINATIONS</small><strong>Japan & Singapore</strong></div>
            <div class="home-trust-item"><small>LICENCED SERVICE</small><strong>{{ company.licence }}</strong></div>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="home-services">
      <div class="site-wrap">
        <div class="home-section-heading" v-reveal>
          <div><p class="section-label">Two connected services</p><h2>Choose where<br>your journey begins.</h2></div>
          <p>Focused support for language learners, job seekers and international business partners.</p>
        </div>
        <div class="home-service-lanes">
          <article class="home-service-lane education" v-reveal>
            <span class="home-lane-number">01</span>
            <h3>Japanese<br>language school</h3>
            <p>Build practical language ability and prepare for study, interviews and work.</p>
            <NuxtLink to="/services" class="home-lane-link"><span>Explore courses</span><span>↗</span></NuxtLink>
            <div class="home-lane-image"><img src="/images/training-class.jpg" alt="Japanese-language class" loading="lazy" decoding="async"></div>
          </article>
          <article class="home-service-lane employment" v-reveal>
            <span class="home-lane-number">02</span>
            <h3>Overseas<br>employment</h3>
            <p>Connect with our team about opportunities in Japan and Singapore or business recruitment enquiries.</p>
            <NuxtLink to="/services" class="home-lane-link"><span>Explore employment services</span><span>↗</span></NuxtLink>
            <div class="home-lane-image"><img src="/images/airport-departure.jpg" alt="Global F.O.R candidates at the airport" loading="lazy" decoding="async"></div>
          </article>
        </div>
      </div>
    </section>

    <section class="home-courses">
      <div class="site-wrap home-courses-grid">
        <div class="home-course-copy" v-reveal>
          <p class="section-label">Learning pathways</p>
          <h2>Progress with<br><em>purpose.</em></h2>
          <p>Current course names are shown from the verified company information.</p>
          <div class="home-levels" aria-label="Japanese language levels">
            <div v-for="level in levels" :key="level.value" class="home-level">
              <small>{{ level.label }}</small><strong>{{ level.value }}</strong>
            </div>
          </div>
        </div>
        <div class="home-skills" v-reveal>
          <div v-for="(course, index) in courses.slice(4)" :key="course" class="home-skill">
            <span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ course }}</strong>
          </div>
          <a :href="company.phoneHref" class="home-skill"><span>ENQUIRE</span><strong>Call about courses ↗</strong></a>
        </div>
      </div>
    </section>

    <section id="news" class="home-news" aria-labelledby="news-title">
      <div class="site-wrap">
        <div class="home-news-head" v-reveal>
          <div><p class="section-label">Latest news</p><h2 id="news-title">News that moves<br>people forward.</h2></div>
          <p>Course, service and company information,<br>with a complete page for every story.</p>
        </div>
        <div v-if="homepageNews.length" class="home-news-enhanced">
          <NewsCard :item="homepageNews[0]!" :index="0" featured />
          <div class="home-news-enhanced-side">
            <NewsCard v-for="(item, index) in homepageNews.slice(1)" :key="item.slug" :item="item" :index="index + 1" />
          </div>
        </div>
        <div class="home-news-foot"><span>Every published item has its own readable detail page.</span><NuxtLink to="/news">View all news & information <i>↗</i></NuxtLink></div>
      </div>
    </section>

    <section id="people" class="home-people">
      <div class="site-wrap home-people-grid">
        <div class="home-people-copy" v-reveal>
          <p class="section-label">Our members</p>
          <h2>Guidance from<br>real people.</h2>
          <p>The people behind the company, the school and every connection we help create.</p>
          <NuxtLink to="/team" class="home-people-link"><span>Meet our members</span><span>↗</span></NuxtLink>
        </div>
        <div class="home-people-photo" v-reveal>
          <img class="group" src="/images/company-community-group.jpg" alt="Global F.O.R company and community group" loading="lazy" decoding="async">
          <img class="portrait" src="/images/team-soe-yu-mon.jpg" alt="Soe Yu Mon, Director at Global F.O.R" loading="lazy" decoding="async">
        </div>
      </div>
    </section>

    <section id="contact" class="home-contact">
      <div class="site-wrap">
        <div class="home-contact-shell">
          <div class="home-contact-message" v-reveal>
            <p class="section-label">Start a conversation</p>
            <h2>Let’s find your<br><em>next step.</em></h2>
            <p>Whether you are learning Japanese, planning a career abroad or looking for recruitment support, begin with the route that fits you.</p>
            <div class="home-contact-mark" aria-hidden="true"><span>LEARN</span><span>WORK</span><span>CONNECT</span></div>
          </div>
          <div class="home-contact-routes" v-reveal>
            <a :href="company.phoneHref" class="home-contact-route"><span class="home-route-number">01</span><span class="home-route-copy"><small>COURSES & RECRUITMENT</small><strong>Call our team</strong><b>{{ company.phoneDisplay }}</b></span><i>↗</i></a>
            <a :href="company.emailHref" class="home-contact-route"><span class="home-route-number">02</span><span class="home-route-copy"><small>BUSINESS ENQUIRIES</small><strong>Send an email</strong><b>{{ company.email }}</b></span><i>↗</i></a>
            <NuxtLink to="/contact" class="home-contact-route"><span class="home-route-number">03</span><span class="home-route-copy"><small>OFFICE & DIRECTIONS</small><strong>Plan a visit</strong><b>Yangon, Myanmar</b></span><i>↗</i></NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-news-enhanced,
.home-news-enhanced-side {
  display: grid;
  gap: 1.25rem;
}

.home-news-enhanced-side {
  margin-top: 1.25rem;
}

@media (min-width: 48rem) {
  .home-news-enhanced-side {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .home-news-enhanced {
    grid-template-columns: 1.14fr .86fr;
    align-items: stretch;
  }

  .home-news-enhanced-side {
    grid-template-columns: 1fr;
    margin-top: 0;
  }

  .home-news-enhanced-side :deep(.news-card) {
    grid-template-columns: .8fr 1.2fr;
  }

  .home-news-enhanced-side :deep(.news-card-media),
  .home-news-enhanced-side :deep(.news-card-copy) {
    min-height: 17.5rem;
  }

  .home-news-enhanced-side :deep(.news-card-copy) {
    padding: 1.25rem;
  }

  .home-news-enhanced-side :deep(.news-card-copy > strong) {
    margin-top: 1.25rem;
    font-size: 1.65rem;
  }

  .home-news-enhanced-side :deep(.news-card-copy > span) {
    display: none;
  }
}
</style>
