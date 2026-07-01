import type { CartItem } from '~/composables/useCart'

/**
 * Persist the cart (items + coupon) to localStorage so it survives reloads. Client-only.
 * Hydration from storage runs AFTER the app mounts so the initial client render still
 * matches the server (empty cart) — otherwise the cart-count badge causes hydration mismatches.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const items = useState<CartItem[]>('cart', () => [])
  const coupon = useState<string>('cart-coupon', () => '')

  nuxtApp.hook('app:mounted', () => {
    try {
      const saved = JSON.parse(localStorage.getItem('rzn-cart-v2') || 'null')
      if (saved && Array.isArray(saved.items)) items.value = saved.items
      if (saved && typeof saved.coupon === 'string') coupon.value = saved.coupon
    } catch {
      // ignore malformed storage
    }

    watch(
      [items, coupon],
      () => {
        try {
          localStorage.setItem('rzn-cart-v2', JSON.stringify({ items: items.value, coupon: coupon.value }))
        } catch {
          // storage full / unavailable — non-fatal
        }
      },
      { deep: true },
    )
  })
})
