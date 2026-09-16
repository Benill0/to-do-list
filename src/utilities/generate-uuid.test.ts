import { describe, it, expect } from 'vitest'
import { generateUUID } from './generate-uuid'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

describe('generateUUID', () => {
  it('genera un UUID con formato v4 válido', () => {
    expect(generateUUID()).toMatch(UUID_V4_REGEX)
  })

  it('genera valores distintos en llamadas consecutivas', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateUUID()))
    expect(ids.size).toBe(50)
  })
})
