/**
 * Sends a page-visit beacon to the API on every route change.
 * The API only records the visit when a logged-in client token is present
 * (checked server-side), so anonymous browsing is ignored.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { $api } = useNuxtApp() as unknown as { $api: typeof $fetch }
  const token = useCookie<string | null>('rs_token')

  const send = (path: string) => {
    // No client token → nothing to log; skip the request entirely.
    if (!token.value) return
    // Fire-and-forget; never block navigation or surface errors.
    $api('/track/visit', {
      method: 'POST',
      body: {
        path,
        title: typeof document !== 'undefined' ? document.title : undefined,
        referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      },
    }).catch(() => {})
  }

  // Log the first (landing) page once the app is mounted.
  nuxtApp.hook('app:mounted', () => send(router.currentRoute.value.fullPath))

  // Log every subsequent client-side navigation.
  router.afterEach((to) => send(to.fullPath))
})
