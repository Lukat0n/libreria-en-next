const store =
  typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : {
        _data: {} as Record<string, string>,
        getItem(k: string) { return this._data[k] ?? null },
        setItem(k: string, v: string) { this._data[k] = v },
        removeItem(k: string) { delete this._data[k] }
      }

export function get<T>(key: string, fallback: T): T {
  const raw = store.getItem(key)
  if (!raw) return fallback
  try { return JSON.parse(raw) as T } catch { return fallback }
}

export function set<T>(key: string, value: T) {
  store.setItem(key, JSON.stringify(value))
}

export function del(key: string) {
  store.removeItem(key)
}
