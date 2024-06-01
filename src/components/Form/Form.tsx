import styles from './form.module.css'

import { TTask } from '@/types/task'
import { useEffect, useState } from 'react'
import { INITIAL_FORMM } from '@/constants/form.constant'

interface FormProps {
  task: TTask,
  getFormValues: (form: TTask) => void,
  children?: React.ReactNode
}

export default function Form({ task, getFormValues, children }: FormProps) {
  const [form, setForm] = useState<TTask>(task)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target
    setForm((prev: TTask) => ({ ...prev, [id]: value }))
  }

  useEffect(() => {
    if (task) setForm(task)
  }, [task])

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
