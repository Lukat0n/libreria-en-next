import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildQuery, searchBooks, getBookById } from '../lib/googleBooks'

const mockFetch = vi.fn()

describe('google books api helpers', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', mockFetch)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    mockFetch.mockReset()
  })

  it('buildQuery detects isbn and author', () => {
    expect(buildQuery('isbn:9780439708180')).toBe('q=isbn:9780439708180')
    expect(buildQuery('9780439708180')).toBe('q=isbn:9780439708180')
    expect(buildQuery('inauthor:rowling')).toBe('q=inauthor:rowling')
    expect(buildQuery('harry potter')).toBe('q=harry%20potter')
  })

  it('searchBooks returns items or empty array', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ items: [{ id: '1', volumeInfo: {} }] }) })
    const a = await searchBooks('harry')
    expect(a.length).toBe(1)
    mockFetch.mockResolvedValueOnce({ ok: false })
    const b = await searchBooks('harry')
    expect(b.length).toBe(0)
  })

  it('getBookById returns null on error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: '1', volumeInfo: {} }) })
    const a = await getBookById('1')
    expect(a?.id).toBe('1')
    mockFetch.mockResolvedValueOnce({ ok: false })
    const b = await getBookById('2')
    expect(b).toBeNull()
  })
})