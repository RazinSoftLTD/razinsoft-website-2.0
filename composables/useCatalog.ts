/** Raw product as returned by the lean Laravel API list endpoint. */
export interface ApiProduct {
  id: number
  slug: string
  name: string
  tagline: string
  category?: string
  badge?: string | null
  version: string
  rating: number
  reviews_count: number
  sales_count: number
  thumbnail?: string | null
  // Products have no direct price — the card shows the first plan's price.
  from_price?: number | null
  from_plan?: { id: number; name: string; price: number } | null
  // Present only while the product has an active offer (see Product::hasActiveOffer on the backend).
  sale_from_price?: number | null
  percent_off?: number | null
}

/** Card-ready product shape used by ProductCard, the listing and the home grid. */
export interface CardProduct {
  slug: string
  name: string
  tagline: string
  version: string
  /** First plan's price (what the card shows). Original price when an offer is active. */
  price: number
  /** Discounted price while an offer is active, else null. */
  salePrice: number | null
  /** Percent-off for the badge (e.g. 50), else null. */
  percentOff: number | null
  planId: number | null
  planName: string | null
  rating: number
  reviews: number
  sales: number
  badge?: 'Best Seller' | 'New' | 'Free'
  image: string
  imageWidth: number
  imageHeight: number
  category?: string
}

/** Map a lean API product into the card shape. */
export function toCardProduct(p: ApiProduct): CardProduct {
  const allowed = ['Best Seller', 'New', 'Free']
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    version: p.version,
    price: Number(p.from_price ?? p.from_plan?.price ?? 0),
    salePrice: p.sale_from_price != null ? Number(p.sale_from_price) : null,
    percentOff: p.percent_off != null ? Number(p.percent_off) : null,
    planId: p.from_plan?.id ?? null,
    planName: p.from_plan?.name ?? null,
    rating: Number(p.rating),
    reviews: p.reviews_count ?? 0,
    sales: p.sales_count ?? 0,
    badge: (p.badge && allowed.includes(p.badge) ? p.badge : undefined) as CardProduct['badge'],
    // API thumbnail (Laravel /storage) is the source of truth; fall back to the self-hosted asset.
    image: p.thumbnail || `/images/products/${p.slug}.jpg`,
    imageWidth: 900,
    imageHeight: 600,
    category: p.category,
  }
}

/**
 * SSR-safe fetch of the whole product catalogue (lean list).
 *
 * Every page of it. The API paginates at 12 and caps per_page at 48, so asking once returned the
 * first twelve — which looked fine right up until the thirteenth product was published and simply
 * never appeared on /products. The page filters and sorts client-side, so it needs the full set.
 */
export function useProducts() {
  const { $api } = useNuxtApp()
  return useAsyncData('products', async () => {
    const first = await $api<{ data: ApiProduct[]; meta?: { last_page?: number; per_page?: number } }>('/products?per_page=48')
    const lastPage = first.meta?.last_page ?? 1
    if (lastPage <= 1) return first

    const rest = await Promise.all(
      Array.from({ length: lastPage - 1 }, (_, i) =>
        $api<{ data: ApiProduct[] }>(`/products?per_page=48&page=${i + 2}`)),
    )

    return { data: [...(first.data ?? []), ...rest.flatMap((r) => r.data ?? [])] }
  }, {
    transform: (res) => (res.data ?? []).map(toCardProduct),
    default: () => [] as CardProduct[],
  })
}

// Homepage picks — only products the admin flagged for_home (max 6; API falls back if none).
export function useHomeProducts() {
  const { $api } = useNuxtApp()
  return useAsyncData('home-products', () => $api<{ data: ApiProduct[] }>('/products?for_home=1&per_page=6'), {
    transform: (res) => (res.data ?? []).slice(0, 6).map(toCardProduct),
    default: () => [] as CardProduct[],
  })
}
