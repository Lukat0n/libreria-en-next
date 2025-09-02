'use client'
import type { Volume } from '../lib/types'
import { addReview, getAverageRating, listReviews, voteReview } from '../lib/reviews'
import { useEffect, useMemo, useState } from 'react'
import ReviewForm from './ReviewForm'
import ReviewList from './ReviewList'

export default function BookDetailClient({ book }: { book: Volume }) {
  const vi = book.volumeInfo || {}
  const cover = vi.imageLinks?.small || vi.imageLinks?.thumbnail || vi.imageLinks?.smallThumbnail || ''
  const [reviews, setReviews] = useState(() => listReviews(book.id))
  const avg = useMemo(() => getAverageRating(book.id), [reviews, book.id])
  useEffect(() => setReviews(listReviews(book.id)), [book.id])
  const onSubmit = (rating: number, text: string) => {
    addReview(book.id, rating, text)
    setReviews(listReviews(book.id))
  }
  const onVote = (id: string, d: 'up'|'down') => {
    voteReview(id, d, book.id)
    setReviews(listReviews(book.id))
  }
  const isbn = vi.industryIdentifiers?.[0]?.identifier
  return (
    <div className="modal">
      <div className="sheet">
        <div className="sheet-col">
          {cover ? <img className="cover" src={cover} alt={vi.title || ''} /> : <div className="cover" />}
        </div>
        <div className="sheet-col">
          <a className="close" href="/">Cerrar</a>
          <h2 className="title">{vi.title}</h2>
          <div className="meta">{vi.authors?.join(', ')}</div>
          <div className="row">
            {vi.publishedDate ? <span className="pill">Publicado {vi.publishedDate}</span> : null}
            {vi.pageCount ? <span className="pill">{vi.pageCount} páginas</span> : null}
            {vi.publisher ? <span className="pill">{vi.publisher}</span> : null}
            {vi.language ? <span className="pill">{vi.language.toUpperCase()}</span> : null}
            {isbn ? <span className="pill">ISBN {isbn}</span> : null}
          </div>
          {avg ? <p className="rating">Promedio {avg} ★</p> : <p className="muted">Aún no hay calificaciones</p>}
          {vi.categories?.length ? <p className="muted">{vi.categories.join(' • ')}</p> : null}
          {vi.description ? <p className="muted">{vi.description}</p> : null}
          <ReviewForm onSubmit={onSubmit} />
          <ReviewList items={reviews} onVote={onVote} />
        </div>
      </div>
    </div>
  )
}