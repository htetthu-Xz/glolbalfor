<script setup lang="ts">
const company = useCompany()

const values = [
  { english: 'Transparency', japanese: '透明性の確保', accent: 'green' },
  { english: 'Accountability', japanese: 'これまで培った信頼性', accent: 'blue' },
  { english: 'Professionalism', japanese: '徹底したプロ意識', accent: 'gold' },
  { english: 'Quality', japanese: '高いサービス品質', accent: 'orange' },
  { english: 'Teamwork', japanese: '調和の取れたチーム', accent: 'green' },
  { english: 'Excellence', japanese: '洗練されたサービスの提供', accent: 'blue' },
] as const

const businessActivitiesEnglish = [
  'Felling, extracting (with the permission from the authorities concerned) milling, manufacturing, preserving.',
  'To carry out the business of exploration, exploitation, production, processing of mineral resources and marketing of its products with the permission of the Government.',
  'Company has been providing human resources for career change support training projects, personal management and management consulting services to many companies since its establishment.',
]

const businessActivitiesJapanese = [
  '樹木の伐採、成分抽出、製粉業務、製品製造、保管\n※政府当局からの許認可取得も含む',
  '鉱物資源の探査、開発業務、製品製造、処理加工、およびマーケティング業務の一切\n※政府当局からの許認可取得も含む',
  '海外への人材派遣業務、就職・転職支援、研修業務、人事管理業務、経営コンサルティング',
]

const activities = businessActivitiesEnglish.map((english, index) => ({
  english,
  japanese: businessActivitiesJapanese[index]!,
}))

usePageSeo({
  title: 'About',
  description: 'Learn about Global F.O.R Co., Ltd., its values, vision, mission and business activities in Myanmar.',
  path: '/about',
  image: '/images/about-vision.jpg',
  imageAlt: 'Global F.O.R team and guests at a company event',
})
</script>

