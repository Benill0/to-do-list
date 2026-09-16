import { describe, it, expect } from 'vitest'
import { generateUUID } from './generate-uuid'

// Test intencionalmente incorrecto para demostrar cómo el CI bloquea un PR.
describe('ejemplo de test que falla', () => {
  it('espera que el UUID tenga 10 caracteres (falso: tiene 36)', () => {
    expect(generateUUID()).toHaveLength(10)
  })
})
