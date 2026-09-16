import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useCrud from './use-crud.hook'
import { TTask } from '@/types/task'

const readStorage = (): TTask[] => JSON.parse(localStorage.getItem('tasks') ?? '[]')

describe('useCrud', () => {
  it('inicia vacío y crea la clave "tasks" en localStorage', () => {
    const { result } = renderHook(() => useCrud())

    expect(result.current.tasks).toEqual([])
    expect(localStorage.getItem('tasks')).toBe('[]')
  })

  it('carga las tareas previamente guardadas en localStorage', () => {
    const stored: TTask[] = [{ id: 'abc', title: 'Leer', description: 'Un libro' }]
    localStorage.setItem('tasks', JSON.stringify(stored))

    const { result } = renderHook(() => useCrud())

    expect(result.current.tasks).toEqual(stored)
  })

  it('storeTask agrega una tarea con id generado y la persiste', () => {
    const { result } = renderHook(() => useCrud())

    act(() => result.current.storeTask({ title: 'Comprar', description: 'Pan' }))

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject({ title: 'Comprar', description: 'Pan' })
    expect(result.current.tasks[0].id).toBeTypeOf('string')
    expect(readStorage()).toEqual(result.current.tasks)
  })

  it('updateTask reemplaza la tarea con el id indicado', () => {
    const { result } = renderHook(() => useCrud())
    act(() => result.current.storeTask({ title: 'Vieja', description: 'Desc' }))
    const id = result.current.tasks[0].id as string

    act(() => result.current.updateTask(id, { id, title: 'Nueva', description: 'Editada' }))

    expect(result.current.tasks).toEqual([{ id, title: 'Nueva', description: 'Editada' }])
    expect(readStorage()).toEqual(result.current.tasks)
  })

  it('deleteTask elimina solo la tarea indicada', () => {
    const { result } = renderHook(() => useCrud())
    act(() => result.current.storeTask({ title: 'A', description: 'a' }))
    act(() => result.current.storeTask({ title: 'B', description: 'b' }))
    const [first, second] = result.current.tasks

    act(() => result.current.deleteTask(first.id as string))

    expect(result.current.tasks).toEqual([second])
    expect(readStorage()).toEqual([second])
  })

  it('findTask devuelve la tarea o cadena vacía si no existe', () => {
    const { result } = renderHook(() => useCrud())
    act(() => result.current.storeTask({ title: 'Buscar', description: 'me' }))
    const id = result.current.tasks[0].id as string

    expect(result.current.findTask(id)).toMatchObject({ title: 'Buscar' })
    expect(result.current.findTask('no-existe')).toBe('')
  })
})
