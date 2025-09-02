import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { addReview, getAverageRating, listReviews, sanitizeRating, sortReviews, voteReview } from '../lib/reviews'

const BOOK = 'book-1'
const OTHER = 'book-2'

function reset() {
  localStorage.clear()
}

describe('reviews logic', () => {
  beforeEach(reset)
  afterEach(reset)

  it('sanitizes ratings', () => {
    expect(sanitizeRating(0)).toBe(1)
    expect(sanitizeRating(6)).toBe(5)
    expect(sanitizeRating(4.6)).toBe(5)
    expect(sanitizeRating(NaN)).toBe(1)
  })

  it('adds and lists reviews per book', () => {
    const r1 = addReview(BOOK, 5, 'a')
    const r2 = addReview(BOOK, 3, 'b')
    const r3 = addReview(OTHER, 4, 'c')
    const arr = listReviews(BOOK)
    expect(arr.find(x => x.id === r1.id)).toBeTruthy()
    expect(arr.find(x => x.id === r2.id)).toBeTruthy()
    expect(arr.find(x => x.id === r3.id)).toBeFalsy()
  })

  it('computes average rating per book', () => {
    addReview(BOOK, 5, 'a')
    addReview(BOOK, 3, 'b')
    expect(getAverageRating(BOOK)).toBe(4)
    expect(getAverageRating(OTHER)).toBe(0)
  })

  it('votes toggle and switch correctly', () => {
    const r = addReview(BOOK, 5, 'a')
    const a = voteReview(r.id, 'up', BOOK)!
    expect(a.up).toBe(1)
    const b = voteReview(r.id, 'up', BOOK)!
    expect(b.up).toBe(0)
    const c = voteReview(r.id, 'down', BOOK)!
    expect(c.down).toBe(1)
    const d = voteReview(r.id, 'up', BOOK)!
    expect(d.up).toBe(1)
    expect(d.down).toBe(0)
  })

  it('sorts by helpfulness then recency', async () => {
    const r1 = addReview(BOOK, 5, 'x')
    const r2 = addReview(BOOK, 5, 'y')
    voteReview(r2.id, 'up', BOOK)
    const arr = listReviews(BOOK)
    expect(arr[0].id).toBe(r2.id)
    expect(arr[1].id).toBe(r1.id)
  })
})