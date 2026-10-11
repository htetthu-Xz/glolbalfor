<script setup lang="ts">
import { activities as fallbackActivities, mapActivityFromApi, type ActivityApiItem, type ActivityImage, type ActivityItem } from '~/data/activities'
const company = useCompany()

usePageSeo({
  title: 'Activities',
  description: 'See learning, preparation, community and company activities from Global F.O.R Co., Ltd. in Yangon, Myanmar.',
  path: '/activities',
  image: '/images/company-community-group.jpg',
  imageAlt: 'Global F.O.R company and community members gathered together',
})

interface ActivityApiResponse {
  data: ActivityApiItem[]
  meta: { next_cursor: string | null }
}

interface ActivityFeedResult {
  items: ActivityItem[]
  nextCursor: string | null
  source: 'api' | 'fallback'
}

const config = useRuntimeConfig()
const loadMorePending = ref(false)
const loadMoreError = ref('')

const { data: initialFeed, status: feedStatus, refresh: retryFeed } = await useAsyncData<ActivityFeedResult>('activity-feed', async () => {
  try {
    const response = await $fetch<ActivityApiResponse>(`${config.public.apiBase}/api/v1/activities`)
    return {
      items: response.data.map(mapActivityFromApi),
      nextCursor: response.meta.next_cursor,
      source: 'api',
    }
  }
  catch {
    return { items: fallbackActivities, nextCursor: null, source: 'fallback' }
  }
})

const activityFeed = ref<ActivityItem[]>(initialFeed.value?.items ?? [])
const nextCursor = ref<string | null>(initialFeed.value?.nextCursor ?? null)
const usingFallback = computed(() => initialFeed.value?.source === 'fallback')

watch(initialFeed, (value) => {
  if (!value) return
  activityFeed.value = value.items
  nextCursor.value = value.nextCursor
})

async function loadMoreActivities() {
  if (!nextCursor.value || loadMorePending.value) return
  loadMorePending.value = true
  loadMoreError.value = ''

  try {
    const response = await $fetch<ActivityApiResponse>(`${config.public.apiBase}/api/v1/activities`, {
      query: { cursor: nextCursor.value },
    })
    activityFeed.value.push(...response.data.map(mapActivityFromApi))
    nextCursor.value = response.meta.next_cursor
  }
  catch {
    loadMoreError.value = 'More activities could not be loaded. Please try again.'
  }
  finally {
    loadMorePending.value = false
  }
}

const viewer = ref<{ activity: ActivityItem, index: number } | null>(null)
const viewerDialog = useTemplateRef<HTMLElement>('viewerDialog')
const currentImage = computed<ActivityImage | null>(() => viewer.value?.activity.images[viewer.value.index] ?? null)
let viewerTrigger: HTMLElement | null = null

function openViewer(_image: ActivityImage, index: number, activity: ActivityItem) {
  if (import.meta.client && document.activeElement instanceof HTMLElement) {
    viewerTrigger = document.activeElement
  }
  viewer.value = { activity, index }
  nextTick(() => viewerDialog.value?.focus())
}

function openActivityCover(activity: ActivityItem) {
  const image = activity.images[0]
  if (image) openViewer(image, 0, activity)
}

function closeViewer() {
  viewer.value = null
  nextTick(() => {
    viewerTrigger?.focus()
    viewerTrigger = null
  })
}

function moveViewer(direction: number) {
  if (!viewer.value) return
  const imageCount = viewer.value.activity.images.length
  viewer.value.index = (viewer.value.index + direction + imageCount) % imageCount
}

function trapViewerFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab') return
  const controls = Array.from(viewerDialog.value?.querySelectorAll<HTMLElement>('button:not([disabled])') ?? [])
  const first = controls[0]
  const last = controls.at(-1)
  if (!first || !last) return

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(viewer, (value) => {
  if (!import.meta.client) return
  document.body.classList.toggle('activity-viewer-open', Boolean(value))
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.classList.remove('activity-viewer-open')
})
</script>

