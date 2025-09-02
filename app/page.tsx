'use client'
import { useEffect, useMemo, useState } from 'react'
import { searchBooks } from '../lib/googleBooks'
import type { Volume } from '../lib/types'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [term, setTerm] = useState('harry potter')
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Volume[]>([])
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    searchBooks(term).then(res => {
      if (!active) return
      setItems(res)
    }).catch(() => setError('Error al buscar libros')).finally(() => {
      if (!active) return
      setLoading(false)
    })
    return () => { active = false }
  }, [term])

  const onSelect = (v: Volume) => {
    router.push(`/book/${v.id}`)
  }

  const list = useMemo(() => items, [items])

  return (
    <div className="container">
      <h1 className="app-title">Descubrí libros y compartí reseñas</h1>
      <p className="sub">Buscá por título, autor o ISBN. Abrí un libro para ver detalles, calificar y escribir una reseña. Votá reseñas útiles.</p>
      <SearchBar onSearch={setTerm} />
      {loading ? <p className="muted">Buscando...</p> : null}
      {error ? <p className="muted">{error}</p> : null}
      {!loading && !list.length ? <div className="empty">No se encontraron resultados</div> : null}
      <BookList items={list} onSelect={onSelect} />
    </div>
  )
}