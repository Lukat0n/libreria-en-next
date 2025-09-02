'use client'
import { useState } from 'react'
import { sanitizeRating } from '../lib/reviews'

export default function ReviewForm({ onSubmit }: { onSubmit: (rating: number, text: string) => void }) {
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(sanitizeRating(rating), text)
    setText('')
    setRating(5)
  }
  return (
    <form className="form" onSubmit={submit}>
      <label>
        Calificación
        <select className="select" value={rating} onChange={e => setRating(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={4}>4</option>
          <option value={3}>3</option>
          <option value={2}>2</option>
          <option value={1}>1</option>
        </select>
      </label>
      <label>
        Reseña
        <textarea className="textarea" rows={4} value={text} onChange={e => setText(e.target.value)} placeholder="Contá qué te gustó o qué no"></textarea>
      </label>
      <div className="row">
        <button className="btn" type="submit">Publicar</button>
      </div>
    </form>
  )
}