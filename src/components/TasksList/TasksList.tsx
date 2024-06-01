import styles from './tasklist.module.css'

import { TTask } from '@/types/task'

import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"

export default function TasksList({ data }: { data: TTask[] }) {
  return (
    <div className={styles.list}>
      {data.map((task: TTask) =>
        <div key={task.id} className={styles.task}>
          <div className={styles.taskInfo}>
            <h3>Título:</h3>
            <p>{task.title}</p>
            <h3>Descripción:</h3>
            <p>{task.description}</p>
          </div>
          <div className={styles.containerButton}>
            <button><FaEdit /> Editar</button>
            <button><MdDelete /> Eliminar</button>
          </div>
        </div>
      )}
    </div>
  )
}
