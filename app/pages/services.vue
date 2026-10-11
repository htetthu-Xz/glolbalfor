<script setup lang="ts">
import { courses } from '~/data/site'

const company = useCompany()

const employmentEnglish = [
  'Global F.O.R explores overseas job opportunities for Myanmar’s young talent who want to build advanced skills and knowledge in Japan, Singapore and other international workplaces.',
  'Through relationships with supervising organisations and employers, the team works to connect company needs with suitable candidate preparation and support.',
  'The long-term vision is for returning trainees to apply the skills and knowledge gained abroad to Myanmar’s growth in fields such as engineering, agriculture, maintenance and construction.',
]

const employmentJapanese = [
  '私たちGlobal F.O.R.では、特に雇用機会の多い日本やシンガポールへ向けてただ人材を派遣するだけではなく、派遣先にて高度な技術の習得や、専門的知識の向上にもつなげようと取り組んでおります。',
  '弊社が取引を行っている派遣先の監理団体におかれましては、現地における企業との強固なつながりを通じ、就労先企業様のニーズにしっかりとお応えします。',
  '将来ミャンマーへ帰国した際には、製造業、農業、機械設備、建設業などの分野において、各国で学んだ技術と知見を活かし、母国の成長に寄与していくことが私たちの夢です。',
]

const employmentPoints = employmentEnglish.map((english, index) => ({
  english,
  japanese: employmentJapanese[index]!,
}))

const schoolAudiencesEnglish = [
  'People who would like to undertake job training in Japan with an appropriate visa.',
  'People who would like to work at a Japanese company in Myanmar.',
  'People interested in developing professional Japanese-language ability.',
  'People who would like to study in Japan.',
]

const schoolAudiencesJapanese = [
  '特定のビザに限定せず、日本で職業訓練を受けたい方',
  'ミャンマー国内の日系企業で働きたい方',
  '日本語に興味を持っていて、専門的に日本語を学びたい方',
  '日本への留学を希望されている方',
]

const audiencePairs = schoolAudiencesEnglish.map((english, index) => ({
  english,
  japanese: schoolAudiencesJapanese[index]!,
}))

const courseAccents = ['green', 'blue', 'gold', 'orange'] as const

usePageSeo({
  title: 'Services',
  description: 'Explore Global F.O.R overseas employment services and Japanese-language courses in Yangon, Myanmar.',
  path: '/services',
  image: '/images/services-seminar.jpg',
  imageAlt: 'An information seminar presented to Global F.O.R attendees',
})
</script>

