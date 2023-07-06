import { ChangeEvent, FormEvent, useState } from 'react'
import { useTasks } from '../context/useTasks';

const TaskForm = () => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    done: false
  });
  const {createTask} = useTasks()
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({... task, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTask(task)

  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name='title' className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2' placeholder='Write a title'/>
            <textarea onChange={handleChange} className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2' placeholder='Write a task' name="description" rows={3}></textarea>
            <label htmlFor="" className='inline-flex items-center gap-x-2 pb-2'>
                <input type="checkbox" className='h-5 w-5' onChange={(e)=>setTask({...task, done: !task.done})}/>
                <span>Done</span>
            </label>
            <button className='bg-teal-400 px-3 block py-2 w-full'>Save</button>
        </form>
    </div>
  )
}

export default TaskForm