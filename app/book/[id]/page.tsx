import { getBookById } from '../../../lib/googleBooks'
import BookDetailClient from '../../../components/BookDetailClient'
import type { Volume } from '../../../lib/types'

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)
  if (!book) return <div className="container"><p className="muted">No se encontró el libro</p></div>
  return <BookDetailClient book={book as Volume} />
}