import { defaultCompany, type CompanySettings } from '~/data/site'

export interface SiteSettingsApiItem {
  companyName: string
  phone: string
  email: string
  address: string
  facebookUrl: string
  logoUrl?: string
}

export function useCompany(): CompanySettings {
  return useState<CompanySettings>('company-settings', () => ({ ...defaultCompany })).value
}

export function applySiteSettings(company: CompanySettings, settings: SiteSettingsApiItem): void {
  const telephone = settings.phone.replace(/[^\d+]/g, '')

  Object.assign(company, {
    name: settings.companyName,
    shortName: settings.companyName.replace(/\s+Co\.?[,]?\s*Ltd\.?$/i, '').trim(),
    phoneDisplay: settings.phone,
    phoneHref: `tel:${telephone}`,
    email: settings.email,
    emailHref: `mailto:${settings.email}`,
    address: settings.address,
    facebookUrl: settings.facebookUrl,
    logoUrl: settings.logoUrl || defaultCompany.logoUrl,
  })
}
