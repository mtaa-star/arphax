export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.results ?? data
}
