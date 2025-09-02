import type { Volume } from './types'

const API = 'https://www.googleapis.com/books/v1/volumes'

export function buildQuery(input: string) {
  const s = input.trim()
  if (!s) return 'q='
  const digits = s.replace(/[-\s]/g, '')
  if (/^\d{10}(\d{3})?$/.test(digits)) return 'q=isbn:' + digits
  if (/^isbn:/i.test(s)) return 'q=' + s
  if (/^inauthor:/i.test(s)) return 'q=' + s
  return 'q=' + encodeURIComponent(s)
}

export async function searchBooks(term: string): Promise<Volume[]> {
  const q = buildQuery(term)
  const res = await fetch(`${API}?${q}&maxResults=20`, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.items || []
}

export async function getBookById(id: string): Promise<Volume | null> {
  const res = await fetch(`${API}/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data || null
}