<template>
  <div class="activities-page">
    <header class="activities-masthead">
      <div class="site-wrap activities-masthead-shell">
        <div class="activities-masthead-meta" v-reveal>
          <p class="section-label">Inside Global F.O.R</p>
          <span>05 / ACTIVITY JOURNAL</span>
        </div>
        <div class="activities-masthead-copy" v-reveal>
          <h1>Activities<span>.</span></h1>
          <div>
            <span aria-hidden="true" />
            <p>A living journal of learning, preparation, departures and the people connected through our work.</p>
          </div>
        </div>
        <div class="activities-masthead-strip" aria-hidden="true">
          <span>LEARN</span><i>→</i><span>PREPARE</span><i>→</i><span>CONNECT</span><i>→</i><span>GROW</span>
        </div>
      </div>
    </header>

    <section class="activities-stream" aria-labelledby="activities-title">
      <div class="site-wrap">
        <div class="activities-highlights" v-reveal>
          <div class="activities-highlights-head">
            <div><p class="section-label">Browse highlights</p><h2 id="activities-title">Activity stories</h2></div>
            <span>Select a story to jump into the feed <i aria-hidden="true">→</i></span>
          </div>
          <div class="activities-story-track">
            <a v-for="(activity, index) in activityFeed" :key="activity.id" :href="`#activity-${activity.id}`">
              <span class="activities-story-image"><img :src="activity.images[0]?.src" :alt="activity.images[0]?.alt" loading="lazy" decoding="async"><i>{{ String(index + 1).padStart(2, '0') }}</i></span>
              <strong>Activity story</strong>
              <small>{{ activity.title }}</small>
            </a>
          </div>
        </div>

        <div class="activities-social-layout">
          <aside class="activities-profile">
            <div class="activities-profile-card">
              <div class="activities-profile-brand"><span><img :src="company.logoUrl" alt=""></span><div><strong>{{ company.shortName.toUpperCase() }}</strong><small>{{ company.name.slice(company.shortName.length).trim().toUpperCase() }}</small></div></div>
              <p>Japanese-language education and overseas employment support, connected through one professional team.</p>
              <dl>
                <div><dt>Based in</dt><dd>Yangon, Myanmar</dd></div>
                <div><dt>Licence</dt><dd>No. 95/2022</dd></div>
              </dl>
            </div>

          </aside>

          <div class="activities-feed" aria-live="polite" aria-atomic="false">
            <header class="activities-feed-head">
              <div><span aria-hidden="true"><i /><i /><i /></span><div><strong>Activity feed</strong><small>Official company gallery updates</small></div></div>
              <span>{{ activityFeed.length }} {{ activityFeed.length === 1 ? 'post' : 'posts' }}</span>
            </header>

            <div v-if="usingFallback" class="activities-api-note" role="status">
              <span aria-hidden="true" />
              <p><strong>Showing the verified company gallery.</strong> Fresh updates will return when the content service reconnects.</p>
              <button type="button" @click="retryFeed()">Retry</button>
            </div>

            <div v-if="feedStatus === 'pending' && activityFeed.length === 0" class="activities-feed-state" role="status">Loading activities…</div>

            <div v-else-if="activityFeed.length === 0" class="activities-feed-state">
              <strong>No published activities yet.</strong><span>Please check back for new company stories.</span>
            </div>

            <ActivityPost
              v-for="(activity, index) in activityFeed"
              :key="activity.id"
              :activity="activity"
              :index="index"
              @select-image="openViewer"
            />

            <div v-if="nextCursor || loadMoreError" class="activities-load-more">
              <p v-if="loadMoreError" role="alert">{{ loadMoreError }}</p>
              <button v-if="nextCursor" type="button" :disabled="loadMorePending" @click="loadMoreActivities">{{ loadMorePending ? 'Loading…' : 'Load more activities' }} <span aria-hidden="true">↓</span></button>
            </div>

            <div class="activities-feed-end" v-reveal>
              <span aria-hidden="true" />
              <div><small>YOU’RE UP TO DATE</small><p>More verified activities can be added as company updates become available.</p></div>
            </div>
          </div>

          <aside class="activities-discovery">
            <div class="activities-discovery-card">
              <div><span>Gallery picks</span><small>Open a collection</small></div>
              <div class="activities-discovery-grid">
                <button v-for="activity in activityFeed.slice(0, 3)" :key="activity.id" type="button" :aria-label="`Open ${activity.title} gallery`" @click="openActivityCover(activity)"><img :src="activity.images[0]?.src" :alt="activity.images[0]?.alt" loading="lazy" decoding="async"></button>
              </div>
            </div>

            <div class="activities-connect-card">
              <span>Continue the conversation</span>
              <p>Visit the company’s Facebook page for its external social presence.</p>
              <a :href="company.facebookUrl" target="_blank" rel="noopener noreferrer"><span>Facebook</span><i aria-hidden="true">↗</i></a>
            </div>

            <div class="activities-note-card"><small>CONTENT NOTE</small><p>Dates will appear after the source information is verified with the client.</p></div>
          </aside>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="activity-viewer">
        <div
          v-if="viewer && currentImage"
          ref="viewerDialog"
          class="activity-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="activity-viewer-caption"
          tabindex="-1"
          @keydown.esc="closeViewer"
          @keydown.left="moveViewer(-1)"
          @keydown.right="moveViewer(1)"
          @keydown.tab="trapViewerFocus"
        >
          <button type="button" class="activity-lightbox-close" aria-label="Close image viewer" @click="closeViewer">Close <span aria-hidden="true">×</span></button>
          <button
            v-if="viewer.activity.images.length > 1"
            type="button"
            class="activity-lightbox-nav activity-lightbox-nav--previous"
            aria-label="Previous image"
            @click="moveViewer(-1)"
          >
            ←
          </button>

          <figure>
            <img :src="currentImage.src" :alt="currentImage.alt">
            <figcaption id="activity-viewer-caption">
              <span>{{ viewer.activity.title }}</span>
              <small>{{ viewer.index + 1 }} / {{ viewer.activity.images.length }}</small>
            </figcaption>
          </figure>

          <button
            v-if="viewer.activity.images.length > 1"
            type="button"
            class="activity-lightbox-nav activity-lightbox-nav--next"
            aria-label="Next image"
            @click="moveViewer(1)"
          >
            →
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.activities-masthead {
  position: relative;
  overflow: hidden;
  background: var(--ink);
  color: white;
}

