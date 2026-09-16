import styles from './form.module.css'

import { TTask } from '@/types/task'
import { useState } from 'react'
import { INITIAL_FORMM } from '@/constants/form.constant'

interface FormProps {
  task: TTask,
  getFormValues: (form: TTask) => void,
  children?: React.ReactNode
}

export default function Form({ task, getFormValues, children }: FormProps) {
  const [form, setForm] = useState<TTask>(task)
  const [prevTask, setPrevTask] = useState<TTask>(task)

  // Sincroniza el formulario cuando cambia la tarea seleccionada, sin usar useEffect.
  // Patrón recomendado por React: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (task !== prevTask) {
    setPrevTask(task)
    setForm(task)
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target
    setForm((prev: TTask) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getFormValues(form)
    setForm(INITIAL_FORMM)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.containerInput}>
        <label htmlFor="title">
          Tarea:
        </label>
        <input
          type="text"
          value={form.title}
          id='title'
          onChange={handleChangeValue}
        />
      </div>
      <div className={styles.containerInput}>
        <label htmlFor="description">
          Descripción:
        </label>
        <input
          type="text"
          value={form.description}
          id='description'
          onChange={handleChangeValue}
        />
      </div>
      <div className={styles.containerButton}>
        {children}
      </div>
    </form>
  )
}
