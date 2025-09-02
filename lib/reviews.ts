import { get, set } from './storage'
import type { Review } from './types'

const KEY = 'bookreviews-v1'
const VOTES_KEY = 'bookreviews-votes-v1'
type Dir = 'up' | 'down'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function sanitizeRating(n: number) {
  if (Number.isNaN(n)) return 1
  if (n < 1) return 1
  if (n > 5) return 5
  return Math.round(n)
}

export function listReviews(bookId: string): Review[] {
  const db = get<Record<string, Review[]>>(KEY, {})
  const arr: Review[] = db[bookId] ?? []
  return sortReviews(arr)
}

export function addReview(bookId: string, rating: number, text: string) {
  const db = get<Record<string, Review[]>>(KEY, {})
  const r: Review = {
    id: uid(),
    bookId,
    rating: sanitizeRating(rating),
    text: text.trim(),
    createdAt: Date.now(),
    up: 0,
    down: 0
  }
  const arr: Review[] = db[bookId] ?? []
  db[bookId] = [r, ...arr]
  set(KEY, db)
  return r
}

export function voteReview(reviewId: string, direction: Dir, bookId: string) {
  const db = get<Record<string, Review[]>>(KEY, {})
  const votes = get<Record<string, Dir>>(VOTES_KEY, {})
  const arr: Review[] = db[bookId] ?? []
  const idx = arr.findIndex((x: Review) => x.id === reviewId)
  if (idx === -1) return null
  const r = { ...arr[idx] }
  const prev = votes[reviewId]

  if (prev === direction) {
    if (direction === 'up' && r.up > 0) r.up -= 1
    if (direction === 'down' && r.down > 0) r.down -= 1
    delete votes[reviewId]
  } else {
    if (prev === 'up' && r.up > 0) r.up -= 1
    if (prev === 'down' && r.down > 0) r.down -= 1
    if (direction === 'up') r.up += 1
    else r.down += 1
    votes[reviewId] = direction
  }

  arr[idx] = r
  db[bookId] = arr
  set(KEY, db)
  set(VOTES_KEY, votes)
  return r
}

export function getAverageRating(bookId: string) {
  const arr = listReviews(bookId)
  if (!arr.length) return 0
  const sum = arr.reduce((a, b) => a + b.rating, 0)
  return Math.round((sum / arr.length) * 10) / 10
}

export function sortReviews(arr: Review[]) {
  return [...arr].sort((a, b) => {
    const ha = a.up - a.down
    const hb = b.up - b.down
    if (hb !== ha) return hb - ha
    return b.createdAt - a.createdAt
  })
}
