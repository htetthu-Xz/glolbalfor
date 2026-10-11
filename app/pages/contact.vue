<script setup lang="ts">
const company = useCompany()

const contactChannels = [
  {
    label: 'Telephone',
    value: company.phoneDisplay,
    note: 'Courses, employment and appointments',
    href: company.phoneHref,
    icon: 'phone',
    accent: 'green',
    external: false,
  },
  {
    label: 'Business email',
    value: company.email,
    note: 'Company and partnership enquiries',
    href: company.emailHref,
    icon: 'mail',
    accent: 'blue',
    external: false,
  },
  {
    label: 'Facebook',
    value: 'Follow Global F.O.R',
    note: 'Company updates and direct messages',
    href: company.facebookUrl,
    icon: 'facebook',
    accent: 'gold',
    external: true,
  },
] as const

usePageSeo({
  title: 'Contact',
  description: 'Contact Global F.O.R Co., Ltd. by phone or email, or plan a visit to the Yangon office.',
  path: '/contact',
  image: '/images/company-conversation.jpg',
  imageAlt: 'A business conversation with the Global F.O.R team',
})
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Talk with our team"
      title="Contact Us"
      summary="Call or email to discuss courses, overseas employment services, business enquiries or an office appointment."
      image="/images/company-conversation.jpg"
      image-alt="A Global F.O.R business conversation"
      chapter="04"
      accent="orange"
      image-position="center"
    />
    <section class="contact-routes" aria-labelledby="contact-routes-title">
      <div class="site-wrap">
        <div class="contact-heading" v-reveal>
          <div>
            <p class="section-label">Choose a contact route</p>
            <h2 id="contact-routes-title">Let’s start with<br><em>what you need.</em></h2>
          </div>
          <p>Reach the same team through the channel that works best for your enquiry.</p>
        </div>

        <div class="contact-channel-grid">
          <a
            v-for="(channel, index) in contactChannels"
            :key="channel.label"
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
            class="contact-channel"
            :class="`contact-channel--${channel.accent}`"
            v-motion="{
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              inViewOptions: { once: true, amount: .2 },
              transition: { duration: .58, delay: index * .07 },
            }"
          >
            <span class="contact-channel-top"><ContactIcon :name="channel.icon" /><small>0{{ index + 1 }}</small></span>
            <span class="contact-channel-copy"><small>{{ channel.label }}</small><strong>{{ channel.value }}</strong><span>{{ channel.note }}</span></span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>
    </section>

    <section class="contact-visit" aria-labelledby="visit-title">
      <div class="site-wrap contact-visit-shell">
        <div class="contact-visit-copy" v-reveal>
          <p class="section-label">Visit the Yangon office</p>
          <h2 id="visit-title">Plan your<br>visit.</h2>

          <div class="contact-info-block">
            <span class="contact-info-icon"><ContactIcon name="clock" /></span>
            <div><small>HOURS & APPOINTMENTS</small><p v-for="line in company.hours" :key="line">{{ line }}</p></div>
          </div>
          <div class="contact-info-block">
            <span class="contact-info-icon contact-info-icon--blue"><ContactIcon name="pin" /></span>
            <div><small>OFFICE ADDRESS</small><p>{{ company.address }}</p></div>
          </div>

          <a :href="company.visitUrl" target="_blank" rel="noopener noreferrer" class="contact-directions"><ContactIcon name="directions" /><span>Open directions in Google Maps</span><i aria-hidden="true">↗</i></a>
        </div>

        <div class="contact-map" v-reveal>
          <iframe
            title="Map showing the Global F.O.R office in Hlaing Township, Yangon"
            src="https://maps-api-ssl.google.com/maps?hl=en&ll=16.844398,96.125314&output=embed&q=16.844479,96.12324+(Untitled+Location)&z=17"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <span class="contact-map-label">HLAING TOWNSHIP<br>YANGON, MYANMAR</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-routes,
.contact-visit {
  padding-block: 5rem;
}

.contact-heading {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-heading h2,
.contact-visit-copy h2 {
  margin: 1.75rem 0 0;
  font-family: Manrope, sans-serif;
  font-size: clamp(3rem, 9vw, 6.4rem);
  font-weight: 500;
  letter-spacing: -.07em;
  line-height: .94;
}

.contact-heading h2 em {
  color: var(--orange);
  font-family: Georgia, serif;
  font-weight: 400;
}

.contact-heading > p {
  max-width: 31rem;
  margin: 0;
  color: var(--muted);
  font-size: .9rem;
  line-height: 1.8;
}

.contact-channel-grid {
  display: grid;
  gap: 1rem;
}

.contact-channel {
  --channel-accent: var(--green);
  position: relative;
  display: flex;
  min-height: 22rem;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--line);
  padding: 1.4rem;
  background: white;
  color: var(--ink);
  box-shadow: 0 1rem 3rem rgba(16, 36, 43, .05);
  transition: transform .45s var(--ease), box-shadow .45s var(--ease);
}

