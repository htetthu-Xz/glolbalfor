export interface NewsSection {
  title: string
  paragraphs?: string[]
  items?: string[]
}

export interface NewsItem {
  slug: string
  category: string
  eyebrow: string
  title: string
  summary: string
  publishedAt?: string
  updatedAt?: string
  coverImage: string
  coverAlt: string
  sections: NewsSection[]
  action: {
    label: string
    to: string
  }
}

export interface NewsApiItem {
  slug: string
  title: string
  body: string
  publishedAt: string
  updatedAt?: string
  showOnHomepage: boolean
  cover?: {
    url: string
    altText?: string | null
  }
}

export interface NewsApiResponse {
  data: NewsApiItem[]
}

export function mapNewsApiItem(item: NewsApiItem): NewsItem {
  const paragraphs = item.body
    .split(/\r?\n\s*\r?\n/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
  const summarySource = paragraphs[0] || item.body.trim()
  const summary = summarySource.length > 180 ? `${summarySource.slice(0, 177).trimEnd()}…` : summarySource
  const published = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(item.publishedAt))

  return {
    slug: item.slug,
    category: 'Company update',
    eyebrow: published,
    title: item.title,
    summary,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    coverImage: item.cover?.url || '/images/company-community-group.jpg',
    coverAlt: item.cover?.altText || '',
    sections: [{ title: 'The update', paragraphs }],
    action: { label: 'Contact our team', to: '/contact' },
  }
}

/**
 * These are evergreen information stories assembled from verified company
 * content. Client-supplied dated announcements can replace or extend this
 * collection when the publishing workflow is connected.
 */
export const newsItems: NewsItem[] = [
  {
    slug: 'japanese-language-learning-paths',
    category: 'Course guide',
    eyebrow: 'Learn with Global F.O.R',
    title: 'Japanese-language learning paths at our Yangon centre',
    summary: 'An overview of the language levels, skills classes and interview preparation currently listed by Global F.O.R.',
    coverImage: '/images/training-class.jpg',
    coverAlt: 'Students attending a Global F.O.R Japanese-language training class',
    sections: [
      {
        title: 'A pathway built around practical goals',
        paragraphs: [
          'Global F.O.R has operated a Japanese-language school and training centre since 2014. Its learning paths support people preparing for study, employment and professional Japanese-language use.',
          'Course selection should be confirmed directly with the school team so that current schedules, entry requirements and availability can be explained accurately.',
        ],
      },
      {
        title: 'Courses currently listed',
        items: [
          'Japanese Language Levels N5, N4, N3 and N2',
          'Tokutei Kaigo Class',
          'Tokutei Inshoku Class',
          'Tokutei Truck Driver Class',
          'Interview Training Class',
        ],
      },
    ],
    action: { label: 'Explore language services', to: '/services#language-school' },
  },
  {
    slug: 'overseas-employment-support',
    category: 'Service guide',
    eyebrow: 'Prepare for opportunity',
    title: 'Overseas employment support for Japan and Singapore',
    summary: 'How Global F.O.R connects preparation in Myanmar with international employment opportunities and partner needs.',
    coverImage: '/images/airport-departure.jpg',
    coverAlt: 'Global F.O.R candidates preparing for an international departure',
    sections: [
      {
        title: 'One connected support team',
        paragraphs: [
          'Global F.O.R supports candidates exploring employment opportunities in Japan and Singapore, with preparation focused on language, skills and the expectations of international workplaces.',
          'The company also works with supervising organisations and employers to help connect candidate preparation with the needs of both sides.',
        ],
      },
      {
        title: 'Start with a direct conversation',
        paragraphs: [
          'Employment programmes, eligibility and available opportunities can change. Contact the Global F.O.R team for current, verified guidance before making plans or submitting documents.',
        ],
      },
    ],
    action: { label: 'View employment services', to: '/services#employment' },
  },
  {
    slug: 'contact-global-for-yangon',
    category: 'Company information',
    eyebrow: 'Plan a conversation',
    title: 'How to contact and visit Global F.O.R in Yangon',
    summary: 'Telephone, email, office hours and directions for course, employment and business enquiries.',
    coverImage: '/images/company-conversation.jpg',
    coverAlt: 'A business conversation with the Global F.O.R team',
    sections: [
      {
        title: 'Choose the contact route that suits you',
        paragraphs: [
          'The Global F.O.R team can be reached by telephone or email for Japanese-language course questions, overseas employment enquiries, business discussions and office appointments.',
          'The office is in Hlaing Township, Yangon. Visitors should contact the team before travelling to confirm the most suitable appointment time.',
        ],
      },
      {
        title: 'Office availability',
        items: [
          'Monday to Saturday, 9AM–5PM',
          'Closed on Sunday and public holidays',
          'Directions and the complete written address are available on the Contact page',
        ],
      },
    ],
    action: { label: 'Open contact information', to: '/contact' },
  },
]

export function getNewsItem(slug: string) {
  return newsItems.find(item => item.slug === slug)
}
