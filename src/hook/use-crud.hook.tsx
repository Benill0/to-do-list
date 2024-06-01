import { useState } from "react"
import { TTask } from '../types/task'
import { generateUUID } from './../utilities/generate-uuid'

export default function useCrud() {

  const [tasks, setTasks] = useState<TTask[]>(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (!storedTasks) localStorage.setItem('tasks', JSON.stringify([]))
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const storeTask = (task: TTask) => {
    setTasks((prev: TTask[]) => {
      const updateTasks = [...prev, { ...task, id: generateUUID() }]
      localStorage.setItem('tasks', JSON.stringify(updateTasks))
      return updateTasks
    })
  }

  const updateTask = (uuid: string, taskUpdate: TTask) => {
    setTasks((prev: TTask[]) => {
      const updateTasks = prev.map(task => task.id === uuid ? taskUpdate : task)
      localStorage.setItem('tasks', JSON.stringify(updateTasks))
      return updateTasks
    })
  }

  const deleteTask = (uuid: string) => {
    setTasks((prev: TTask[]) => {
      const updateTasks = prev.filter(task => task.id !== uuid)
      localStorage.setItem('task', JSON.stringify(updateTasks))
      return updateTasks
    })
  }

  const findTask = (uuid: string) => {
    return tasks.find(task => task.id === uuid) ?? ''
  }


  return {
    tasks,
    storeTask,
    updateTask,
    deleteTask,
    findTask
  }

}