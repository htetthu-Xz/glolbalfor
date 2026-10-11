interface PageSeoInput {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  datePublished?: string
  dateModified?: string
}

export function usePageSeo({
  title,
  description,
  path,
  image = '/images/company-community-group.jpg',
  imageAlt = 'Global F.O.R community in Yangon, Myanmar',
  type = 'website',
  datePublished,
  dateModified,
}: PageSeoInput) {
  const config = useRuntimeConfig()
  const company = useCompany()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')
  const canonical = `${siteUrl}${path}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`
  const fullTitle = `${title} | ${company.name}`
  const schemaType = type === 'article' ? 'Article' : 'WebPage'

  useSeoMeta({
    title,
    description,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: type,
    ogUrl: canonical,
    ogSiteName: company.name,
    ogImage: imageUrl,
    ogImageAlt: imageAlt,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: imageUrl,
    twitterImageAlt: imageAlt,
    articlePublishedTime: type === 'article' ? datePublished : undefined,
    articleModifiedTime: type === 'article' ? dateModified : undefined,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical }],
    script: [
      {
        key: 'page-structured-data',
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaType,
          '@id': `${canonical}#${type === 'article' ? 'article' : 'webpage'}`,
          url: canonical,
          name: fullTitle,
          headline: type === 'article' ? title : undefined,
          datePublished: type === 'article' ? datePublished : undefined,
          dateModified: type === 'article' ? (dateModified || datePublished) : undefined,
          description,
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
          },
          isPartOf: { '@id': `${siteUrl}/#website` },
          about: { '@id': `${siteUrl}/#organization` },
          publisher: { '@id': `${siteUrl}/#organization` },
          author: type === 'article' ? { '@id': `${siteUrl}/#organization` } : undefined,
          mainEntityOfPage: type === 'article' ? { '@type': 'WebPage', '@id': canonical } : undefined,
          inLanguage: 'en',
        }),
      },
    ],
  })
}
