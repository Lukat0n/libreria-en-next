'use client'
import type { Volume } from '../lib/types'

export default function BookCard({ v, onClick }: { v: Volume, onClick: () => void }) {
  const vi = v.volumeInfo || {}
  const cover = vi.imageLinks?.thumbnail || vi.imageLinks?.smallThumbnail || ''
  const authors = vi.authors?.join(', ')
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0}>
      {cover ? <img className="cover" src={cover} alt={vi.title || ''} /> : <div className="cover" />}
      <div className="card-body">
        <div className="title">{vi.title}</div>
        <div className="meta">{authors}</div>
        <div className="row">
          {vi.publishedDate ? <span className="pill">{vi.publishedDate}</span> : null}
          {vi.categories?.slice(0,2).map(c => <span key={c} className="pill">{c}</span>)}
        </div>
      </div>
    </div>
  )
}