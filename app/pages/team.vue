<script setup lang="ts">
import { teamMembers } from '~/data/site'

const managingDirector = teamMembers[0]
const directors = teamMembers.slice(1, 5)
const operations = teamMembers.slice(5)
const cardAccents = ['green', 'blue', 'gold', 'orange'] as const

const teamGallery = [
  { src: '/images/members-gallery-01.jpg', alt: 'Global F.O.R representatives in conversation at a company event', label: 'Company connections' },
  { src: '/images/members-gallery-04.jpg', alt: 'Guests and representatives at the Global F.O.R Japanese Language School', label: 'Language education' },
  { src: '/images/members-gallery-07.jpg', alt: 'Global F.O.R members together at a company celebration', label: 'People together' },
]

usePageSeo({
  title: 'Our Members',
  description: 'Meet the leadership and staff of Global F.O.R Co., Ltd. in Yangon, Myanmar.',
  path: '/team',
  image: '/images/members-header.jpg',
  imageAlt: 'Global F.O.R representatives and guests at a formal dinner',
})
</script>

<template>
  <div class="team-page">
    <PageIntro
      eyebrow="Company structure"
      title="Our Members"
      summary="The people supporting Global F.O.R students, candidates and international business relationships."
      image="/images/members-header.jpg"
      image-alt="Global F.O.R representatives and guests at a formal dinner"
      chapter="03"
      accent="gold"
      image-position="center"
    />

    <section class="team-leadership" aria-labelledby="leadership-title">
      <div class="site-wrap">
        <div class="team-section-heading" v-reveal>
          <div>
            <p class="section-label">Leadership</p>
            <h2 id="leadership-title">Direction with<br><em>responsibility.</em></h2>
          </div>
          <p>Global F.O.R is led by its Managing Director and directors across language education and overseas employment services.</p>
        </div>

        <article
          v-motion="{
            initial: { opacity: 0, y: 36 },
            whileInView: { opacity: 1, y: 0 },
            inViewOptions: { once: true, amount: .15 },
            transition: { duration: .7 },
          }"
          class="team-spotlight"
        >
          <div class="team-spotlight-image">
            <img :src="managingDirector.image" :alt="`${managingDirector.name}, ${managingDirector.title} at Global F.O.R`" loading="lazy" decoding="async">
            <span class="team-spotlight-index">01</span>
            <span class="team-spotlight-stamp">MANAGING<br>DIRECTOR</span>
          </div>
          <div class="team-spotlight-copy">
            <p>LEADERSHIP / GLOBAL F.O.R</p>
            <h3>{{ managingDirector.name }}</h3>
            <strong>{{ managingDirector.title }}</strong>
            <div class="team-spotlight-line" aria-hidden="true"><span /></div>
            <dl>
              <div><dt>COMPANY</dt><dd>Established in 2014</dd></div>
              <div><dt>LICENCE</dt><dd>HR Licence No. 95/2022</dd></div>
              <div><dt>CONNECTIONS</dt><dd>Myanmar · Japan · Singapore</dd></div>
            </dl>
          </div>
        </article>

        <div class="team-subheading" v-reveal>
          <span>02—05</span>
          <h3>Directors</h3>
          <p>Leadership supporting the company’s education and employment services.</p>
        </div>

        <ol class="team-card-grid team-card-grid--directors">
          <li v-for="(member, index) in directors" :key="member.name">
            <MemberCard
              :name="member.name"
              :title="member.title"
              :image="member.image"
              :index="index + 2"
              group="Director"
              :accent="cardAccents[index % cardAccents.length]"
            />
          </li>
        </ol>
      </div>
    </section>

    <section class="team-operations" aria-labelledby="operations-title">
      <div class="site-wrap">
        <div class="team-section-heading team-section-heading--light" v-reveal>
          <div>
            <p class="section-label">Operations & administration</p>
            <h2 id="operations-title">The team behind<br><em>every connection.</em></h2>
          </div>
          <p>Staff supporting day-to-day coordination, administration and the Japanese language school.</p>
        </div>

        <ol class="team-card-grid team-card-grid--operations">
          <li v-for="(member, index) in operations" :key="member.name">
            <MemberCard
              :name="member.name"
              :title="member.title"
              :image="member.image"
              :index="index + 6"
              group="Team"
              :accent="cardAccents[(index + 1) % cardAccents.length]"
            />
          </li>
        </ol>
      </div>
    </section>

    <section class="team-life" aria-labelledby="team-life-title">
      <div class="site-wrap">
        <div class="team-life-heading" v-reveal>
          <p class="section-label">Life at Global F.O.R</p>
          <h2 id="team-life-title">Work built on<br>human connection.</h2>
        </div>
        <div class="team-gallery" v-reveal>
          <figure v-for="(photo, index) in teamGallery" :key="photo.src">
            <img :src="photo.src" :alt="photo.alt" loading="lazy" decoding="async">
            <figcaption><span>0{{ index + 1 }}</span>{{ photo.label }}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-leadership,