.activities-masthead::before,
.activities-masthead::after {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, .13);
  border-radius: 50%;
  content: '';
}

.activities-masthead::before { top: -18rem; right: -10rem; width: 36rem; height: 36rem; }
.activities-masthead::after { right: 14%; bottom: -13rem; width: 22rem; height: 22rem; border-color: color-mix(in srgb, var(--green) 45%, transparent); }
.activities-masthead-shell { position: relative; z-index: 1; padding-block: 4rem 2rem; }
.activities-masthead-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.activities-masthead-meta :deep(.section-label) { color: white; }
.activities-masthead-meta > span { color: rgba(255, 255, 255, .55); font-size: .56rem; font-weight: 700; letter-spacing: .14em; }
.activities-masthead-copy { display: grid; gap: 2rem; align-items: end; margin-top: 3.5rem; }
.activities-masthead-copy h1 { margin: 0; font-family: Manrope, sans-serif; font-size: clamp(4rem, 16vw, 9.5rem); font-weight: 500; letter-spacing: -.085em; line-height: .82; }
.activities-masthead-copy h1 span { color: var(--green); }
.activities-masthead-copy > div { display: grid; grid-template-columns: 2.75rem 1fr; gap: 1rem; align-items: start; }
.activities-masthead-copy > div > span { height: 1px; margin-top: .7rem; background: var(--green); }
.activities-masthead-copy p { max-width: 34rem; margin: 0; color: rgba(255, 255, 255, .68); font-size: .86rem; line-height: 1.8; }
.activities-masthead-strip { display: flex; align-items: center; gap: .8rem; margin-top: 3rem; border-top: 1px solid rgba(255, 255, 255, .18); padding-top: 1.25rem; overflow: hidden; color: rgba(255, 255, 255, .58); font-size: .53rem; font-weight: 700; letter-spacing: .15em; white-space: nowrap; }
.activities-masthead-strip i { color: var(--green); font-style: normal; }

.activities-stream {
  padding-block: 4.5rem 6rem;
  background:
    radial-gradient(circle at 8% 3%, color-mix(in srgb, var(--green) 8%, transparent), transparent 19rem),
    #f3f5f1;
}

