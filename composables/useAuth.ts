export interface AuthUser {
  id: number
  name: string
  email: string
  phone?: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  photo?: string | null
  email_verified?: boolean
  role: string
  initials: string
  created_at?: string
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

  // ---- Profile management ----
  const unwrap = (res: any) => (res?.data ?? res) as AuthUser

  async function updateProfile(payload: { name: string; phone?: string | null; address?: string | null; city?: string | null; country?: string | null }) {
    user.value = unwrap(await $api<any>('/account/profile', { method: 'PUT', body: payload }))
    return user.value
  }

  async function changePassword(payload: { current_password: string; password: string; password_confirmation: string }) {
    return $api('/account/password', { method: 'PUT', body: payload })
  }

  async function uploadAvatar(file: File) {
    const fd = new FormData()
    fd.append('photo', file)
    user.value = unwrap(await $api<any>('/account/avatar', { method: 'POST', body: fd }))
    return user.value
  }

  async function resendVerification() {
    return $api<{ message: string }>('/account/email/verify', { method: 'POST' })
  }

  async function deleteAccount(password: string) {
    await $api('/account', { method: 'DELETE', body: { password } })
    token.value = null
    user.value = null
  }

  return {
    token, user, isLoggedIn, login, register, fetchMe, logout,
    updateProfile, changePassword, uploadAvatar, resendVerification, deleteAccount,
  }
}
