const store = typeof window !== 'undefined' && window.localStorage ? window.localStorage : {
  _data: {} as Record<string, string>,
  getItem(k: string) { return this._data[k] ?? null },
  setItem(k: string, v: string) { this._data[k] = v },
  removeItem(k: string) { delete this._data[k] }
}
export function get(key: string, fallback: any) {
  const raw = store.getItem(key)
  if (!raw) return fallback
  try { return JSON.parse(raw) } catch { return fallback }
}
export function set(key: string, value: any) {
  store.setItem(key, JSON.stringify(value))
}
export function del(key: string) {
  store.removeItem(key)
}