.activities-highlights { margin-bottom: 3rem; }
.activities-highlights-head { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 1.5rem; }
.activities-highlights-head h2 { margin: .75rem 0 0; font-family: Manrope, sans-serif; font-size: clamp(2.2rem, 7vw, 4rem); font-weight: 500; letter-spacing: -.065em; line-height: .95; }
.activities-highlights-head > span { display: none; max-width: 18rem; color: var(--muted); font-size: .6rem; line-height: 1.6; text-align: right; }
.activities-highlights-head > span i { margin-left: .35rem; color: var(--green); font-style: normal; }

.activities-story-track { display: grid; grid-auto-columns: minmax(9rem, 10rem); grid-auto-flow: column; gap: 1rem; overflow-x: auto; padding: .2rem .15rem 1rem; scroll-snap-type: x proximity; scrollbar-color: color-mix(in srgb, var(--green) 45%, var(--line)) transparent; }
.activities-story-track a { min-width: 0; color: var(--ink); text-decoration: none; scroll-snap-align: start; }
.activities-story-image { position: relative; display: block; height: 11.5rem; overflow: hidden; border: 3px solid white; border-radius: 1.2rem; background: var(--line); box-shadow: 0 0 0 2px color-mix(in srgb, var(--green) 65%, var(--line)), 0 .9rem 2rem rgba(16, 36, 43, .09); }
.activities-story-image::after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(5, 27, 34, .42)); content: ''; }
.activities-story-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s var(--ease); }
.activities-story-image i { position: absolute; z-index: 1; right: .55rem; bottom: .55rem; display: grid; width: 2rem; height: 2rem; place-items: center; border: 1px solid rgba(255, 255, 255, .75); border-radius: 50%; background: rgba(5, 27, 34, .42); color: white; font-family: Georgia, serif; font-size: .63rem; font-style: normal; }
.activities-story-track strong { display: block; margin-top: .85rem; color: var(--green); font-size: .49rem; letter-spacing: .1em; text-transform: uppercase; }
.activities-story-track small { display: -webkit-box; overflow: hidden; margin-top: .3rem; font-size: .62rem; font-weight: 650; line-height: 1.4; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }

.activities-social-layout { display: grid; gap: 1.5rem; align-items: start; }
.activities-profile,
.activities-discovery { display: grid; min-width: 0; gap: 1rem; }
.activities-profile-card,
.activities-discovery-card,
.activities-connect-card,
.activities-note-card,
.activities-feed-head,
.activities-feed-end { border: 1px solid var(--line); border-radius: 1.2rem; background: rgba(255, 255, 255, .88); box-shadow: 0 .8rem 2rem rgba(16, 36, 43, .045); }

