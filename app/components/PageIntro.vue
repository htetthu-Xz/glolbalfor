<script setup lang="ts">
const company = useCompany()

withDefaults(defineProps<{
  eyebrow: string
  title: string
  summary: string
  image: string
  imageAlt: string
  chapter?: string
  accent?: 'blue' | 'green' | 'gold' | 'orange'
  imagePosition?: string
}>(), {
  chapter: '01',
  accent: 'blue',
  imagePosition: 'center',
})
</script>

<template>
  <section class="inner-hero" :class="`inner-hero--${accent}`">
    <div class="site-wrap inner-hero-shell">
      <div
        v-motion="{
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: .75 },
        }"
        class="inner-hero-copy"
      >
        <div class="inner-hero-kicker">
          <p class="section-label">{{ eyebrow }}</p>
          <span>{{ chapter }} / {{ company.shortName.toUpperCase() }}</span>
        </div>
        <h1>{{ title }}</h1>
        <div class="inner-hero-summary">
          <span aria-hidden="true" />
          <p>{{ summary }}</p>
        </div>
        <p class="inner-hero-route">MYANMAR <i>→</i> JAPAN <i>·</i> SINGAPORE</p>
      </div>

      <div
        v-motion="{
          initial: { opacity: 0, x: 34, scale: 1.025 },
          animate: { opacity: 1, x: 0, scale: 1 },
          transition: { duration: .9, delay: .12 },
        }"
        class="inner-hero-visual"
      >
        <div class="inner-hero-image">
          <img :src="image" :alt="imageAlt" :style="{ objectPosition: imagePosition }" fetchpriority="high" decoding="async">
        </div>
        <div class="inner-hero-orbit" aria-hidden="true">
          <span>{{ chapter }}</span>
          <small>LEARN<br>CONNECT<br>GROW</small>
        </div>
        <div class="inner-hero-caption">
          <span>{{ company.name.toUpperCase() }}</span>
          <strong>{{ eyebrow }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inner-hero {
  --hero-accent: var(--blue);
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background:
    radial-gradient(circle at 3% 8%, color-mix(in srgb, var(--hero-accent) 19%, transparent) 0, transparent 24rem),
    var(--paper);
}

.inner-hero--green { --hero-accent: var(--green); }
.inner-hero--gold { --hero-accent: var(--gold); }
.inner-hero--orange { --hero-accent: var(--orange); }

.inner-hero::before {
  position: absolute;
  top: -15rem;
  right: -11rem;
  width: 34rem;
  height: 34rem;
  border: 1px solid color-mix(in srgb, var(--hero-accent) 30%, transparent);
  border-radius: 50%;
  content: '';
}

.inner-hero-shell {
  display: grid;
  min-height: 42rem;
  padding-block: 3.5rem;
}

.inner-hero-copy {
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.inner-hero-kicker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.inner-hero-kicker > span,
.inner-hero-route {
  color: var(--muted);
  font-size: .58rem;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.inner-hero-copy h1 {
  max-width: 12ch;
  margin: 4rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3.5rem, 13vw, 6.4rem);
  font-weight: 500;
  letter-spacing: -.075em;
  line-height: .92;
}

.inner-hero-summary {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  max-width: 37rem;
  margin-top: 2.25rem;
  color: var(--muted);
  font-size: .95rem;
  line-height: 1.8;
}

.inner-hero-summary > span {
  height: 1px;
  margin-top: .85rem;
  background: var(--hero-accent);
}

.inner-hero-summary p {
  margin: 0;
}

.inner-hero-route {
  margin: auto 0 0;
  padding-top: 2.5rem;
}

.inner-hero-route i {
  margin-inline: .45rem;
  color: var(--hero-accent);
  font-style: normal;
}

.inner-hero-visual {
  position: relative;
  min-height: 31rem;
  margin-top: 3rem;
}

.inner-hero-image {
  position: absolute;
  inset: 1.75rem 0 0 2.25rem;
  overflow: hidden;
  border-radius: 11rem 11rem 1.25rem 1.25rem;
  background: #dce7e3;
}

.inner-hero-image::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(16, 36, 43, .52));
  content: '';
}