.contact-channel--blue { --channel-accent: var(--blue); }
.contact-channel--gold { --channel-accent: var(--gold); }

.contact-channel::before {
  position: absolute;
  right: -4rem;
  bottom: -4rem;
  width: 11rem;
  height: 11rem;
  border: 2.2rem solid color-mix(in srgb, var(--channel-accent) 12%, transparent);
  border-radius: 50%;
  content: '';
}

.contact-channel-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--channel-accent);
}

.contact-channel-top small {
  color: var(--muted);
  font-family: Georgia, serif;
  font-size: 1rem;
}

.contact-channel-copy {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.contact-channel-copy > small {
  color: var(--muted);
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .14em;
  text-transform: uppercase;
}

.contact-channel-copy strong {
  overflow-wrap: anywhere;
  margin-top: 1rem;
  font-family: Manrope, sans-serif;
  font-size: clamp(1.65rem, 3vw, 2.2rem);
  font-weight: 500;
  letter-spacing: -.055em;
  line-height: 1.05;
}

.contact-channel-copy > span {
  margin-top: .8rem;
  color: var(--muted);
  font-size: .72rem;
  line-height: 1.6;
}

.contact-channel > i {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  margin-top: 1.5rem;
  border-radius: 50%;
  background: var(--channel-accent);
  font-style: normal;
  transition: transform .35s var(--ease);
}

.contact-visit {
  overflow: hidden;
  background: var(--ink);
  color: white;
}

.contact-visit-shell {
  display: grid;
  gap: 3rem;
}

.contact-visit-copy .section-label { color: rgba(255, 255, 255, .72); }

.contact-info-block {
  display: grid;
  grid-template-columns: 3.2rem 1fr;
  gap: 1rem;
  margin-top: 2.5rem;
  border-top: 1px solid rgba(255, 255, 255, .2);
  padding-top: 1.5rem;
}

.contact-info-icon {
  display: grid;
  width: 3.2rem;
  height: 3.2rem;
  place-items: center;
  border-radius: 50%;
  background: var(--green);
  color: var(--ink);
}

.contact-info-icon--blue { background: var(--blue); color: white; }

.contact-info-block small {
  color: rgba(255, 255, 255, .5);
  font-size: .53rem;
  font-weight: 700;
  letter-spacing: .13em;
}

.contact-info-block p {
  margin: .65rem 0 0;
  color: rgba(255, 255, 255, .78);
  font-size: .8rem;
  line-height: 1.75;
}

.contact-directions {
  display: grid;
  grid-template-columns: 1.8rem 1fr auto;
  gap: .9rem;
  align-items: center;
  min-height: 4.4rem;
  margin-top: 2.5rem;
  border: 1px solid rgba(255, 255, 255, .28);
  padding-inline: 1.25rem;
  color: white;
  font-size: .68rem;
  font-weight: 700;
}

.contact-directions i { font-size: 1.1rem; font-style: normal; }

.contact-map {
  position: relative;
  min-height: 34rem;
  overflow: hidden;
  border-radius: 12rem 12rem 0 0;
  background: #dce7e3;
}

.contact-map iframe {
  width: 100%;
  height: 100%;
  min-height: 34rem;
  border: 0;
  filter: saturate(.7) contrast(.95);
}

.contact-map-label {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  padding: .8rem 1rem;
  background: var(--ink);
  color: white;
  font-size: .52rem;
  font-weight: 700;
  letter-spacing: .12em;
  line-height: 1.5;
}

@media (hover: hover) {
  .contact-channel:hover {
    box-shadow: 0 2rem 4rem rgba(16, 36, 43, .11);
    transform: translateY(-.45rem);
  }

  .contact-channel:hover > i { transform: translate(3px, -3px); }
}

@media (min-width: 48rem) {
  .contact-routes,
  .contact-visit { padding-block: 7rem; }
  .contact-channel-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 64rem) {
  .contact-heading {
    grid-template-columns: 1fr .65fr;
    align-items: end;
    margin-bottom: 4.5rem;
  }

  .contact-heading > p { justify-self: end; }

  .contact-visit-shell {
    grid-template-columns: .78fr 1.22fr;
    gap: 6rem;
    align-items: center;
  }

  .contact-map,
  .contact-map iframe { min-height: 42rem; }
}

@media (prefers-reduced-motion: reduce) {
  .contact-channel,
  .contact-channel > i { transition: none; }
}
</style>