.activities-profile-card { padding: 1.25rem; }
.activities-profile-brand { display: flex; align-items: center; gap: .75rem; }
.activities-profile-brand > span { display: grid; width: 3rem; height: 3rem; place-items: center; overflow: hidden; border: 1px solid var(--line); border-radius: 50%; background: white; }
.activities-profile-brand img { width: 100%; height: 100%; object-fit: cover; }
.activities-profile-brand div { display: grid; gap: .18rem; }
.activities-profile-brand strong { font-size: .69rem; letter-spacing: -.015em; }
.activities-profile-brand small { color: var(--muted); font-size: .46rem; letter-spacing: .18em; }
.activities-profile-card > p { margin: 1.1rem 0; color: var(--muted); font-size: .66rem; line-height: 1.7; }
.activities-profile-card dl { margin: 0; }
.activities-profile-card dl div { display: grid; gap: .2rem; border-top: 1px solid var(--line); padding-block: .8rem; }
.activities-profile-card dl div:last-child { padding-bottom: 0; }
.activities-profile-card dt { color: var(--muted); font-size: .48rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.activities-profile-card dd { margin: 0; font-size: .62rem; font-weight: 650; }

.activities-feed { display: grid; min-width: 0; gap: 1.5rem; }
.activities-api-note { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .8rem; border: 1px solid color-mix(in srgb, var(--gold) 45%, var(--line)); border-radius: 1rem; padding: .9rem 1rem; background: color-mix(in srgb, var(--gold) 8%, white); }
.activities-api-note > span { width: .5rem; height: .5rem; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 .25rem color-mix(in srgb, var(--gold) 14%, transparent); }
.activities-api-note p { margin: 0; color: var(--muted); font-size: .58rem; line-height: 1.55; }
.activities-api-note strong { color: var(--ink); }
.activities-api-note button { border: 0; border-bottom: 1px solid var(--ink); padding: .2rem 0; background: transparent; color: var(--ink); font-size: .52rem; font-weight: 700; }
.activities-feed-state { display: grid; gap: .45rem; border: 1px dashed var(--line); border-radius: 1rem; padding: 2rem; color: var(--muted); font-size: .68rem; text-align: center; }
.activities-feed-state strong { color: var(--ink); font-family: Manrope, sans-serif; font-size: 1.35rem; font-weight: 500; }
.activities-load-more { display: grid; justify-items: center; gap: .8rem; }
.activities-load-more p { margin: 0; color: var(--orange); font-size: .6rem; }
.activities-load-more button { min-height: 3rem; border: 1px solid var(--ink); border-radius: 999px; padding: .7rem 1.1rem; background: var(--ink); color: white; font-size: .58rem; font-weight: 700; }
.activities-load-more button span { margin-left: .65rem; color: var(--green); }
.activities-load-more button:disabled { opacity: .6; }
.activities-feed-head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem 1.1rem; }
.activities-feed-head > div { display: flex; min-width: 0; align-items: center; gap: .85rem; }
.activities-feed-head > div > span { display: flex; gap: .2rem; }
.activities-feed-head > div > span i { width: .42rem; height: .42rem; border-radius: 50%; background: var(--green); }
.activities-feed-head > div > span i:nth-child(2) { background: var(--blue); }
.activities-feed-head > div > span i:nth-child(3) { background: var(--gold); }
.activities-feed-head > div > div { display: grid; gap: .2rem; }
.activities-feed-head strong { font-size: .67rem; }
.activities-feed-head small { overflow: hidden; color: var(--muted); font-size: .48rem; text-overflow: ellipsis; white-space: nowrap; }
.activities-feed-head > span { flex: 0 0 auto; border-radius: 999px; padding: .4rem .58rem; background: color-mix(in srgb, var(--green) 10%, white); color: color-mix(in srgb, var(--green) 70%, var(--ink)); font-size: .48rem; font-weight: 700; }

.activities-feed-end { display: grid; grid-template-columns: auto 1fr; gap: 1rem; align-items: start; padding: 1.25rem; }
.activities-feed-end > span { width: .58rem; height: .58rem; margin-top: .25rem; border-radius: 50%; background: var(--green); box-shadow: 1rem 0 0 var(--blue), 2rem 0 0 var(--gold); }
.activities-feed-end > div { padding-left: 1.65rem; }
.activities-feed-end small { color: var(--muted); font-size: .49rem; font-weight: 750; letter-spacing: .12em; }
.activities-feed-end p { margin: .45rem 0 0; color: var(--muted); font-size: .66rem; line-height: 1.65; }

.activities-discovery-card,
.activities-connect-card,
.activities-note-card { padding: 1.1rem; }
.activities-discovery-card > div:first-child { display: flex; align-items: end; justify-content: space-between; gap: .75rem; margin-bottom: .85rem; }
.activities-discovery-card > div:first-child span { font-size: .59rem; font-weight: 750; }
.activities-discovery-card > div:first-child small { color: var(--muted); font-size: .45rem; }
.activities-discovery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: .38rem; }
.activities-discovery-grid button { position: relative; aspect-ratio: 1; overflow: hidden; border: 0; border-radius: .65rem; padding: 0; background: var(--line); cursor: zoom-in; }
.activities-discovery-grid img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s var(--ease); }

