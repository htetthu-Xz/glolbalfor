<script setup lang="ts">
import type { ActivityImage, ActivityItem } from '~/data/activities'

const company = useCompany()

const props = defineProps<{
  activity: ActivityItem
  index: number
}>()

const emit = defineEmits<{
  selectImage: [image: ActivityImage, index: number, activity: ActivityItem]
}>()

const shareState = ref('Share')
const publishedLabel = computed(() => props.activity.publishedAt
  ? new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(props.activity.publishedAt))
  : null)
const displayIndex = computed(() => String(props.index + 1).padStart(2, '0'))

async function sharePost() {
  if (!import.meta.client) return
  const url = `${window.location.origin}${window.location.pathname}#activity-${props.activity.id}`

  try {
    if (navigator.share) {
      await navigator.share({ title: props.activity.title, text: props.activity.body, url })
      return
    }
    await navigator.clipboard.writeText(url)
    shareState.value = 'Link copied'
    window.setTimeout(() => { shareState.value = 'Share' }, 1800)
  }
  catch {
    shareState.value = 'Unavailable'
    window.setTimeout(() => { shareState.value = 'Share' }, 1800)
  }
}

function openFirstImage() {
  const image = props.activity.images[0]
  if (image) emit('selectImage', image, 0, props.activity)
}
</script>

<template>
  <article :id="`activity-${activity.id}`" class="activity-post" :class="`activity-post--${(index % 4) + 1}`" v-reveal>
    <header class="activity-post-head">
      <span class="activity-post-avatar"><img :src="company.logoUrl" alt=""></span>
      <div class="activity-post-identity">
        <strong>{{ company.name.toUpperCase() }}</strong>
        <span>{{ activity.sourceLabel }} <i aria-hidden="true">·</i> {{ publishedLabel || 'Official update' }}</span>
      </div>
      <span class="activity-post-number">{{ displayIndex }}</span>
    </header>

    <div class="activity-post-copy">
      <h2>{{ activity.title }}</h2>
      <p>{{ activity.body }}</p>
    </div>

    <div class="activity-gallery" :class="`activity-gallery--${Math.min(activity.images.length, 3)}`">
      <button
        v-for="(image, imageIndex) in activity.images"
        :key="image.src"
        type="button"
        class="activity-gallery-item"
        :aria-label="`Open image ${imageIndex + 1} of ${activity.images.length}: ${image.alt}`"
        @click="emit('selectImage', image, imageIndex, activity)"
      >
        <img :src="image.src" :alt="image.alt" loading="lazy" decoding="async">
        <span v-if="activity.images.length > 1" class="activity-gallery-count">{{ imageIndex + 1 }} / {{ activity.images.length }}</span>
        <span class="activity-gallery-open" aria-hidden="true">↗</span>
      </button>
    </div>

    <div class="activity-post-caption">
      <span><i aria-hidden="true" /> Official company gallery</span>
      <span>{{ activity.images.length }} {{ activity.images.length === 1 ? 'photo' : 'photos' }}</span>
    </div>

    <footer class="activity-post-actions">
      <button type="button" @click="openFirstImage">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v13H4zM7.5 15l3-3 2.5 2 2.5-3 2.5 3.5M8.5 9h.01" /></svg>
        <span>View gallery</span>
      </button>
      <a :href="`#activity-${activity.id}`">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></svg>
        <span>Post link</span>
      </a>
      <button type="button" @click="sharePost">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M8 8l4-4 4 4M5 13v6h14v-6" /></svg>
        <span>{{ shareState }}</span>
      </button>
    </footer>
  </article>
</template>

<style scoped>
.activity-post {
  --post-accent: var(--green);
  position: relative;
  scroll-margin-top: 7rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--post-accent) 20%, var(--line));
  border-radius: 1.35rem;
  background: white;
  box-shadow: 0 1.4rem 3.5rem rgba(16, 36, 43, .07);
}

.activity-post::before { position: absolute; z-index: 2; top: 0; left: 0; width: 100%; height: .22rem; background: linear-gradient(90deg, var(--post-accent), transparent 70%); content: ''; }
.activity-post--2 { --post-accent: var(--blue); }
.activity-post--3 { --post-accent: var(--gold); }
.activity-post--4 { --post-accent: var(--orange); }

