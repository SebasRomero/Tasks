import { useTasks } from '../context/useTasks'
import {Task} from '../interfaces/task.interface'
import { IoCheckbox, IoSquareSharp, IoTrashSharp } from "react-icons/io5";

interface Props {
    task: Task
}

const TaskItem = ({task}: Props) => {
  const {deleteTask, updateTask} = useTasks()
  return (
    <div key={task._id} className='bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer'>
    <div>
    <h1>{task.title}</h1>
    <p>{task.description}</p>
    </div>
    <div className='flex gap-x-2'>
        <button onClick={()=> {
          updateTask(task._id,{
            done: !task.done
          })
        }}>
          {task.done ? <IoCheckbox/> : <IoSquareSharp/>}
        </button>
        
        <button onClick={async ()=>{
          await deleteTask(task._id)
        }}><IoTrashSharp/></button>
    </div>
  </div>
  )
}

export default TaskItem