<template>
  <div class="services-page">
    <PageIntro
      eyebrow="What we do"
      title="Services"
      summary="Overseas employment support and Japanese-language education connected through one professional team."
      image="/images/services-seminar.jpg"
      image-alt="A Global F.O.R classroom seminar"
      chapter="02"
      accent="blue"
      image-position="center"
    />

    <section class="service-pathways" aria-labelledby="pathways-title">
      <div class="site-wrap">
        <div class="service-heading" v-reveal>
          <div><p class="section-label">Two connected paths</p><h2 id="pathways-title">Choose where your<br><em>journey begins.</em></h2></div>
          <p>Education and employment support are presented as connected stages rather than separate, text-heavy blocks.</p>
        </div>

        <div class="service-pathway-grid">
          <a href="#employment" class="service-pathway service-pathway--employment" v-reveal>
            <span class="service-pathway-image"><img src="/images/departure-candidates-8.jpg" alt="Global F.O.R candidates gathered before an international departure" loading="lazy" decoding="async"><i>01</i></span>
            <span class="service-pathway-copy"><small>OVERSEAS OPPORTUNITY</small><strong>Employment support</strong><span>Preparation and connection for opportunities in Japan and Singapore.</span><b>Explore this service <i>↓</i></b></span>
          </a>
          <a href="#language-school" class="service-pathway service-pathway--school" v-reveal>
            <span class="service-pathway-image"><img src="/images/training-class.jpg" alt="Students attending a Global F.O.R Japanese-language class" loading="lazy" decoding="async"><i>02</i></span>
            <span class="service-pathway-copy"><small>LANGUAGE EDUCATION</small><strong>Japanese school</strong><span>Structured learning, skills classes and interview preparation in Yangon.</span><b>Explore this service <i>↓</i></b></span>
          </a>
        </div>
      </div>
    </section>

    <section id="employment" class="service-employment" aria-labelledby="employment-title">
      <div class="site-wrap">
        <div class="service-employment-head" v-reveal>
          <div>
            <p class="section-label">Employment / 就労</p>
            <h2 id="employment-title">Overseas employment,<br>explained clearly.</h2>
          </div>
          <div class="service-licence"><small>HR LICENCE</small><strong>NO. 95/2022</strong></div>
        </div>

        <div class="service-employment-layout">
          <figure class="service-employment-photo" v-reveal>
            <img src="/images/airport-departure.jpg" alt="Global F.O.R candidates and supporters at an airport departure" loading="lazy" decoding="async">
            <figcaption><span>MYANMAR</span><i>→</i><span>JAPAN · SINGAPORE</span></figcaption>
          </figure>

          <ol class="service-employment-points">
            <li v-for="(point, index) in employmentPoints" :key="point.english" v-reveal>
              <span class="service-point-number">0{{ index + 1 }}</span>
              <div><small>ENGLISH</small><p>{{ point.english }}</p></div>
              <div lang="ja"><small>日本語</small><p>{{ point.japanese }}</p></div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section id="language-school" class="service-school" aria-labelledby="school-title">
      <div class="site-wrap service-school-intro">
        <div class="service-school-copy" v-reveal>
          <p class="section-label">Language education / 日本語学校</p>
          <h2 id="school-title">Language skills for<br><em>real opportunities.</em></h2>
          <p>Global F.O.R has operated a Japanese-language school and training centre since 2014, supporting learning, study plans, interview preparation and employment goals.</p>
          <div class="service-school-note" lang="ja"><small>日本語学校</small><p>2014年から日本語学校およびトレーニングセンターを開設し、専任の日本語教師による授業を提供しております。</p></div>
        </div>

        <div class="service-school-visual" v-reveal>
          <img src="/images/student-activity.jpg" alt="Global F.O.R students taking part in a learning activity" loading="lazy" decoding="async">
          <span>LEARN<br>PRACTISE<br>PREPARE</span>
        </div>
      </div>

      <div class="site-wrap service-audience-shell">
        <div class="service-audience-heading" v-reveal><span>WHO WE SUPPORT</span><h3>Four learning goals.</h3></div>
        <ol class="service-audience-grid">
          <li v-for="(audience, index) in audiencePairs" :key="audience.english" v-reveal>
            <span>0{{ index + 1 }}</span>
            <p>{{ audience.english }}</p>
            <p lang="ja">{{ audience.japanese }}</p>
          </li>
        </ol>
        <p class="service-school-program" v-reveal>Global F.O.R Japanese Language School also lists a special Kaigo programme combining theory and practical preparation through its professional teaching team.</p>
      </div>
    </section>

    <section class="service-courses" aria-labelledby="courses-title">
      <div class="site-wrap">
        <div class="service-courses-heading" v-reveal>
          <div><p class="section-label">Available courses</p><h2 id="courses-title">Eight ways to<br>move forward.</h2></div>
          <p>Contact the school team to confirm current schedules, entry requirements and availability.</p>
        </div>

        <ol class="service-course-grid">
          <li
            v-for="(course, index) in courses"
            :key="course"
            class="service-course"
            :class="`service-course--${courseAccents[index % courseAccents.length]}`"
            v-motion="{
              initial: { opacity: 0, y: 22 },
              whileInView: { opacity: 1, y: 0 },
              inViewOptions: { once: true, amount: .18 },
              transition: { duration: .5, delay: (index % 4) * .045 },
            }"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ course }}</strong>
            <i aria-hidden="true" />
          </li>
        </ol>
      </div>
    </section>

    <section class="service-centre">
      <div class="site-wrap service-centre-shell" v-reveal>
        <div><small>GLOBAL F.O.R JAPANESE LANGUAGE CENTER</small><h2>Continue the conversation.</h2><p>{{ company.languageCenterAddress }}</p></div>
        <div class="service-centre-actions">
          <a :href="company.phoneHref" class="arrow-link"><span>Call about courses</span><span aria-hidden="true">↗</span></a>
          <a :href="company.languageCenterUrl" target="_blank" rel="noopener noreferrer" class="service-centre-link"><span>Visit the centre on Facebook</span><span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.service-pathways,