.activity-post-head { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .8rem; padding: 1.1rem 1.1rem .75rem; }
.activity-post-avatar { display: grid; width: 2.8rem; height: 2.8rem; place-items: center; overflow: hidden; border: 2px solid white; border-radius: 50%; background: white; box-shadow: 0 0 0 2px color-mix(in srgb, var(--post-accent) 45%, var(--line)); }
.activity-post-avatar img { width: 100%; height: 100%; object-fit: cover; }
.activity-post-identity { display: grid; gap: .22rem; min-width: 0; }
.activity-post-identity strong { overflow: hidden; font-size: .67rem; letter-spacing: .035em; text-overflow: ellipsis; white-space: nowrap; }
.activity-post-identity span { color: var(--muted); font-size: .51rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
.activity-post-identity i { padding-inline: .22rem; color: var(--post-accent); font-style: normal; }
.activity-post-number { display: grid; width: 2.35rem; height: 2.35rem; place-items: center; border: 1px solid color-mix(in srgb, var(--post-accent) 42%, var(--line)); border-radius: 50%; color: var(--post-accent); font-family: Georgia, serif; font-size: .8rem; }

.activity-post-copy { padding: 1rem 1.1rem 1.4rem; }
.activity-post-copy h2 { max-width: 17ch; margin: 0; font-family: Manrope, sans-serif; font-size: clamp(1.65rem, 6vw, 2.4rem); font-weight: 500; letter-spacing: -.055em; line-height: 1.02; }
.activity-post-copy p { margin: 1rem 0 0; color: var(--muted); font-size: .76rem; line-height: 1.75; }

.activity-gallery { display: grid; min-height: 24rem; gap: 2px; overflow: hidden; background: var(--paper); }
.activity-gallery-item { position: relative; min-height: 15rem; overflow: hidden; border: 0; background: var(--ink); cursor: zoom-in; }
.activity-gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform .65s var(--ease), filter .5s ease; }
.activity-gallery-item::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 62%, rgba(6, 28, 35, .38)); content: ''; }
.activity-gallery-count { position: absolute; z-index: 2; right: .75rem; bottom: .7rem; border-radius: 999px; padding: .38rem .55rem; background: rgba(6, 28, 35, .72); color: white; font-size: .48rem; font-weight: 700; letter-spacing: .08em; }
.activity-gallery-open { position: absolute; z-index: 2; top: .7rem; right: .7rem; display: grid; width: 2rem; height: 2rem; place-items: center; border: 1px solid rgba(255, 255, 255, .7); border-radius: 50%; background: rgba(6, 28, 35, .22); color: white; font-size: .75rem; }
.activity-gallery--2 { grid-template-columns: repeat(2, 1fr); }
.activity-gallery--3 { grid-template-columns: 1.25fr .75fr; grid-template-rows: repeat(2, minmax(10.5rem, 1fr)); }
.activity-gallery--3 .activity-gallery-item:first-child { grid-row: 1 / 3; }
.activity-gallery--3 .activity-gallery-item { min-height: 0; }

.activity-post-caption { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .8rem 1.1rem; color: var(--muted); font-size: .5rem; font-weight: 600; letter-spacing: .07em; text-transform: uppercase; }
.activity-post-caption span:first-child { display: flex; align-items: center; gap: .45rem; }
.activity-post-caption i { width: .42rem; height: .42rem; border-radius: 50%; background: var(--post-accent); box-shadow: 0 0 0 .22rem color-mix(in srgb, var(--post-accent) 12%, transparent); }

.activity-post-actions { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.activity-post-actions button,
.activity-post-actions a { display: flex; min-width: 0; min-height: 3rem; align-items: center; justify-content: center; gap: .45rem; border: 0; border-right: 1px solid var(--line); padding: .65rem .35rem; background: transparent; color: var(--muted); font-size: .55rem; font-weight: 700; text-decoration: none; cursor: pointer; }
.activity-post-actions > :last-child { border-right: 0; }
.activity-post-actions svg { width: .95rem; height: .95rem; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5; }

@media (hover: hover) {
  .activity-gallery-item:hover img { filter: saturate(1.08); transform: scale(1.045); }
  .activity-post-actions button:hover,
  .activity-post-actions a:hover { background: color-mix(in srgb, var(--post-accent) 8%, white); color: var(--ink); }
}

@media (min-width: 40rem) {
  .activity-post-head { padding: 1.25rem 1.4rem .85rem; }
  .activity-post-copy { padding: 1.1rem 1.4rem 1.7rem; }
  .activity-post-copy p { font-size: .82rem; }
  .activity-post-caption { padding-inline: 1.4rem; }
  .activity-gallery { min-height: 31rem; }
  .activity-gallery--3 { grid-template-rows: repeat(2, minmax(14rem, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
  .activity-gallery-item img { transition: none; }
}
</style>
