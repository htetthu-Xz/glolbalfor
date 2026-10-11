export interface NavigationItem {
  label: string
  to: string
}

export const navigation: NavigationItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Our Members', to: '/team' },
  { label: 'About', to: '/about' },
  { label: 'Activities', to: '/activities' },
  { label: 'Latest News', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

export interface CompanySettings {
  name: string
  shortName: string
  licence: string
  phoneDisplay: string
  phoneHref: string
  email: string
  emailHref: string
  hours: readonly string[]
  address: string
  languageCenterAddress: string
  visitUrl: string
  facebookUrl: string
  languageCenterUrl: string
  logoUrl: string
}

export const defaultCompany: CompanySettings = {
  name: 'Global F.O.R Co., Ltd.',
  shortName: 'Global F.O.R',
  licence: 'HR Licence No. 95/2022',
  phoneDisplay: '+95 9 261 880 062',
  phoneHref: 'tel:+959261880062',
  email: 'admin@globalformm.com',
  emailHref: 'mailto:admin@globalformm.com',
  hours: ['Monday to Saturday 9AM–5PM', 'Public Holiday & Sunday Closed'],
  address: 'Room No(6-D)/6th Floor/Pannita Mini Condo(Shwe Myanmar Mya Condo)/Pannita Street/ No.(7)Block/ Hlaing Township, Yangon, Myanmar, 11051',
  languageCenterAddress: 'Room C/D, 6th Floor, No. 11, Pannita Street, Ward [7], Hlaing Township, Yangon, Myanmar.',
  visitUrl: 'https://www.google.com/maps/search/?api=1&query=16.844479%2C96.123240',
  facebookUrl: 'https://www.facebook.com/share/1GAKsJK5A4/',
  languageCenterUrl: 'https://www.facebook.com/globalforjapaneselanguageschool/',
  logoUrl: '/images/global-for-logo.jpg',
}

export const courses = [
  'Japanese Language Level N5',
  'Japanese Language Level N4',
  'Japanese Language Level N3',
  'Japanese Language Level N2',
  'Tokutei Kaigo Class',
  'Tokutei Inshoku Class',
  'Tokutei Truck Driver Class',
  'Interview Training Class',
] as const

export const teamMembers = [
  { name: 'Htut Soe Aung', title: 'Managing Director', image: '/images/team-portrait.jpg' },
  { name: 'Soe Yu Mon', title: 'Director', image: '/images/team-soe-yu-mon.jpg' },
  { name: 'Wai Phyo Han', title: 'Director', image: '/images/team-wai-phyo-han.jpg' },
  { name: 'Poe Ei Ei Htwe', title: 'Director', image: '/images/team-poe-ei-ei-htwe.jpg' },
  { name: 'Thiha Soe', title: 'Director', image: '/images/team-thiha-soe.jpg' },
  { name: 'Marlar Aung', title: 'Assistant Accountant', image: '/images/team-marlar-aung.jpg' },
  { name: 'Aye Mi San', title: 'Office - Admin Executive', image: '/images/team-aye-mi-san.jpg' },
  { name: 'Yan Paing Soe', title: 'Senior Coordinator', image: '/images/team-yan-paing-soe.jpg' },
  { name: 'Mi Kyal Non', title: 'Coordinator', image: '/images/team-mi-kyal-non.jpg' },
  { name: 'May Zun Oo', title: 'School - Admin Executive', image: '/images/team-may-zun-oo.jpg' },
] as const