.service-employment,
.service-school,
.service-courses,
.service-centre { padding-block: 5rem; }

.service-heading,
.service-courses-heading {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.service-heading h2,
.service-employment-head h2,
.service-school-copy h2,
.service-courses-heading h2 {
  margin: 1.75rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.4rem);
  font-weight: 500;
  letter-spacing: -.072em;
  line-height: .94;
}

.service-heading h2 em,
.service-school-copy h2 em { color: var(--blue); font-family: Georgia, serif; font-weight: 400; }

.service-heading > p,
.service-courses-heading > p { max-width: 34rem; margin: 0; color: var(--muted); font-size: .88rem; line-height: 1.85; }

.service-pathway-grid { display: grid; gap: 1.25rem; }

.service-pathway {
  display: grid;
  overflow: hidden;
  border: 1px solid var(--line);
  background: white;
  color: var(--ink);
  box-shadow: 0 1.25rem 3rem rgba(16, 36, 43, .06);
  transition: transform .45s var(--ease), box-shadow .45s var(--ease);
}

.service-pathway-image { position: relative; display: block; min-height: 20rem; overflow: hidden; }
.service-pathway-image::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 48%, rgba(16, 36, 43, .62)); content: ''; }
.service-pathway-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .75s var(--ease); }
.service-pathway-image > i { position: absolute; z-index: 1; top: 1.25rem; left: 1.25rem; display: grid; width: 3.2rem; height: 3.2rem; place-items: center; border: 1px solid rgba(255, 255, 255, .72); border-radius: 50%; background: rgba(16, 36, 43, .28); color: white; font-family: Georgia, serif; font-style: normal; }
.service-pathway-copy { display: flex; min-height: 20rem; flex-direction: column; padding: 1.5rem; }
.service-pathway-copy > small { color: var(--blue); font-size: .55rem; font-weight: 700; letter-spacing: .14em; }
.service-pathway--school .service-pathway-copy > small { color: #238338; }
.service-pathway-copy > strong { margin-top: 2.5rem; font-family: Manrope, sans-serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 500; letter-spacing: -.06em; line-height: 1; }
.service-pathway-copy > span { margin-top: 1rem; color: var(--muted); font-size: .8rem; line-height: 1.7; }
.service-pathway-copy b { display: flex; align-items: center; justify-content: space-between; margin-top: auto; border-top: 1px solid var(--line); padding-top: 1.1rem; font-size: .66rem; }
.service-pathway-copy b i { color: var(--blue); font-size: 1rem; font-style: normal; }

.service-employment { scroll-margin-top: 5rem; overflow: hidden; background: var(--ink); color: white; }
.service-employment .section-label { color: rgba(255, 255, 255, .68); }
.service-employment-head { display: grid; gap: 2rem; margin-bottom: 3rem; }
.service-licence { display: flex; width: 10rem; height: 10rem; flex-direction: column; align-items: center; justify-content: center; border: 1px solid var(--blue); border-radius: 50%; text-align: center; }
.service-licence::before { position: absolute; }
.service-licence small { color: rgba(255, 255, 255, .5); font-size: .52rem; font-weight: 700; letter-spacing: .12em; }
.service-licence strong { margin-top: .7rem; color: white; font-size: .86rem; }
.service-employment-layout { display: grid; gap: 3rem; }
.service-employment-photo { position: relative; min-height: 32rem; margin: 0; overflow: hidden; border-radius: 12rem 12rem 0 0; }
.service-employment-photo::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 52%, rgba(16, 36, 43, .72)); content: ''; }
.service-employment-photo img { width: 100%; height: 100%; object-fit: cover; }
.service-employment-photo figcaption { position: absolute; z-index: 1; right: 1.25rem; bottom: 1.25rem; left: 1.25rem; display: flex; justify-content: space-between; gap: .8rem; border-top: 1px solid rgba(255, 255, 255, .45); padding-top: 1rem; font-size: .52rem; font-weight: 700; letter-spacing: .11em; }
.service-employment-photo figcaption i { color: var(--green); font-style: normal; }
.service-employment-points { margin: 0; padding: 0; list-style: none; }
.service-employment-points li { display: grid; gap: 1.25rem; border-top: 1px solid rgba(255, 255, 255, .22); padding-block: 2rem; }
.service-point-number { color: var(--green); font-family: Georgia, serif; font-size: 1.55rem; }
.service-employment-points small { color: rgba(255, 255, 255, .42); font-size: .5rem; font-weight: 700; letter-spacing: .13em; }
.service-employment-points p { margin: .65rem 0 0; color: rgba(255, 255, 255, .72); font-size: .78rem; line-height: 1.85; }

