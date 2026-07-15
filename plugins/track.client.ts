/**
 * Sends a page-visit beacon to the API on every route change.
 * Logged-in clients are tied to their account; anonymous visitors are recorded
 * as "unknown" (with their country) server-side.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  const { $api } = useNuxtApp() as unknown as { $api: typeof $fetch }

  const send = (path: string) => {
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
