import { describe, it, expect } from 'vitest'
import { generateUUID } from './generate-uuid'

// Test usado para demostrar el flujo del CI: primero falló a propósito, luego se corrigió.
describe('longitud del UUID', () => {
  it('el UUID tiene 36 caracteres (32 hex + 4 guiones)', () => {
    expect(generateUUID()).toHaveLength(36)
  })
})
