export interface AuthUser {
  id: number
  name: string
  email: string
  phone?: string | null
  role: string
  initials: string
}

/**
 * Real auth backed by the Laravel Sanctum API. Token is stored in the `rs_token`
 * cookie (read by the $api plugin); the user object is shared via useState.
 */
export function useAuth() {
  const token = useCookie<string | null>('rs_token', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  const user = useState<AuthUser | null>('auth_user', () => null)
  const { $api } = useNuxtApp()

  const isLoggedIn = computed(() => !!token.value)

  async function login(email: string, password: string) {
    const res = await $api<{ token: string; user: AuthUser }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    token.value = res.token
    user.value = res.user
    return res
  }

  async function register(payload: { name: string; email: string; phone?: string; password: string; password_confirmation: string }) {
    const res = await $api<{ token: string; user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: payload,
    })
    token.value = res.token
    user.value = res.user
    return res
  }

  async function fetchMe() {
    if (!token.value) {
      user.value = null
      return null
    }
    try {
      // /auth/me returns a JsonResource → wrapped in { data: {...} }; unwrap it.
      const res = await $api<any>('/auth/me')
      user.value = (res?.data ?? res) as AuthUser
    } catch {
      token.value = null
      user.value = null
    }
    return user.value
  }

  async function logout() {
    try {
      await $api('/auth/logout', { method: 'POST' })
    } catch {
      // ignore network errors on logout
    }
    token.value = null
    user.value = null
    await navigateTo('/login')
  }

  return { token, user, isLoggedIn, login, register, fetchMe, logout }
}
