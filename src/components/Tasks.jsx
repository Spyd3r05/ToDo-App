import React from 'react'
import './Tasks.css'
import { useTaskContext } from '../context/TaskContext'
import unchecked from "../assets/unchecked.png"
import delete_icon from "../assets/delete.png"

const Tasks = () => {

  // gee the tasks from the global state
  const { tasks = [] } = useTaskContext();

  console.log(tasks);

  //  handle the edit task function
  // Removed unused editTask and setEditTask

// handle a situation where the tasks are not there
if(!tasks){
  console.log("Task are undefined");
  return <p>Something went wrong...</p>
  
}
  return (
    <div className='tasks'>
      {tasks.length === 0 && <p>No Tasks Available</p>}
      {tasks.map((task) => (
        <div key={task.id} className='task-item'>
          <span><img src={unchecked} alt="" /></span>

          <>
          <span className='task-text'>{task.task}</span>
          <button className='edit'>EDIT</button>
          <button><img src={delete_icon} alt="" /></button>
          </>
        </div>
      ))}

    </div>
  )
}

export default Tasks