.team-operations,
.team-life {
  padding-block: 5rem;
}

.team-section-heading {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.team-section-heading h2,
.team-life-heading h2 {
  margin: 1.75rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.5rem);
  font-weight: 500;
  letter-spacing: -.07em;
  line-height: .94;
}

.team-section-heading h2 em {
  color: var(--blue);
  font-family: Georgia, serif;
  font-weight: 400;
}

.team-section-heading > p {
  max-width: 35rem;
  margin: 0;
  color: var(--muted);
  font-size: .92rem;
  line-height: 1.85;
}

.team-spotlight {
  display: grid;
  overflow: hidden;
  background: var(--ink);
  color: white;
}

.team-spotlight-image {
  position: relative;
  min-height: 25rem;
  overflow: hidden;
}

.team-spotlight-image::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgba(16, 36, 43, .62));
  content: '';
}

.team-spotlight-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 1s var(--ease);
}

.team-spotlight:hover .team-spotlight-image img {
  transform: scale(1.025);
}

.team-spotlight-index,
.team-spotlight-stamp {
  position: absolute;
  z-index: 2;
}

.team-spotlight-index {
  top: 1.5rem;
  left: 1.5rem;
  color: white;
  font-family: Georgia, serif;
  font-size: 2rem;
}

.team-spotlight-stamp {
  right: 1.5rem;
  bottom: 1.5rem;
  display: grid;
  width: 6.75rem;
  height: 6.75rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, .58);
  border-radius: 50%;
  color: white;
  font-size: .54rem;
  letter-spacing: .13em;
  line-height: 1.45;
  text-align: center;
}

.team-spotlight-stamp::before {
  position: absolute;
  inset: .8rem;
  border: 1px solid var(--gold);
  border-radius: inherit;
  content: '';
}

.team-spotlight-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem 2.5rem;
}

.team-spotlight-copy > p {
  margin: 0;
  color: #9fb1ad;
  font-size: .56rem;
  font-weight: 600;
  letter-spacing: .15em;
}

.team-spotlight-copy h3 {
  margin: 3.5rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(2.8rem, 8vw, 5.8rem);
  font-weight: 500;
  letter-spacing: -.07em;
  line-height: .9;
}

.team-spotlight-copy > strong {
  margin-top: 1.25rem;
  color: var(--gold);
  font-size: .75rem;
  font-weight: 600;
  letter-spacing: .09em;
  text-transform: uppercase;
}

.team-spotlight-line {
  position: relative;
  height: 1px;
  margin-block: 3rem 2rem;
  background: rgba(255, 255, 255, .22);
}

.team-spotlight-line span {
  position: absolute;
  top: -3px;
  left: 0;
  width: 4.5rem;
  height: 7px;
  background: var(--green);
}

.team-spotlight-copy dl {
  display: grid;
  gap: 1rem;
  margin: 0;
}

.team-spotlight-copy dl div {
  display: grid;
  grid-template-columns: 6.5rem 1fr;
  gap: 1rem;
}

