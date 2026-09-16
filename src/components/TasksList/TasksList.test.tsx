import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TasksList from './TasksList'
import { TTask } from '@/types/task'

const tasks: TTask[] = [
  { id: '1', title: 'Primera', description: 'Desc 1' },
  { id: '2', title: 'Segunda', description: 'Desc 2' },
]

describe('TasksList', () => {
  it('no renderiza tareas cuando la lista está vacía', () => {
    render(<TasksList data={[]} editTask={vi.fn()} deleteTask={vi.fn()} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renderiza título y descripción de cada tarea', () => {
    render(<TasksList data={tasks} editTask={vi.fn()} deleteTask={vi.fn()} />)

    expect(screen.getByText('Primera')).toBeInTheDocument()
    expect(screen.getByText('Desc 1')).toBeInTheDocument()
    expect(screen.getByText('Segunda')).toBeInTheDocument()
    expect(screen.getByText('Desc 2')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /editar/i })).toHaveLength(2)
    expect(screen.getAllByRole('button', { name: /eliminar/i })).toHaveLength(2)
  })

  it('llama editTask y deleteTask con el id de la tarea correspondiente', async () => {
    const user = userEvent.setup()
    const editTask = vi.fn()
    const deleteTask = vi.fn()
    render(<TasksList data={tasks} editTask={editTask} deleteTask={deleteTask} />)

    // La tarjeta es el abuelo del <p> con el título: <div card><div info><p/></div>...</div>
    const secondCard = screen.getByText('Segunda').parentElement?.parentElement as HTMLElement

    await user.click(within(secondCard).getByRole('button', { name: /editar/i }))
    await user.click(within(secondCard).getByRole('button', { name: /eliminar/i }))

    expect(editTask).toHaveBeenCalledWith('2')
    expect(deleteTask).toHaveBeenCalledWith('2')
  })
})
