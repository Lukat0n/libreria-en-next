export type Volume = {
  id: string
  volumeInfo: {
    title?: string
    authors?: string[]
    publishedDate?: string
    description?: string
    pageCount?: number
    categories?: string[]
    imageLinks?: { thumbnail?: string; small?: string; smallThumbnail?: string }
    industryIdentifiers?: { type: string; identifier: string }[]
    publisher?: string
    language?: string
  }
}
export type Review = {
  id: string
  bookId: string
  rating: number
  text: string
  createdAt: number
  up: number
  down: number
}