.inner-hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .9s var(--ease);
}

.inner-hero:hover .inner-hero-image img {
  transform: scale(1.025);
}

.inner-hero-orbit {
  position: absolute;
  top: 0;
  right: .5rem;
  display: grid;
  width: 7.5rem;
  height: 7.5rem;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--hero-accent) 58%, white);
  border-radius: 50%;
  background: rgba(247, 248, 243, .92);
  color: var(--ink);
  text-align: center;
}

.inner-hero-orbit::before {
  position: absolute;
  inset: 1rem;
  border: 1px solid color-mix(in srgb, var(--hero-accent) 55%, transparent);
  border-radius: inherit;
  content: '';
}

.inner-hero-orbit span {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: var(--hero-accent);
  font-family: Georgia, serif;
  font-size: 1rem;
}

.inner-hero-orbit small {
  z-index: 1;
  font-size: .47rem;
  font-weight: 600;
  letter-spacing: .07em;
  line-height: 1.35;
}

.inner-hero-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid rgba(255, 255, 255, .32);
  padding: 1.1rem 1.25rem;
  color: white;
}

.inner-hero-caption span {
  font-size: .52rem;
  letter-spacing: .13em;
}

.inner-hero-caption strong {
  max-width: 12rem;
  font-family: Manrope, sans-serif;
  font-size: .85rem;
  font-weight: 500;
  text-align: right;
}

@media (min-width: 48rem) {
  .inner-hero-shell {
    grid-template-columns: .98fr 1.02fr;
    gap: 4rem;
    min-height: 43rem;
    padding-block: 4.5rem;
  }

  .inner-hero-copy h1 {
    margin-top: 5.5rem;
    font-size: clamp(4.8rem, 7.2vw, 7.2rem);
  }

  .inner-hero-visual {
    min-height: 34rem;
    margin-top: 0;
  }
}

@media (min-width: 64rem) {
  .inner-hero-shell {
    grid-template-columns: 1fr .82fr;
    gap: 6rem;
    min-height: 40rem;
  }

  .inner-hero-copy h1 {
    margin-top: 4.5rem;
    font-size: clamp(5.4rem, 6.4vw, 7.6rem);
  }

  .inner-hero-visual {
    min-height: 31rem;
  }
}

/* Keep the complete hero composition connected on short phone screens. */
@media (max-width: 47.99rem) and (max-height: 45rem) {
  .inner-hero-shell {
    min-height: auto;
    padding-block: 2.25rem 1.25rem;
  }

  .inner-hero-copy h1 {
    margin-top: 2.5rem;
    font-size: clamp(2.65rem, 12.5vw, 3.35rem);
    line-height: .94;
  }

  .inner-hero-summary {
    grid-template-columns: 2.75rem 1fr;
    gap: .8rem;
    margin-top: 1.35rem;
    font-size: .8rem;
    line-height: 1.58;
  }

  .inner-hero-route {
    display: none;
  }

  .inner-hero-visual {
    min-height: 15rem;
    margin-top: 1.5rem;
  }

  .inner-hero-image {
    inset: .75rem 0 0 1rem;
    border-radius: 7rem 7rem .8rem .8rem;
  }

  .inner-hero-orbit {
    right: 0;
    width: 5.35rem;
    height: 5.35rem;
  }

  .inner-hero-orbit::before {
    inset: .7rem;
  }

  .inner-hero-orbit span {
    top: .55rem;
    left: .65rem;
    font-size: .78rem;
  }

  .inner-hero-orbit small {
    font-size: .39rem;
  }

  .inner-hero-caption {
    padding: .7rem .8rem;
  }

  .inner-hero-caption span {
    font-size: .42rem;
  }

  .inner-hero-caption strong {
    max-width: 8rem;
    font-size: .68rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .inner-hero-image img {
    transition: none;
  }
}
</style>
