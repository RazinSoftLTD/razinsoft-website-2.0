/**
 * The other half of `auth`: keeps a signed-in customer off the sign-in and sign-up pages.
 *
 * Deliberately not applied to forgot-password or reset-password. Someone can hold a valid session
 * and still need to change their password — often that is exactly why they are there — and a
 * recovery path is the last thing that should be blocked.
 *
 * A stale token sorts itself out: the API plugin clears the cookie on a 401, so the next visit to
 * /login is no longer treated as signed in.
 */
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>('rs_token')

  if (!token.value) {
    return
  }

  // Honour where they were originally headed — arriving at /login?redirect=/checkout with a
  // session should finish the journey, not dump them on the dashboard.
  const wanted = to.query.redirect

  // Same-origin paths only. Without this check a crafted link could bounce a signed-in
  // customer straight off to another site.
  const target =
    typeof wanted === 'string' && wanted.startsWith('/') && !wanted.startsWith('//')
      ? wanted
      : '/dashboard'

  // replace, so Back does not land them on the page they were just sent away from.
  return navigateTo(target, { replace: true })
})
