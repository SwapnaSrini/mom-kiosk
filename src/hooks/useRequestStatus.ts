import { useState } from 'react'

export type RequestStatus = 'requested' | 'reserved' | 'picked-up'

const STORAGE_KEY = 'mom-kiosk:requests'

function readAll(): Record<string, RequestStatus> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

// Status of one product's request, kept across page refreshes
export function useRequestStatus(productId: string) {
  const [status, setStatusState] = useState<RequestStatus | null>(
    () => readAll()[productId] ?? null,
  )

  function setStatus(next: RequestStatus | null) {
    setStatusState(next)
    try {
      const all = readAll()
      if (next) all[productId] = next
      else delete all[productId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    } catch {
      /* storage blocked (private mode): status lives in memory only */
    }
  }

  return [status, setStatus] as const
}
