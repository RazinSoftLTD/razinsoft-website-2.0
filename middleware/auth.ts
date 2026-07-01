/**
 * Protects authenticated pages (/dashboard, /checkout). Redirects to /login
 * with a redirect-back query when there is no auth token.
 */
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>('rs_token')
  if (!token.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
