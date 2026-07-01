export interface ToastItem {
  id: number
  type: 'success' | 'error' | 'info'
  title: string
  message?: string
}

/** Tiny global toast/notification store (shared via useState). */
export function useToast() {
  const toasts = useState<ToastItem[]>('toasts', () => [])

  function remove(id: number) {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function push(toast: Omit<ToastItem, 'id'>, duration = 2800) {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    toasts.value = [...toasts.value, { id, ...toast }]
    if (import.meta.client) window.setTimeout(() => remove(id), duration)
  }

  const success = (title: string, message?: string) => push({ type: 'success', title, message })
  const error = (title: string, message?: string) => push({ type: 'error', title, message })
  const info = (title: string, message?: string) => push({ type: 'info', title, message })

  return { toasts, push, remove, success, error, info }
}
