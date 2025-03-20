import React, { useState } from 'react'
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
    <div className='w-[98%] mt-6 mx-auto resize-y flex items-start flex-col justify-start mt-[20px] gap-1'>
      {tasks.length === 0 && <p>No Tasks Available</p>}
      {tasks.map((task) => (
        task && (
          <div key={task.id} className='h-[50px] w-full p-2.5 rounded-[10px] bg-[#333] text-white flex justify-start items-center my-[5px] flex-wrap gap-2.5'>
            <span onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              dispatch({ type: 'TOGGLE_COMPLETE', payload: task.id });
            }}>
              <img src={task.isComplete ? checked : unchecked} alt="toggle_complete" className='cursor-pointer w-[20px] h-[20px]' />
            </span>

            {task.isEditing ? (
              <>
                <input
                  className='outline-none border-none flex-1 p-2 text-base bg-transparent text-white'
                  type="text"
                  value={editTask[task.id] || ""}
                  onChange={(e) => setEditTask({ ...editTask, [task.id]: e.target.value })}
                />
                <button
                  className='bg-black text-white cursor-pointer w-10 h-7 border-none outline-none rounded-[5px] shadow-sm shadow-white m-0.5 justify-self-end'
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
                  className='ml-[3px] flex-1 justify-self-start cursor-pointer'
                  style={{
                    textDecoration: task.isComplete ? "line-through 3px black" : "none",
                    color: task.isComplete ? "grey" : 'white'
                  }}
                >
                  {task.task}
                </span>
                <button
                  className='bg-black text-white cursor-pointer w-10 h-7 border-none outline-none rounded-[5px] shadow-sm shadow-white m-1 justify-self-end'
                  style={{ display: task.isComplete ? "none" : "inline-block" }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event propagation
                    dispatch({ type: "EDIT_TASK", payload: task.id });
                    setEditTask({ [task.id]: task.task });
                  }}
                >
                  EDIT
                </button>
                <button className='bg-white text-black cursor-pointer w-10 h-7 border-none outline-none rounded-[5px] shadow-sm shadow-white m-0.5 justify-self-end' onClick={(e) => {
                  e.stopPropagation(); // Prevent event propagation
                  task?.id && dispatch({ type: "DELETE_TASK", payload: task.id });
                }}>
                  <img src={delete_icon} alt="delete_icon" className='cursor-pointer w-[20px] h-[20px]' />
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