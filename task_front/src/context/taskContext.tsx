import { createContext, useEffect, useState } from "react";
import { createTaskRequest, getTaskRequest, deleteTaskRequest, updateTaskRequest } from "../api/tasks";
import { Task, CreateTask, UpdateTask} from "../interfaces/task.interface";

interface TaskContextValue {
    tasks: Task[];
    createTask: (task: CreateTask) => Promise<void>;
    deleteTask: (id:string) => Promise<void>
    updateTask: (id:string, task: UpdateTask) => Promise<void>
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async () => {},
    deleteTask: async () => {},
    updateTask: async () => {}
   
})

interface Props {
    children: React.ReactNode
}


export const TaskProvider: React.FC<Props> = ({children}) => {
    
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        getTaskRequest()
          .then((response) => response.json())
          .then((data) => setTasks(data.data))
      }, [])

    const createTask = async (task:CreateTask ) => {
        const res = await createTaskRequest(task)
        const data = await res.json()
        console.log(data)
        setTasks([... tasks, data.data])
    }

    const deleteTask = async (id:string) => {
        const res = await deleteTaskRequest(id)
        const data = await res.json();
        console.log(data)
        if(res.status === 200){
            setTasks(tasks)
            setTasks(tasks.filter(task => task._id != id))
        }
    }
    
    const updateTask = async (id:string, task: UpdateTask) => {
        const res = await updateTaskRequest(id, task)
        const data = await res.json();
        console.log(data.data)
        setTasks(tasks.map(task => task._id === id ? {...task, ...data.data}:task))
    } 

return (
    <TaskContext.Provider value = {{
        tasks,
        createTask,
        deleteTask,
        updateTask
    }}>
        {children}
        </TaskContext.Provider>

);
};