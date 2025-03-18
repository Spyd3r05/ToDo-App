import { createContext, useReducer, useContext } from "react";

// Create the context
const TaskContext = createContext({ tasks: [], dispatch: () => {} });

// Define the reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.payload, isEditing: false, isCompleted: false }];

    case "TOGGLE_COMPLETE":
      return state.map(task =>
        task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
      );

      case "EDIT_TASK":
        return state.map(task =>
          task.id === action.payload
            ? { ...task, isEditing: true }
            : { ...task, isEditing: false } // Reset others
        );
      
    case "UPDATE_TASK":
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text, isEditing: false }
          : task
      );

    case "DELETE_TASK":
      return state.filter(task => task.id !== action.payload);

    default:
      return state;
  }
};

// Create the provider component
export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the context
export const useTaskContext = () => useContext(TaskContext);
