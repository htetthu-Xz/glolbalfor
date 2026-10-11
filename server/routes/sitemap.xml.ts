import { newsItems, type NewsApiItem } from '../../app/data/news'

interface NewsPageResponse {
  data: NewsApiItem[]
  meta?: {
    current_page?: number
    last_page?: number
  }
}

const staticPaths = [
  '/',
  '/about',
  '/services',
  '/team',
  '/activities',
  '/news',
  '/contact',
]

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
  const apiBase = String(config.public.apiBase).replace(/\/$/, '')
  const entries = new Map<string, string | undefined>()

  for (const path of staticPaths) entries.set(path, undefined)
  for (const item of newsItems) entries.set(`/news/${item.slug}`, item.updatedAt || item.publishedAt)

  try {
    let page = 1
    let lastPage = 1

    do {
      const response = await $fetch<NewsPageResponse>(`${apiBase}/api/v1/news`, {
        query: { page },
      })

      for (const item of response.data) {
        entries.set(`/news/${item.slug}`, item.updatedAt || item.publishedAt)
      }

      lastPage = Math.min(response.meta?.last_page || page, 100)
      page += 1
    } while (page <= lastPage)
  }
  catch {
    // The verified evergreen News routes remain discoverable when the API is
    // temporarily unavailable. A later crawler request will retry the API.
  }

  const urls = [...entries]
    .map(([path, lastModified]) => {
      const location = escapeXml(`${siteUrl}${path}`)
      const lastmod = lastModified ? `<lastmod>${escapeXml(lastModified)}</lastmod>` : ''
      return `  <url><loc>${location}</loc>${lastmod}</url>`
    })
    .join('\n')

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setResponseHeader(event, 'cache-control', 'public, max-age=300, s-maxage=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
})
