import React from 'react'
import TaskInput from './components/TaskInput'
import Tasks from './components/Tasks'
import { TaskProvider } from './context/TaskContext'

const App = () => {
  return (
    <TaskProvider classname="task-container" >
    <h2>HI SHYNYN,</h2>
    <TaskInput />
    <Tasks />
      
    </TaskProvider>
    

  )
}

export default App