.service-school { scroll-margin-top: 5rem; background: #e8eeeb; }
.service-school-intro { display: grid; gap: 3.5rem; }
.service-school-copy > p:last-of-type { max-width: 37rem; margin: 2rem 0 0; color: var(--muted); font-size: .9rem; line-height: 1.9; }
.service-school-note { margin-top: 2.5rem; border-left: 3px solid var(--green); padding: 1rem 0 1rem 1.4rem; }
.service-school-note small { color: var(--muted); font-size: .55rem; font-weight: 700; letter-spacing: .12em; }
.service-school-note p { margin: .7rem 0 0; color: var(--muted); font-size: .78rem; line-height: 1.8; }
.service-school-visual { position: relative; min-height: 34rem; overflow: hidden; border-radius: 12rem 12rem 1rem 1rem; }
.service-school-visual::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 48%, rgba(16, 36, 43, .58)); content: ''; }
.service-school-visual img { width: 100%; height: 100%; object-fit: cover; }
.service-school-visual span { position: absolute; z-index: 1; right: 1.5rem; bottom: 1.5rem; display: grid; width: 7rem; height: 7rem; place-items: center; border: 1px solid rgba(255, 255, 255, .72); border-radius: 50%; color: white; font-size: .52rem; font-weight: 700; letter-spacing: .1em; line-height: 1.5; text-align: center; }
.service-audience-shell { margin-top: 5rem; }
.service-audience-heading { display: flex; align-items: end; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--ink); padding-bottom: 1.25rem; }
.service-audience-heading span { color: var(--blue); font-size: .54rem; font-weight: 700; letter-spacing: .13em; }
.service-audience-heading h3 { margin: 0; font-family: Manrope, sans-serif; font-size: 2.2rem; font-weight: 500; letter-spacing: -.055em; }
.service-audience-grid { display: grid; gap: 1px; margin: 1px 0 0; padding: 0; background: var(--line); list-style: none; }
.service-audience-grid li { min-height: 16rem; padding: 1.4rem; background: white; }
.service-audience-grid li > span { color: var(--blue); font-family: Georgia, serif; font-size: 1.15rem; }
.service-audience-grid p { margin: 2rem 0 0; color: var(--ink); font-size: .8rem; line-height: 1.7; }
.service-audience-grid p[lang="ja"] { margin-top: 1rem; color: var(--muted); font-size: .72rem; }
.service-school-program { max-width: 50rem; margin: 2rem 0 0 auto; border-top: 1px solid var(--ink); padding-top: 1.25rem; color: var(--muted); font-size: .76rem; line-height: 1.8; }

