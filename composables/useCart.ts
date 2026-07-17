export type License = 'regular' | 'extended'

export interface CartItem {
  slug: string
  name: string
  image?: string
  version?: string
  label: string // "Regular License" | "Extended License" | plan name | "Installation: Basic"
  unitPrice: number // snapshot price captured at add time
  planId?: number | null // set when added from a pricing plan
  installationPlanId?: number | null // set when added as an installation service
  license?: License | null // set when added as a regular/extended license
  qty: number
}

/** What callers pass to addItem — a self-describing line (price snapshot included). */
export interface AddToCartInput {
  slug: string
  name: string
  unitPrice: number
  image?: string
  version?: string
  license?: License
  planId?: number
  planName?: string
  installationPlanId?: number
  installationPlanName?: string
}

// A line is unique per product + (installation plan OR pricing plan OR license tier).
const lineKey = (i: { slug: string; planId?: number | null; installationPlanId?: number | null; license?: License | null }) =>
  i.installationPlanId
    ? `${i.slug}:inst${i.installationPlanId}`
    : `${i.slug}:${i.planId ?? i.license ?? 'regular'}`

/**
 * Shared, reactive shopping-cart state (Nuxt useState → SSR-safe + shared across pages).
 * Each line stores its own price/label snapshot, so plan prices (Basic/Standard/Premium)
 * and regular/extended licenses all show correctly. Persisted by plugins/cart.client.ts.
 */
export function useCart() {
  const items = useState<CartItem[]>('cart', () => [])

  const unitPrice = (it: CartItem) => it.unitPrice
  const lineTotal = (it: CartItem) => it.unitPrice * it.qty

  const count = computed(() => items.value.reduce((n, it) => n + it.qty, 0))
  const subtotal = computed(() => items.value.reduce((s, it) => s + lineTotal(it), 0))

  // Shared coupon (carries from cart → checkout)
  const COUPONS: Record<string, number> = { SAVE20: 0.2 }
  const coupon = useState<string>('cart-coupon', () => '')
  // Drop any previously-applied coupon that's no longer valid (e.g. a removed promo like RAZIN10).
  if (coupon.value && !COUPONS[coupon.value]) coupon.value = ''
  const discount = computed(() => Math.round(subtotal.value * (COUPONS[coupon.value] || 0)))
  const total = computed(() => subtotal.value - discount.value)
  function applyCoupon(code: string): boolean {
    const c = code.trim().toUpperCase()
    if (COUPONS[c]) {
      coupon.value = c
      return true
    }
    return false
  }
  function clear() {
    items.value = []
    coupon.value = ''
  }

  function addItem(input: AddToCartInput) {
    const isInstall = !!input.installationPlanId
    const license: License | null = (input.planId || isInstall) ? null : (input.license ?? 'regular')
    const label = isInstall
      ? `Installation: ${input.installationPlanName || 'Plan'}`
      : input.planId
        ? (input.planName || 'Plan')
        : (license === 'extended' ? 'Extended License' : 'Regular License')

    const key = lineKey({ slug: input.slug, planId: input.planId ?? null, installationPlanId: input.installationPlanId ?? null, license })
    const existing = items.value.find((i) => lineKey(i) === key)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({
        slug: input.slug,
        name: input.name,
        image: input.image,
        version: input.version,
        label,
        unitPrice: input.unitPrice,
        planId: input.planId ?? null,
        installationPlanId: input.installationPlanId ?? null,
        license,
        qty: 1,
      })
    }

    if (import.meta.client) {
      useToast().success('Added to cart', `${input.name} — ${label}`)
    }
  }

  function remove(it: CartItem) {
    const key = lineKey(it)
    items.value = items.value.filter((i) => lineKey(i) !== key)
  }
  function setQty(it: CartItem, qty: number) {
    it.qty = Math.min(99, Math.max(1, qty))
  }

  return { items, lineKey, unitPrice, lineTotal, count, subtotal, addItem, remove, setQty, coupon, discount, total, applyCoupon, clear }
}
