import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// El formulario tiene su propio botón "Guardar"/"Editar"; la lista también tiene botones "Editar".
const getForm = () => screen.getByLabelText('Tarea:').closest('form') as HTMLFormElement
const getSubmitButton = (name: string) => within(getForm()).getByRole('button', { name })

const fillAndSubmit = async (title: string, description: string, buttonName: string) => {
  const user = userEvent.setup()
  await user.clear(screen.getByLabelText('Tarea:'))
  await user.clear(screen.getByLabelText('Descripción:'))
  if (title) await user.type(screen.getByLabelText('Tarea:'), title)
  if (description) await user.type(screen.getByLabelText('Descripción:'), description)
  await user.click(getSubmitButton(buttonName))
}

describe('App', () => {
  it('renderiza el título y el botón Guardar', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Administración de Tareas' })).toBeInTheDocument()
    expect(getSubmitButton('Guardar')).toBeInTheDocument()
  })

  it('muestra alerta y no guarda si faltan campos', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    await fillAndSubmit('Solo título', '', 'Guardar')

    expect(alertSpy).toHaveBeenCalledWith('Complete los campos')
    expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument()
    alertSpy.mockRestore()
  })

  it('crea una tarea y la muestra en la lista', async () => {
    render(<App />)

    await fillAndSubmit('Comprar', 'Leche', 'Guardar')

    expect(screen.getByText('Comprar')).toBeInTheDocument()
    expect(screen.getByText('Leche')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tasks') ?? '[]')).toHaveLength(1)
  })

  it('edita una tarea existente', async () => {
    const user = userEvent.setup()
    render(<App />)
    await fillAndSubmit('Original', 'Desc', 'Guardar')

    // Botón "Editar" de la tarjeta en la lista (fuera del formulario)
    const listEditButton = screen
      .getAllByRole('button', { name: /editar/i })
      .find((btn) => !getForm().contains(btn)) as HTMLElement
    await user.click(listEditButton)

    expect(screen.getByLabelText('Tarea:')).toHaveValue('Original')
    expect(getSubmitButton('Editar')).toBeInTheDocument()

    await fillAndSubmit('Modificada', 'Nueva desc', 'Editar')

    expect(screen.getByText('Modificada')).toBeInTheDocument()
    expect(screen.queryByText('Original')).not.toBeInTheDocument()
    expect(getSubmitButton('Guardar')).toBeInTheDocument()
  })

  it('elimina una tarea de la lista', async () => {
    const user = userEvent.setup()
    render(<App />)
    await fillAndSubmit('Borrar', 'Esto', 'Guardar')

    await user.click(screen.getByRole('button', { name: /eliminar/i }))

    expect(screen.queryByText('Borrar')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('tasks') ?? '[]')).toEqual([])
  })
})
