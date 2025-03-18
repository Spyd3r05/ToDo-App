import React, { useState } from "react";
import { useTaskContext } from "../Context/TaskContext"; // Import global state

const TaskList = () => {    
  console.log("TaskList is rendering..."); // Debugging

  const { tasks = [], dispatch } = useTaskContext();
  console.log("Tasks from context:", tasks); // Debugging

  const [editTexts, setEditTexts] = useState({});

  if (!tasks) {
    console.log("Error: tasks is undefined!");
    return <p>Something went wrong. Please refresh.</p>;
  }

  return (
    <div className="todo-container">
      {tasks.length === 0 && <p>No tasks available.</p>} {/* Check for empty tasks */}
      {tasks.map((task) => (
        <div key={task.id}>
          <span className="todo-item"
            onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: task.id })}
            style={{ cursor: "pointer" }}
          >
            {task.isCompleted ? "✅" : "⭕"}
          </span>

          {task.isEditing ? (
            <>
              <input
                type="text"
                value={editTexts[task.id] || ""}
                onChange={(e) => setEditTexts({ ...editTexts, [task.id]: e.target.value })}
              />
              <button className="save-btn"
                onClick={() => {
                  dispatch({
                    type: "UPDATE_TASK",
                    payload: { id: task.id, text: editTexts[task.id] || task.text },
                  });
                  setEditTexts((prev) => ({ ...prev, [task.id]: "" })); // Reset after saving
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <span className="todo-item" style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
                {task.text}
              </span>
              <button className="edit-btn"
                onClick={() => {
                  dispatch({ type: "EDIT_TASK", payload: task.id });
                  setEditTexts((prev) => ({ ...prev, [task.id]: task.text }));
                }}
              >
                Edit
              </button>
              <button className="delete-btn" onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
