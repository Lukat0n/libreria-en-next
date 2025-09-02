import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Libros y Reseñas',
  description: 'Buscar libros, ver detalles y compartir reseñas con votación comunitaria'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}