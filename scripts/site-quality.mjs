import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const root = process.cwd()
const appRoot = join(root, 'app')
const publicRoot = join(root, 'public')
const failures = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

function read(path) {
  return readFileSync(join(root, path), 'utf8')
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name)
    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}

const sourceFiles = listFiles(appRoot).filter(path => ['.ts', '.vue'].includes(extname(path)))
const newsSource = read('app/data/news.ts')
const newsSlugs = [...newsSource.matchAll(/\bslug:\s*'([^']+)'/g)].map(match => match[1])

const expectedRoutes = [
  '/',
  '/about',
  '/services',
  '/team',
  '/activities',
  '/news',
  ...newsSlugs.map(slug => `/news/${slug}`),
  '/contact',
]

const sitemapSource = read('server/routes/sitemap.xml.ts')
const staticPathBlock = sitemapSource.match(/const staticPaths = \[([\s\S]*?)\]/)?.[1] ?? ''
const sitemapPaths = [
  ...staticPathBlock.matchAll(/'([^']+)'/g),
].map(match => match[1])
const sitemapRoutes = [...sitemapPaths, ...newsSlugs.map(slug => `/news/${slug}`)]
const expectedSet = new Set(expectedRoutes)
const sitemapSet = new Set(sitemapRoutes)

check(sitemapRoutes.length === sitemapSet.size, 'Sitemap contains duplicate routes.')
for (const route of expectedSet) check(sitemapSet.has(route), `Sitemap is missing ${route}.`)
for (const route of sitemapSet) check(expectedSet.has(route), `Sitemap contains an unknown route: ${route}.`)
check(sitemapSource.includes('/api/v1/news'), 'Sitemap must load published News routes from the public API.')
check(sitemapSource.includes('lastmod'), 'Sitemap must expose modification dates for managed News entries.')
check(sitemapSource.includes('escapeXml'), 'Sitemap output must XML-escape dynamic values.')
check(sitemapSource.includes('application/xml'), 'Sitemap must return an XML content type.')
check(!existsSync(join(publicRoot, 'sitemap.xml')), 'The obsolete static sitemap must not shadow the dynamic sitemap route.')

const robots = read('public/robots.txt')
check(/User-Agent:\s*\*/i.test(robots), 'robots.txt must include a rule for every crawler.')
check(/Allow:\s*\//i.test(robots), 'robots.txt must allow the public site.')
check(/Sitemap:\s*https:\/\/globalformm\.com\/sitemap\.xml/i.test(robots), 'robots.txt must reference the production sitemap.')

const routePages = [
  'app/pages/index.vue',
  'app/pages/about.vue',
  'app/pages/services.vue',
  'app/pages/team.vue',
  'app/pages/activities/index.vue',
  'app/pages/news/index.vue',
  'app/pages/news/[slug].vue',
  'app/pages/contact.vue',
]

for (const page of routePages) {
  const source = read(page)
  check(source.includes('usePageSeo({'), `${page} is missing the shared SEO metadata helper.`)
  check(source.includes('<h1') || source.includes('<PageIntro'), `${page} is missing a primary heading.`)
}

for (const file of sourceFiles.filter(path => extname(path) === '.vue')) {
  const source = readFileSync(file, 'utf8')
  const displayPath = relative(root, file).replaceAll('\\', '/')
  const imageTags = source.match(/<img\b[\s\S]*?>/g) ?? []
  for (const tag of imageTags) {
    check(/\s:?(?:v-bind:)?alt\s*=/.test(tag), `${displayPath} contains an image without an alt attribute.`)
  }

  const newTabLinks = source.match(/<a\b[\s\S]*?target="_blank"[\s\S]*?>/g) ?? []
  for (const tag of newTabLinks) {
    check(/rel="[^"]*noopener[^"]*"/.test(tag), `${displayPath} opens a new tab without rel="noopener".`)
    check(/rel="[^"]*noreferrer[^"]*"/.test(tag), `${displayPath} opens a new tab without rel="noreferrer".`)
  }
}

const allSource = sourceFiles.map(path => readFileSync(path, 'utf8')).join('\n')
const imageReferences = new Set([...allSource.matchAll(/['"`]\/images\/([^'"`?#]+)['"`]/g)].map(match => match[1]))
for (const image of imageReferences) {
  check(existsSync(join(publicRoot, 'images', image)), `Referenced image does not exist: /images/${image}`)
}

const imageFiles = listFiles(join(publicRoot, 'images'))
const oversizedImages = imageFiles.filter(path => statSync(path).size > 500 * 1024)
for (const image of oversizedImages) {
  check(false, `${relative(publicRoot, image).replaceAll('\\', '/')} exceeds the 500 KB source-image budget.`)
}

check(read('app/app.vue').includes('application/ld+json'), 'Global Organization/LocalBusiness structured data is missing.')
check(read('app/error.vue').includes("robots: 'noindex, nofollow'"), 'The error page must be excluded from indexing.')
check(read('app/composables/usePageSeo.ts').includes('datePublished'), 'Article publication dates are missing from structured data.')
check(read('app/composables/usePageSeo.ts').includes('articlePublishedTime'), 'Open Graph article publication dates are missing.')

if (failures.length) {
  console.error(`Site quality check failed with ${failures.length} issue${failures.length === 1 ? '' : 's'}:`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Site quality check passed: ${expectedRoutes.length} fallback routes plus API-managed News sitemap discovery, ${imageReferences.size} image references, ${imageFiles.length} budgeted image files, SEO metadata, structured data, headings, robots and link safety.`)
