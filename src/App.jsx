import React from 'react'
import TaskInput from './components/TaskInput'
import Tasks from './components/Tasks'
import { TaskProvider } from './context/TaskContext'

const App = () => {
  return (
    <TaskProvider className="task-container" >
    <h2 className='my-[20px] text-[32px] underline underline-offset-8 text-fuchsia-300'>Hello,</h2>
    <TaskInput />
    <Tasks />
      
    </TaskProvider>
    

  )
}

export default App
