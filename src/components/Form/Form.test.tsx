import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './Form'
import { INITIAL_FORMM } from '@/constants/form.constant'

describe('Form', () => {
  it('renderiza los campos y el children', () => {
    render(
      <Form task={INITIAL_FORMM} getFormValues={vi.fn()}>
        <button>Guardar</button>
      </Form>,
    )

    expect(screen.getByLabelText('Tarea:')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('muestra los valores de la tarea recibida', () => {
    render(
      <Form task={{ id: '1', title: 'Hola', description: 'Mundo' }} getFormValues={vi.fn()} />,
    )

    expect(screen.getByLabelText('Tarea:')).toHaveValue('Hola')
    expect(screen.getByLabelText('Descripción:')).toHaveValue('Mundo')
  })

  it('actualiza los inputs al escribir', async () => {
    const user = userEvent.setup()
    render(<Form task={INITIAL_FORMM} getFormValues={vi.fn()} />)

    await user.type(screen.getByLabelText('Tarea:'), 'Estudiar')
    await user.type(screen.getByLabelText('Descripción:'), 'React')

    expect(screen.getByLabelText('Tarea:')).toHaveValue('Estudiar')
    expect(screen.getByLabelText('Descripción:')).toHaveValue('React')
  })

  it('al enviar llama getFormValues con los valores y limpia el formulario', async () => {
    const user = userEvent.setup()
    const getFormValues = vi.fn()
    render(
      <Form task={INITIAL_FORMM} getFormValues={getFormValues}>
        <button type="submit">Guardar</button>
      </Form>,
    )

    await user.type(screen.getByLabelText('Tarea:'), 'Estudiar')
    await user.type(screen.getByLabelText('Descripción:'), 'React')
    await user.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(getFormValues).toHaveBeenCalledTimes(1)
    expect(getFormValues).toHaveBeenCalledWith({ title: 'Estudiar', description: 'React' })
    expect(screen.getByLabelText('Tarea:')).toHaveValue('')
    expect(screen.getByLabelText('Descripción:')).toHaveValue('')
  })

  it('sincroniza el formulario cuando cambia la prop task', () => {
    const { rerender } = render(<Form task={INITIAL_FORMM} getFormValues={vi.fn()} />)

    rerender(<Form task={{ id: '2', title: 'Editar', description: 'Esto' }} getFormValues={vi.fn()} />)

    expect(screen.getByLabelText('Tarea:')).toHaveValue('Editar')
    expect(screen.getByLabelText('Descripción:')).toHaveValue('Esto')
  })
})
