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
}

/** Card-ready product shape used by ProductCard, the listing and the home grid. */
export interface CardProduct {
  slug: string
  name: string
  tagline: string
  version: string
  /** First plan's price (what the card shows). */
  price: number
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

/** SSR-safe fetch of the product catalogue (lean list). */
export function useProducts() {
  const { $api } = useNuxtApp()
  return useAsyncData('products', () => $api<{ data: ApiProduct[] }>('/products'), {
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
