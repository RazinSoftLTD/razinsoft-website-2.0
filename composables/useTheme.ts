/**
 * Light / dark preference.
 *
 * Stored in localStorage, not derived from the OS. Somebody who deliberately clicks the moon has
 * said what they want; following `prefers-color-scheme` afterwards would override them on the next
 * page load, which reads as the switch being broken.
 *
 * The very first paint is handled by an inline script in nuxt.config, before Vue exists — otherwise
 * a dark-mode visitor gets a white flash on every navigation.
 */
export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'smartdesk-theme'

export function useTheme() {
  const theme = useState<Theme>('theme', () => 'light')

  onMounted(() => {
    // The pre-paint script already put the class on <html>; read it back rather than re-deciding,
    // so the state and the DOM can never disagree.
    theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })

  function apply(next: Theme) {
    theme.value = next
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private browsing with storage denied. The choice lasts the session; that is enough.
    }
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  return { theme, toggle, apply }
}