.team-spotlight-copy dt {
  color: #8da09c;
  font-size: .52rem;
  letter-spacing: .12em;
}

.team-spotlight-copy dd {
  margin: 0;
  color: rgba(255, 255, 255, .82);
  font-size: .72rem;
}

.team-subheading {
  display: grid;
  gap: .8rem;
  margin: 5rem 0 2rem;
  border-top: 1px solid var(--ink);
  padding-top: 1.25rem;
}

.team-subheading span {
  color: var(--blue);
  font-family: Georgia, serif;
  font-size: 1.3rem;
}

.team-subheading h3 {
  margin: 0;
  font-family: Manrope, sans-serif;
  font-size: 2.3rem;
  font-weight: 500;
  letter-spacing: -.05em;
}

.team-subheading p {
  max-width: 30rem;
  margin: 0;
  color: var(--muted);
  font-size: .8rem;
  line-height: 1.7;
}

.team-card-grid {
  display: grid;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.team-operations {
  position: relative;
  overflow: hidden;
  background: #e8eeeb;
}

.team-operations::before {
  position: absolute;
  top: -15rem;
  right: -10rem;
  width: 30rem;
  height: 30rem;
  border: 4.5rem solid rgba(8, 120, 223, .055);
  border-radius: 50%;
  content: '';
}

.team-section-heading--light,
.team-card-grid--operations {
  position: relative;
  z-index: 1;
}

.team-section-heading--light h2 em {
  color: var(--green);
}

.team-life {
  background: var(--paper);
}

.team-life-heading {
  margin-bottom: 3rem;
}

.team-life-heading h2 {
  max-width: 10ch;
}

.team-gallery {
  display: grid;
  gap: 1rem;
}

.team-gallery figure {
  position: relative;
  min-height: 19rem;
  margin: 0;
  overflow: hidden;
  background: #dce7e3;
}

.team-gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .8s var(--ease);
}

.team-gallery figure:hover img {
  transform: scale(1.035);
}

.team-gallery figcaption {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(247, 248, 243, .92);
  padding: .9rem 1rem;
  color: var(--ink);
  font-size: .65rem;
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}

.team-gallery figcaption span {
  color: var(--blue);
  font-family: Georgia, serif;
  font-size: 1rem;
}

@media (min-width: 40rem) {
  .team-card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .team-gallery {
    grid-template-columns: 1.25fr .75fr;
  }

  .team-gallery figure:first-child {
    grid-row: span 2;
    min-height: 39rem;
  }
}

@media (min-width: 64rem) {
  .team-leadership,
  .team-operations,
  .team-life {
    padding-block: 7.5rem;
  }

  .team-section-heading {
    grid-template-columns: 1.2fr .8fr;
    align-items: end;
    gap: 5rem;
    margin-bottom: 4.5rem;
  }

  .team-section-heading > p {
    justify-self: end;
    padding-bottom: .6rem;
  }

  .team-spotlight {
    grid-template-columns: 1.18fr .82fr;
    min-height: 41rem;
  }

  .team-spotlight-image {
    min-height: 41rem;
  }

  .team-spotlight-copy {
    padding: 3.5rem;
  }

  .team-subheading {
    grid-template-columns: 6rem .75fr 1.25fr;
    align-items: start;
    gap: 2rem;
    margin-top: 7rem;
  }

  .team-subheading p {
    justify-self: end;
  }

  .team-card-grid--directors {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .team-card-grid--operations {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .team-card-grid--operations li {
    grid-column: span 2;
  }

  .team-card-grid--operations li:nth-child(4) {
    grid-column: 2 / span 2;
  }

  .team-life-heading {
    display: grid;
    grid-template-columns: .7fr 1.3fr;
    align-items: start;
    margin-bottom: 4rem;
  }

  .team-life-heading h2 {
    margin-top: 0;
    justify-self: end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .team-spotlight-image img,
  .team-gallery img {
    transition: none;
  }
}
</style>
