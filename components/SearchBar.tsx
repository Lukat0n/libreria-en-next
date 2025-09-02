'use client'
import { useState } from 'react'

export default function SearchBar({ onSearch }: { onSearch: (s: string) => void }) {
  const [value, setValue] = useState('harry potter')
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(value)
  }
  return (
    <form className="search" onSubmit={submit}>
      <input className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Título, autor o ISBN" />
      <button className="btn" type="submit">Buscar</button>
    </form>
  )
}