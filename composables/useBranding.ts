/**
 * Branding, as the operator set it in the admin panel.
 *
 * Whoever buys SmartDesk runs it under their own name. Until this existed the public site was
 * hard-coded — its footer said RazinSoft, it wrote to our support address and linked our social
 * accounts — so rebranding meant editing Vue files and rebuilding.
 */
export type Branding = {
  product: string
  tagline: string
  logo: string | null
  icon: string | null
  primary: string
  company_name: string
  support_email: string
  phone: string | null
  website_url: string
  address: string | null
  header: { cta_label: string; cta_url: string }
  footer: { about: string; note: string | null }
  login: { heading: string; subheading: string }
  social: Record<string, string>
}

/** What the site shows if the API is unreachable — never a blank header. */
const FALLBACK: Branding = {
  product: 'SmartDesk',
  tagline: 'The business hub for growing teams',
  logo: null,
  icon: null,
  primary: '#2563eb',
  company_name: 'RazinSoft',
  support_email: 'support@razinsoft.com',
  phone: null,
  website_url: 'https://www.razinsoft.com',
  address: null,
  header: { cta_label: 'Get Started', cta_url: '/#pricing' },
  footer: { about: 'The business hub for growing teams', note: null },
  login: { heading: 'Welcome back', subheading: 'Sign in to your account.' },
  social: {},
}

export function useBranding() {
  const { $api } = useNuxtApp()

  // Called unconditionally and with a fixed key: Nuxt dedupes across every component that asks,
  // so the header, footer and login screens share one request and one answer. Guarding it behind
  // an `if` — which an earlier version did — means the composable is skipped on some renders and
  // the page keeps the fallback for ever.
  const { data } = useAsyncData<Branding>('branding', () => $api<Branding>('/branding'), {
    default: () => FALLBACK,
  })

  // Merged over the fallback so a field the API omits still has something behind it.
  return computed<Branding>(() => ({
    ...FALLBACK,
    ...(data.value || {}),
    header: { ...FALLBACK.header, ...(data.value?.header || {}) },
    footer: { ...FALLBACK.footer, ...(data.value?.footer || {}) },
    login: { ...FALLBACK.login, ...(data.value?.login || {}) },
    social: data.value?.social || FALLBACK.social,
  }))
}
