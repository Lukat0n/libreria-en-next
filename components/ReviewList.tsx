'use client'
import type { Review } from '../lib/types'

export default function ReviewList({ items, onVote }: { items: Review[], onVote: (id: string, d: 'up'|'down') => void }) {
  if (!items.length) return <div className="empty">Sé el primero en reseñar</div>
  return (
    <div className="list">
      {items.map(r => (
        <div key={r.id} className="review">
          <div className="row">
            <span className="pill">{r.rating} ★</span>
            <span className="muted">{new Date(r.createdAt).toLocaleString()}</span>
          </div>
          <div>{r.text}</div>
          <div className="vote">
            <button data-active="false" onClick={() => onVote(r.id, 'up')}>Útil {r.up}</button>
            <button data-active="false" onClick={() => onVote(r.id, 'down')}>No útil {r.down}</button>
          </div>
        </div>
      ))}
    </div>
  )
}