<template>
  <div class="about-page">
    <PageIntro
      eyebrow="About the company"
      title="About Global F.O.R"
      summary="A Myanmar service company committed to trust, professionalism and international opportunity."
      image="/images/about-classroom.jpg"
      image-alt="A teacher presenting to a Global F.O.R classroom"
      chapter="01"
      accent="green"
    />

    <section class="about-story" aria-labelledby="about-story-title">
      <div class="site-wrap about-story-grid">
        <div class="about-story-copy" v-reveal>
          <p class="section-label">Built in Myanmar</p>
          <h2 id="about-story-title">A local team with an<br><em>international outlook.</em></h2>
          <p>Global F.O.R brings together language education, overseas employment support and international business relationships through one professional team.</p>
          <div class="about-facts">
            <div><small>ESTABLISHED</small><strong>2014</strong></div>
            <div><small>EMPLOYMENT LICENCE</small><strong>95/2022</strong></div>
            <div><small>CONNECTIONS</small><strong>MM · JP · SG</strong></div>
          </div>
        </div>

        <div class="about-story-collage" v-reveal>
          <figure class="about-story-main">
            <img src="/images/about-vision.jpg" alt="Global F.O.R team and guests at a company event" loading="lazy" decoding="async">
            <figcaption>People and partnerships</figcaption>
          </figure>
          <figure class="about-story-secondary">
            <img src="/images/about-mission.jpg" alt="Global F.O.R representatives and guests at a formal dinner" loading="lazy" decoding="async">
            <figcaption>Trust built together</figcaption>
          </figure>
          <span class="about-story-orbit" aria-hidden="true">GLOBAL<br>F.O.R</span>
        </div>
      </div>
    </section>

    <section class="about-values" aria-labelledby="values-title">
      <div class="site-wrap">
        <div class="about-values-heading" v-reveal>
          <div>
            <p class="section-label">Our values · 弊社の強み</p>
            <h2 id="values-title">Six principles.<br>One standard.</h2>
          </div>
          <p>Each principle helps shape how Global F.O.R works with students, candidates, employers and business partners.</p>
        </div>

        <ol class="about-value-grid">
          <li
            v-for="(value, index) in values"
            :key="value.english"
            class="about-value"
            :class="`about-value--${value.accent}`"
            v-motion="{
              initial: { opacity: 0, y: 22 },
              whileInView: { opacity: 1, y: 0 },
              inViewOptions: { once: true, amount: .2 },
              transition: { duration: .52, delay: (index % 3) * .06 },
            }"
          >
            <span>0{{ index + 1 }}</span>
            <div><h3>{{ value.english }}</h3><p lang="ja">{{ value.japanese }}</p></div>
            <i aria-hidden="true" />
          </li>
        </ol>
      </div>
    </section>

    <section class="about-purpose" aria-labelledby="vision-title">
      <div class="site-wrap">
        <div class="about-purpose-heading" v-reveal>
          <p class="section-label">Vision & mission</p>
          <h2 id="vision-title">What guides<br>our work.</h2>
        </div>

        <div class="about-purpose-grid">
          <article class="about-purpose-card about-purpose-card--vision" v-reveal>
            <span class="about-purpose-number">01</span>
            <small>COMPANY VISION</small>
            <h3>A credible and reliable service company with an international outlook.</h3>
            <p>To be a leading, dynamic and efficient service company in Myanmar, implementing diversified business opportunities with an international outlook—and a trusted overseas recruitment agency of choice.</p>
            <div lang="ja">
              <b>弊社のビジョン</b>
              <p>グローバルな視点を持ちながら多様なビジネスチャンスを活かし、ミャンマーをリードする企業、そして世界で信頼される人材派遣会社を目指します。</p>
            </div>
          </article>

          <article class="about-purpose-card about-purpose-card--mission" v-reveal>
            <span class="about-purpose-number">02</span>
            <small>OUR MISSION</small>
            <h3>Professionalism.<br>Accountability.<br>Quality.</h3>
            <p>We are a group of dynamic young professionals dedicated to achieving and improving company goals with trust, diligence, sincerity, integrity and teamwork.</p>
            <div lang="ja">
              <b>弊社のミッション</b>
              <p>誠実さと信頼性を確保しながら、課題解決および目標達成に向けてチームで邁進してまいります。</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="about-activities" aria-labelledby="activities-title">
      <div class="site-wrap">
        <div class="about-activities-heading" v-reveal>
          <div><p class="section-label">Business activities · 事業内容</p><h2 id="activities-title">Work across<br><em>connected fields.</em></h2></div>
          <p>English and Japanese content is paired activity by activity so each item can be read as one complete record.</p>
        </div>

        <ol class="about-activity-list">
          <li v-for="(activity, index) in activities" :key="activity.english" v-reveal>
            <span class="about-activity-number">0{{ index + 1 }}</span>
            <div><small>ENGLISH</small><p>{{ activity.english }}</p></div>
            <div lang="ja"><small>日本語</small><p class="whitespace-pre-line">{{ activity.japanese }}</p></div>
          </li>
        </ol>
      </div>
    </section>

    <section class="about-office" aria-labelledby="office-title">
      <div class="site-wrap about-office-shell">
        <div class="about-office-copy" v-reveal>
          <p class="section-label">Yangon office</p>
          <h2 id="office-title">Meet our team<br>in Hlaing.</h2>
          <div class="about-office-address"><ContactIcon name="pin" /><p>{{ company.address }}</p></div>
          <div class="about-office-actions">
            <a :href="company.phoneHref" class="arrow-link"><span>Call {{ company.phoneDisplay }}</span><span aria-hidden="true">↗</span></a>
            <NuxtLink to="/contact" class="about-office-link"><span>All contact details</span><span aria-hidden="true">↗</span></NuxtLink>
          </div>
        </div>
        <div class="about-office-map" v-reveal>
          <iframe
            title="Map showing the Global F.O.R office in Hlaing Township, Yangon"
            src="https://maps-api-ssl.google.com/maps?hl=en&ll=16.844398,96.125314&output=embed&q=16.844479,96.12324+(Untitled+Location)&z=17"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-story,
.about-values,
.about-purpose,
.about-activities,
.about-office { padding-block: 5rem; }

.about-story-grid,
.about-office-shell { display: grid; gap: 3.5rem; }

