import styles from './styles.module.css'

import { useState } from 'react'

import { Form, TasksList } from './components'

import useCrud from './hook/use-crud.hook'
import { INITIAL_FORMM } from './constants/form.constant'
import { TTask } from './types/task'

function App() {
  const { tasks, storeTask, findTask, deleteTask, updateTask } = useCrud()
  const [selectedTask, setSelectedTask] = useState('')

  const handleAction = (data: TTask) => {
    const { title, description } = data

    if (!title || !description) return alert('Complete los campos')
    if (!selectedTask) storeTask(data)
    if (selectedTask) updateTask(selectedTask, data)

    setSelectedTask('')
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Administración de Tareas</h1>
        <Form
          getFormValues={(data) => handleAction(data)}
          task={selectedTask && findTask(selectedTask) || INITIAL_FORMM}
        >
          <>
            {!selectedTask &&
              <button className={styles.buttonForm}>
                Guardar
              </button>
            }
            {selectedTask &&
              <button className={styles.buttonForm}>
                Editar
              </button>
            }
          </>
        </Form>
        <TasksList
          data={tasks}
          editTask={(value) => setSelectedTask(value ?? '')}
          deleteTask={(value) => deleteTask(value ?? '')}
        />
      </div>
    </>
  )
}

export default App
