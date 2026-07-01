/**
 * $api — a preconfigured $fetch instance pointed at the Laravel API.
 * Sends Accept: application/json and a Bearer token read from the `rs_token` cookie,
 * and clears the cookie on a 401 so stale sessions don't linger.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('rs_token', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,
    onRequest({ options }) {
      const headers = new Headers(options.headers as HeadersInit)
      headers.set('Accept', 'application/json')
      if (token.value) headers.set('Authorization', `Bearer ${token.value}`)
      options.headers = headers
    },
    onResponseError({ response }) {
      if (response.status === 401) token.value = null
    },
  })

  return { provide: { api } }
})
