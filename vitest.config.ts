import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
    environmentOptions: {
      jsdom: { url: 'http://localhost' }  // <- habilita localStorage en CI
    }
  }
})
