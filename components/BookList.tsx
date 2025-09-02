'use client'
import type { Volume } from '../lib/types'
import BookCard from './BookCard'

export default function BookList({ items, onSelect }: { items: Volume[], onSelect: (v: Volume) => void }) {
  return (
    <div className="grid">
      {items.map(v => <BookCard key={v.id} v={v} onClick={() => onSelect(v)} />)}
    </div>
  )
}