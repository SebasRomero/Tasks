import TaskItem from './TaskItem'
import { useTasks } from '../context/useTasks'

const TaskList = () => {
  const {tasks} = useTasks()
  return (
    <div>
      {
        tasks.map((task)  => (
          <TaskItem task={task} key={task.title}/>
        ))
      }
    </div>
  )
}

export default TaskList