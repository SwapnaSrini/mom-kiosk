import type { Product } from '../models/Product'

async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal })
  if (res.status === 404) throw new Error('not-found')
  if (!res.ok) throw new Error(`Request failed (${res.status})`)
  return res.json() as Promise<T>
}

export const fetchProducts = (signal: AbortSignal) =>
  getJson<Product[]>('/api/products', signal)

export const fetchProduct = (id: string, signal: AbortSignal) =>
  getJson<Product>(`/api/products/${id}`, signal)