.service-courses-heading > p { color: var(--muted); }
.service-course-grid { display: grid; gap: 1rem; margin: 0; padding: 0; list-style: none; }
.service-course { --course-accent: var(--green); position: relative; display: flex; min-height: 11rem; flex-direction: column; overflow: hidden; border-top: 1px solid var(--ink); padding: 1.25rem; background: white; box-shadow: 0 1rem 2.5rem rgba(16, 36, 43, .045); }
.service-course--blue { --course-accent: var(--blue); }
.service-course--gold { --course-accent: var(--gold); }
.service-course--orange { --course-accent: var(--orange); }
.service-course > span { color: var(--course-accent); font-family: Georgia, serif; font-size: 1.1rem; }
.service-course strong { max-width: 15rem; margin-top: auto; font-family: Manrope, sans-serif; font-size: 1.2rem; font-weight: 500; letter-spacing: -.035em; line-height: 1.15; }
.service-course i { position: absolute; top: -2.5rem; right: -2.5rem; width: 7rem; height: 7rem; border: 1.15rem solid color-mix(in srgb, var(--course-accent) 14%, transparent); border-radius: 50%; }

.service-centre { background: var(--soft-blue); }
.service-centre-shell { display: grid; gap: 2.5rem; }
.service-centre small { color: var(--blue); font-size: .54rem; font-weight: 700; letter-spacing: .13em; }
.service-centre h2 { margin: 1rem 0 0; font-family: Manrope, sans-serif; font-size: clamp(2.5rem, 7vw, 4.8rem); font-weight: 500; letter-spacing: -.065em; line-height: 1; }
.service-centre p { max-width: 40rem; margin: 1.5rem 0 0; color: var(--muted); font-size: .8rem; line-height: 1.8; }
.service-centre-actions { display: grid; align-content: end; gap: .75rem; }
.service-centre-link { display: flex; min-height: 3.4rem; align-items: center; justify-content: space-between; border: 1px solid var(--ink); padding-inline: 1.15rem; color: var(--ink); font-size: .72rem; font-weight: 700; }

@media (hover: hover) {
  .service-pathway:hover { box-shadow: 0 2rem 4rem rgba(16, 36, 43, .12); transform: translateY(-.45rem); }
  .service-pathway:hover .service-pathway-image img { transform: scale(1.045); }
}

@media (min-width: 48rem) {
  .service-pathways,
  .service-employment,
  .service-school,
  .service-courses,
  .service-centre { padding-block: 7rem; }
  .service-pathway-grid { grid-template-columns: repeat(2, 1fr); }
  .service-pathway-image { min-height: 24rem; }
  .service-audience-grid,
  .service-course-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 64rem) {
  .service-heading,
  .service-courses-heading { grid-template-columns: 1fr .65fr; align-items: end; margin-bottom: 4.5rem; }
  .service-heading > p,
  .service-courses-heading > p { justify-self: end; }
  .service-pathway { grid-template-columns: 1.03fr .97fr; }
  .service-pathway-image,
  .service-pathway-copy { min-height: 30rem; }
  .service-employment-head { grid-template-columns: 1fr auto; align-items: end; margin-bottom: 4.5rem; }
  .service-employment-layout { grid-template-columns: .7fr 1.3fr; gap: 5rem; align-items: start; }
  .service-employment-photo { position: sticky; top: 7rem; min-height: 42rem; }
  .service-employment-points li { grid-template-columns: .12fr .44fr .44fr; gap: 1.8rem; padding-block: 2.4rem; }
  .service-school-intro { grid-template-columns: .88fr 1.12fr; align-items: center; gap: 6rem; }
  .service-school-visual { min-height: 43rem; }
  .service-audience-grid,
  .service-course-grid { grid-template-columns: repeat(4, 1fr); }
  .service-centre-shell { grid-template-columns: 1.25fr .75fr; align-items: end; }
}

@media (max-width: 47.99rem) and (max-height: 45rem) {
  .service-pathways,
  .service-employment,
  .service-school,
  .service-courses,
  .service-centre {
    padding-block: 3.75rem;
  }

  .service-employment-head {
    margin-bottom: 2rem;
  }

  .service-employment-head h2 {
    margin-top: 1.25rem;
    font-size: 2.7rem;
    line-height: .96;
  }

  .service-licence {
    width: max-content;
    height: auto;
    flex-direction: row;
    gap: .65rem;
    padding: .8rem 1rem;
    border-radius: 999px;
  }

  .service-licence strong {
    margin-top: 0;
    font-size: .72rem;
  }

  .service-employment-photo {
    min-height: 24rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-pathway,
  .service-pathway-image img { transition: none; }
}
</style>
