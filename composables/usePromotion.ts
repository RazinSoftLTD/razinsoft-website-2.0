/** The site-wide Top Banner (shown above the nav) and Popup (shown once per page load). */
export interface TopBanner {
  image: string
  /** Optional 6:1 phone artwork; null = phones use the wide `image`. */
  mobile_image: string | null
  /** Fills the strip either side of the container-width artwork on wide screens. */
  bg_color: string | null
  ends_at: string | null
  countdown_enabled: boolean
  /** null/blank = admin deliberately cleared the title; hide it, don't fall back to default text. */
  countdown_label: string | null
  countdown_title_color: string
  countdown_value_color: string
}
export interface PromoPopup {
  image: string
}
/** The offer panel inside the Products menu — written in Marketing › Promotion. */
export interface MenuOffer {
  eyebrow: string | null
  headline: string | null
  value: string | null
  subtext: string | null
  cta_label: string | null
  cta_url: string | null
  points: { title: string; desc: string | null }[]
}
export interface PromotionData {
  top_banner: TopBanner | null
  popup: PromoPopup | null
  menu_offer: MenuOffer | null
}

/**
 * Fetch of the currently live Top Banner + Popup — client-only (`server: false`).
 * Pages using the default layout carry a `swr` cache (see nuxt.config.ts routeRules), so an
 * SSR-fetched promo would get baked into that cached HTML and keep showing (or hiding) stale
 * publish/unpublish state for the whole cache window. Fetching after hydration instead means
 * every page view always reflects the current admin state, regardless of page-cache age.
 */
export function usePromotion() {
  const { $api } = useNuxtApp()
  return useAsyncData(
    'promotion-active',
    () => $api<{ data: PromotionData }>('/promotion/active'),
    {
      server: false,
      transform: (res) => res.data ?? { top_banner: null, popup: null, menu_offer: null },
      default: () => ({ top_banner: null, popup: null, menu_offer: null }) as PromotionData,
    },
  )
}