.about-story-copy h2,
.about-values-heading h2,
.about-purpose-heading h2,
.about-activities-heading h2,
.about-office-copy h2 {
  margin: 1.75rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.4rem);
  font-weight: 500;
  letter-spacing: -.072em;
  line-height: .94;
}

.about-story-copy h2 em,
.about-activities-heading h2 em { color: var(--green); font-family: Georgia, serif; font-weight: 400; }

.about-story-copy > p:last-of-type { max-width: 37rem; margin: 2rem 0 0; color: var(--muted); font-size: .92rem; line-height: 1.9; }

.about-facts { display: grid; gap: 1px; margin-top: 2.5rem; background: var(--line); }
.about-facts div { display: flex; min-height: 5.5rem; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem; background: white; }
.about-facts small { color: var(--muted); font-size: .52rem; font-weight: 700; letter-spacing: .12em; }
.about-facts strong { font-family: Manrope, sans-serif; font-size: 1.15rem; font-weight: 500; letter-spacing: -.035em; }

.about-story-collage { position: relative; min-height: 38rem; }
.about-story-collage figure { margin: 0; }
.about-story-main,
.about-story-secondary { position: absolute; overflow: hidden; background: #dce7e3; }
.about-story-main { inset: 0 2.5rem 7rem 0; border-radius: 12rem 12rem 1rem 1rem; }
.about-story-secondary { right: 0; bottom: 0; width: 48%; height: 16rem; border: .75rem solid var(--paper); }
.about-story-main img,
.about-story-secondary img { width: 100%; height: 100%; object-fit: cover; }
.about-story-main figcaption,
.about-story-secondary figcaption { position: absolute; right: 1rem; bottom: 1rem; padding: .55rem .75rem; background: rgba(247, 248, 243, .92); font-size: .52rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.about-story-orbit { position: absolute; bottom: 3rem; left: -1rem; display: grid; width: 7rem; height: 7rem; place-items: center; border: 1px solid var(--green); border-radius: 50%; background: rgba(247, 248, 243, .94); font-size: .55rem; font-weight: 700; letter-spacing: .1em; line-height: 1.5; text-align: center; }
.about-story-orbit::before { position: absolute; inset: .85rem; border: 1px solid rgba(32, 215, 70, .42); border-radius: inherit; content: ''; }

.about-values { overflow: hidden; background: var(--ink); color: white; }
.about-values .section-label { color: rgba(255, 255, 255, .68); }
.about-values-heading,
.about-activities-heading { display: grid; gap: 2rem; margin-bottom: 3rem; }
.about-values-heading > p,
.about-activities-heading > p { max-width: 34rem; margin: 0; color: rgba(255, 255, 255, .62); font-size: .86rem; line-height: 1.8; }
.about-value-grid { display: grid; gap: 1px; margin: 0; padding: 1px; background: rgba(255, 255, 255, .18); list-style: none; }
.about-value { --value-accent: var(--green); position: relative; display: grid; grid-template-columns: 3rem 1fr; gap: 1rem; min-height: 10rem; align-items: end; overflow: hidden; padding: 1.3rem; background: var(--ink); }
.about-value--blue { --value-accent: var(--blue); }
.about-value--gold { --value-accent: var(--gold); }
.about-value--orange { --value-accent: var(--orange); }
.about-value > span { align-self: start; color: var(--value-accent); font-family: Georgia, serif; font-size: 1.05rem; }
.about-value h3 { margin: 0; font-family: Manrope, sans-serif; font-size: 1.55rem; font-weight: 500; letter-spacing: -.045em; }
.about-value p { margin: .5rem 0 0; color: rgba(255, 255, 255, .52); font-size: .7rem; }
.about-value i { position: absolute; right: -2rem; bottom: -2rem; width: 6rem; height: 6rem; border: 1rem solid color-mix(in srgb, var(--value-accent) 16%, transparent); border-radius: 50%; }

.about-purpose { background: #e8eeeb; }
.about-purpose-heading { margin-bottom: 3rem; }
.about-purpose-grid { display: grid; gap: 1.25rem; }
.about-purpose-card { position: relative; overflow: hidden; padding: 1.75rem; }
.about-purpose-card--vision { background: white; color: var(--ink); }
.about-purpose-card--mission { background: var(--blue); color: white; }
.about-purpose-number { position: absolute; top: 1.5rem; right: 1.5rem; color: currentColor; font-family: Georgia, serif; font-size: 3rem; opacity: .18; }
.about-purpose-card > small { font-size: .54rem; font-weight: 700; letter-spacing: .14em; }
.about-purpose-card h3 { max-width: 16ch; margin: 5rem 0 0; font-family: Manrope, sans-serif; font-size: clamp(2.1rem, 5vw, 3.7rem); font-weight: 500; letter-spacing: -.06em; line-height: 1; }
.about-purpose-card > p,
.about-purpose-card > div p { margin: 1.6rem 0 0; color: var(--muted); font-size: .82rem; line-height: 1.9; }
.about-purpose-card--mission > p,
.about-purpose-card--mission > div p { color: rgba(255, 255, 255, .76); }
.about-purpose-card > div { margin-top: 2.5rem; border-top: 1px solid currentColor; padding-top: 1.5rem; }
.about-purpose-card > div b { font-size: .6rem; letter-spacing: .1em; }

.about-activities-heading > p { color: var(--muted); }
.about-activity-list { margin: 0; padding: 0; list-style: none; }
.about-activity-list li { display: grid; gap: 1.5rem; border-top: 1px solid var(--ink); padding-block: 2rem; }
.about-activity-number { color: var(--blue); font-family: Georgia, serif; font-size: 1.65rem; }
.about-activity-list small { color: var(--muted); font-size: .52rem; font-weight: 700; letter-spacing: .13em; }
.about-activity-list p { margin: .8rem 0 0; color: var(--muted); font-size: .8rem; line-height: 1.85; }

.about-office { background: var(--soft-green); }
.about-office-address { display: grid; grid-template-columns: 2rem 1fr; gap: 1rem; margin-top: 2.5rem; border-top: 1px solid var(--line); padding-top: 1.5rem; color: var(--green); }
.about-office-address p { margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.8; }
.about-office-actions { display: grid; gap: .75rem; margin-top: 2rem; }
.about-office-link { display: flex; min-height: 3.4rem; align-items: center; justify-content: space-between; border: 1px solid var(--ink); padding-inline: 1.15rem; color: var(--ink); font-size: .72rem; font-weight: 700; }
.about-office-map { min-height: 32rem; overflow: hidden; border-radius: 11rem 11rem 0 0; background: #dce7e3; }
.about-office-map iframe { width: 100%; height: 100%; min-height: 32rem; border: 0; filter: saturate(.7); }

@media (min-width: 48rem) {
  .about-story,
  .about-values,
  .about-purpose,
  .about-activities,
  .about-office { padding-block: 7rem; }
  .about-facts { grid-template-columns: repeat(3, 1fr); }
  .about-facts div { display: block; }
  .about-facts strong { display: block; margin-top: 1rem; }
  .about-value-grid { grid-template-columns: repeat(2, 1fr); }
  .about-purpose-card { padding: 2.5rem; }
  .about-office-actions { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 64rem) {
  .about-story-grid { grid-template-columns: .88fr 1.12fr; align-items: center; gap: 6rem; }
  .about-story-collage { min-height: 44rem; }
  .about-values-heading,
  .about-activities-heading { grid-template-columns: 1fr .65fr; align-items: end; margin-bottom: 4.5rem; }
  .about-values-heading > p,
  .about-activities-heading > p { justify-self: end; }
  .about-value-grid { grid-template-columns: repeat(3, 1fr); }
  .about-value { min-height: 14rem; }
  .about-purpose-grid { grid-template-columns: 1fr 1fr; }
  .about-purpose-card { min-height: 42rem; padding: 3rem; }
  .about-activity-list li { grid-template-columns: .15fr .425fr .425fr; gap: 3rem; padding-block: 2.5rem; }
  .about-office-shell { grid-template-columns: .82fr 1.18fr; align-items: center; gap: 6rem; }
  .about-office-map,
  .about-office-map iframe { min-height: 40rem; }
}
</style>
