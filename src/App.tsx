import styles from './styles.module.css'

import { Form, TasksList } from './components'
import useCrud from './hook/use-crud.hook'

function App() {

  const { tasks, storeTask } = useCrud()

  return (
    <>
      <div className={styles.container}>
        <h1>TO DO LIST</h1>
        <Form
          getFormValues={(data) => storeTask(data)}
        >
          <>
            <button className={styles.buttonForm}>
              Guardar
            </button>
          </>
        </Form>
        <TasksList data={tasks} />
      </div>
    </>
  )
}

export default App
