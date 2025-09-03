import '@testing-library/jest-dom'

if (!('localStorage' in globalThis) || !globalThis.localStorage) {
  const mem: Record<string, string> = {}
  // @ts-expect-error
  globalThis.localStorage = {
    getItem: (k: string) => (k in mem ? mem[k] : null),
    setItem: (k: string, v: string) => { mem[k] = String(v) },
    removeItem: (k: string) => { delete mem[k] },
    clear: () => { for (const k in mem) delete mem[k] }
  }
}
