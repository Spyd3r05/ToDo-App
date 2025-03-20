import React, { useState } from 'react'
import './Tasks.css'
import { useTaskContext } from '../context/TaskContext'
import unchecked from "../assets/unchecked.png"
import delete_icon from "../assets/delete.png"
import checked from "../assets/checked.png"

const Tasks = () => {

  // get the tasks from the global state
  const { tasks = [], dispatch } = useTaskContext();


  //  handle the edit task function
  const [editTask, setEditTask] = useState({});

// handle a situation where the tasks are not there
if(!tasks){
  console.log("Task is undefined");
  return <p>Something went wrong...</p>
  
}
  return (
    <div className='tasks'>
      {tasks.length === 0 && <p>No Tasks Available</p>}
      {tasks.map((task) => (
        task && (
          <div key={task.id} className='task-item'>
            <span onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id });
            }}>
              <img src={task.isComplete ? checked : unchecked} alt="" />
            </span>

            {task.isEditing ? (
              <>
                <input
                  className='editTask'
                  type="text"
                  value={editTask[task.id] || ""}
                  onChange={(e) => setEditTask({ ...editTask, [task.id]: e.target.value })}
                />
                <button
                  className='save'
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    dispatch({ type: "SAVE_EDIT", payload: { id: task.id, task: editTask[task.id] || task.task } });
                    setEditTask((prev) => ({ ...prev, [task.id]: "" }));
                  }}
                >
                  SAVE
                </button>
              </>
            ) : (
              <>
                <span
                  className='task-text'
                  style={{
                    textDecoration: task.isComplete ? "line-through 3px black" : "none",
                    color: task.isComplete ? "grey" : 'white'
                  }}
                >
                  {task.task}
                </span>
                <button
                  className='edit'
                  style={{ display: task.isComplete ? "none" : "inline-block" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    dispatch({ type: "EDIT_TASK", payload: task.id });
                    setEditTask({ [task.id]: task.task });
                  }}
                >
                  EDIT
                </button>
                <button onClick={(e) => {
                  e.stopPropagation(); // Prevent event propagation
                  task?.id && dispatch({ type: "DELETE_TASK", payload: task.id });
                }}>
                  <img src={delete_icon} alt="" />
                </button>
              </>
            )}
          </div>
        )
      ))}

    </div>
  )
}

export default Tasks