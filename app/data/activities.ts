export interface ActivityImage {
  src: string
  alt: string
}

export interface ActivityItem {
  id: string
  title: string
  body: string
  sourceLabel: string
  publishedAt?: string | null
  images: ActivityImage[]
}

export interface ActivityApiItem {
  id: number
  title: string
  body: string
  publishedAt: string | null
  images: Array<{
    id: number
    position: number
    altText: string
    url: string
    width: number
    height: number
  }>
}

export function mapActivityFromApi(activity: ActivityApiItem): ActivityItem {
  return {
    id: String(activity.id),
    title: activity.title,
    body: activity.body,
    sourceLabel: 'Company update',
    publishedAt: activity.publishedAt,
    images: activity.images.map(image => ({ src: image.url, alt: image.altText })),
  }
}

/**
 * Static Phase 1 feed. The shape intentionally mirrors the planned Activities
 * API so the page can switch data sources without rewriting its components.
 * Dates are omitted until the client verifies when each supplied image was made.
 */
export const activities: ActivityItem[] = [
  {
    id: 'learning-together',
    title: 'Learning together at our training centre',
    body: 'A look inside the Global F.O.R learning environment, with classroom study, shared exercises and students working toward their next step.',
    sourceLabel: 'Company gallery',
    images: [
      { src: '/images/training-class.jpg', alt: 'Students attending a classroom lesson at Global F.O.R' },
      { src: '/images/student-activity.jpg', alt: 'Global F.O.R students taking part in a learning activity' },
      { src: '/images/students-group.jpg', alt: 'A group of students at the Global F.O.R training centre' },
    ],
  },
  {
    id: 'preparing-for-departure',
    title: 'Preparing for the journey ahead',
    body: 'Candidate support connects preparation in Myanmar with overseas employment opportunities. These company photographs document people reaching an important stage in that journey.',
    sourceLabel: 'Company gallery',
    images: [
      { src: '/images/departure-luggage-group.jpg', alt: 'Candidates gathered with their luggage before departure' },
      { src: '/images/airport-departure.jpg', alt: 'Global F.O.R candidates gathered at the airport' },
      { src: '/images/departure-passports-4.jpg', alt: 'Candidates holding travel documents before departure' },
    ],
  },
  {
    id: 'company-community',
    title: 'People, connection and community',
    body: 'Global F.O.R is built around the people who learn, prepare and work together. Moments from the company gallery reflect the relationships behind that work.',
    sourceLabel: 'Company gallery',
    images: [
      { src: '/images/company-community-group.jpg', alt: 'Global F.O.R community members gathered for a group photograph' },
      { src: '/images/members-gallery-01.jpg', alt: 'Global F.O.R team and community gathering' },
    ],
  },
  {
    id: 'sharing-information',
    title: 'Sharing information face to face',
    body: 'Seminars and in-person conversations help students and candidates understand the available learning and employment pathways.',
    sourceLabel: 'Company gallery',
    images: [
      { src: '/images/services-seminar.jpg', alt: 'An information seminar presented to Global F.O.R attendees' },
    ],
  },
]
