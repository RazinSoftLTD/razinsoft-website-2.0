/** The site-wide Top Banner (shown above the nav) and Popup (shown once per page load). */
export interface TopBanner {
  image: string
  ends_at: string | null
}
export interface PromoPopup {
  image: string
}
export interface PromotionData {
  top_banner: TopBanner | null
  popup: PromoPopup | null
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
      transform: (res) => res.data ?? { top_banner: null, popup: null },
      default: () => ({ top_banner: null, popup: null }) as PromotionData,
    },
  )
}
