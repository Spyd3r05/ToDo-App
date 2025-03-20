import React from 'react'
import TaskInput from './components/TaskInput'
import Tasks from './components/Tasks'
import { TaskProvider } from './context/TaskContext'

const App = () => {
  return (
    <TaskProvider classname="task-container" >
    <h2 className='text-2xl'>HI AGNES,</h2>
    <TaskInput />
    <Tasks />
      
    </TaskProvider>
    

  )
}

export default App