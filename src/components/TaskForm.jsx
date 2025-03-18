import React, { useState } from "react";
import { useTaskContext } from "../Context/TaskContext";

const TaskForm = () => {
  const [taskText, setTaskText] = useState(""); // State for input field
  const { dispatch } = useTaskContext(); // Access dispatch function

  const handleAddTask = () => {
    if (taskText.trim() === "") return; // Prevent empty tasks
    dispatch({ type: "ADD_TASK", payload: taskText }); // Add task to global state
    setTaskText(""); // Clear input field
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
      />
      <button className="add-task" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;
