import React, { useState } from 'react'
import "./TaskInput.css"
import { useTaskContext } from '../context/TaskContext';
const TaskInput = () => {

// create the states to handles the input and access dispatch function

const [taskText, setTaskText] = useState("");
const {dispatch} = useTaskContext();

// function to add tasks

const addTasks = ()=>{
    if(taskText.trim() === "")
      {return alert("Enter a task");

      }
    dispatch({type : 'ADD_TASK', payload : taskText}); // add the input text to global state
    setTaskText(""); //clear input box
}

  return (
    <div className="task-input">
        <input type="text"  className='input text-[16px] text-white' placeholder="What're You Gonna Do Today Asshole?" value={taskText} onChange={(e) => setTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTasks()} />
        <button onClick={addTasks}>ADD</button>

    </div>
  )
}

export default TaskInput


