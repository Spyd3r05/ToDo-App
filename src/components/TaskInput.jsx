import React, { useState } from 'react'
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
    <div className="w-[95%] flex items-center justify-center h-10 bg-[#333] shadow-sm shadow-whitesmoke my-8 mx-auto rounded-[10px] px-8">
        <input type="text"  className="ml-2 text-left mx-2.5 flex-1 h-auto border-none outline-none bg-transparent text-white text-[16px] placeholder:text-white placeholder:text-[12px]"
 placeholder="ADD TASK..." value={taskText} onChange={(e) => setTaskText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTasks()} />
        <button className='px-4 py-2 rounded-[5px] self-end border-none outline-none cursor-pointer bg-black text-white shadow-sm shadow-white w-[40px] h-[40px] ms-1' onClick={addTasks}>ADD</button>
    </div>
  )
}

export default TaskInput