.activities-connect-card { overflow: hidden; background: var(--ink); color: white; }
.activities-connect-card > span { color: var(--green); font-size: .5rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.activities-connect-card p { margin: .85rem 0 1.1rem; color: rgba(255, 255, 255, .62); font-size: .65rem; line-height: 1.65; }
.activities-connect-card a { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, .18); padding-top: .85rem; color: white; font-size: .61rem; font-weight: 700; text-decoration: none; }
.activities-connect-card a i { display: grid; width: 1.8rem; height: 1.8rem; place-items: center; border: 1px solid rgba(255, 255, 255, .3); border-radius: 50%; color: var(--green); font-style: normal; transition: transform .3s var(--ease); }
.activities-note-card { background: color-mix(in srgb, var(--gold) 11%, white); }
.activities-note-card small { color: color-mix(in srgb, var(--gold) 68%, var(--ink)); font-size: .48rem; font-weight: 750; letter-spacing: .12em; }
.activities-note-card p { margin: .6rem 0 0; color: var(--muted); font-size: .62rem; line-height: 1.65; }

.activity-lightbox {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 4rem 1rem 1rem;
  background: rgba(3, 20, 27, .94);
  outline: none;
}

.activity-lightbox figure { display: grid; max-width: min(72rem, 100%); max-height: calc(100dvh - 6rem); margin: 0; }
.activity-lightbox figure img { width: 100%; max-height: calc(100dvh - 9rem); object-fit: contain; }
.activity-lightbox figcaption { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-top: .85rem; color: white; }
.activity-lightbox figcaption span { font-size: .72rem; }
.activity-lightbox figcaption small { color: rgba(255, 255, 255, .6); font-size: .58rem; letter-spacing: .1em; }
.activity-lightbox-close { position: absolute; top: 1rem; right: 1rem; min-height: 2.75rem; border: 1px solid rgba(255, 255, 255, .3); border-radius: 999px; padding: .6rem 1rem; background: transparent; color: white; font-size: .62rem; text-transform: uppercase; }
.activity-lightbox-close span { margin-left: .6rem; font-size: 1rem; }
.activity-lightbox-nav { position: absolute; top: 50%; display: grid; width: 2.8rem; height: 2.8rem; place-items: center; border: 1px solid rgba(255, 255, 255, .3); border-radius: 50%; background: rgba(3, 20, 27, .6); color: white; font-size: 1rem; }
.activity-lightbox-nav--previous { left: 1rem; }
.activity-lightbox-nav--next { right: 1rem; }
.activity-viewer-enter-active,
.activity-viewer-leave-active { transition: opacity .3s ease; }
.activity-viewer-enter-from,
.activity-viewer-leave-to { opacity: 0; }

@media (min-width: 48rem) {
  .activities-masthead-shell { padding-block: 5rem 2rem; }
  .activities-masthead-copy { grid-template-columns: 1.15fr .85fr; gap: 4rem; margin-top: 4.5rem; }
  .activities-masthead-copy > div { margin-bottom: .6rem; }
  .activities-highlights-head > span { display: block; }
  .activities-story-track { grid-auto-columns: 11rem; }
  .activities-story-image { height: 13.5rem; }
  .activities-discovery { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 64rem) {
  .activities-masthead-shell { padding-block: 6rem 2.25rem; }
  .activities-stream { padding-block: 6.5rem 8rem; }
  .activities-highlights { margin-bottom: 4rem; }
}

@media (min-width: 72rem) {
  .activities-social-layout { grid-template-columns: 13.5rem minmax(0, 1fr) 14.5rem; gap: 1.25rem; }
  .activities-profile,
  .activities-discovery { position: sticky; top: 6.5rem; display: grid; grid-template-columns: 1fr; }
  .activities-discovery-grid { grid-template-columns: repeat(2, 1fr); }
  .activities-discovery-grid button:first-child { grid-column: 1 / -1; aspect-ratio: 1.8; }
}

@media (max-width: 39.99rem) {
  .activity-lightbox-nav { top: auto; bottom: 1rem; }
  .activity-lightbox-nav--previous { left: 1rem; }
  .activity-lightbox-nav--next { right: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .activities-story-image img,
  .activities-discovery-grid img,
  .activities-connect-card a i,
  .activity-viewer-enter-active,
  .activity-viewer-leave-active { transition: none; }
}

@media (hover: hover) {
  .activities-story-track a:hover .activities-story-image img,
  .activities-discovery-grid button:hover img { transform: scale(1.045); }
  .activities-connect-card a:hover i { transform: translate(2px, -2px); }
}
</style>

<style>
body.activity-viewer-open { overflow: hidden; }
</style>
