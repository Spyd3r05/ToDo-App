import { useContext, useEffect } from "react";
import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

// create the context

const TaskContext = createContext({tasks: [], dispatch : ()=>{}})

// define the reducer function
function taskReducer(state, action){
    switch (action.type) {
        case "ADD_TASK":
            return [...state, {id: uuid(), task: action.payload, isComplete: false, isEditing: false}];
        

        case "TOGGLE_COMPLETE":
            return state.map((task) => {
                // the map method should return a new array
                return task.id === action.payload ? {...task, isComplete: !task.isComplete} : task;
            });

            case "DELETE_TASK":
                return state.filter(task => task.id !== action.payload);

            case "EDIT_TASK":
                return  state.map((task)=>{
                    return task.id === action.payload ? {...task, isEditing : true} : {...task, isEditing : false};
                });
            case "SAVE_EDIT":
                return state.map((task)=>{
                    return task.id === action.payload.id ? {...task, task : action.payload.task, isEditing : false} : task;
                }) ;
        
    
        default:
            return state;
    }

}

// create the provider component

export const TaskProvider = ({children}) =>{
    let storedTasks = [];

    // try and catch block to handle parsing errors due to invalid JSON
    try {
        storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
    }
    const [tasks, dispatch] = useReducer(taskReducer, storedTasks);

    useEffect(()=>{
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);

    return (
        <TaskContext.Provider value={{tasks,dispatch}} >
            {children}

        </TaskContext.Provider>
    )

}


// create a custom hook to use the context
 // eslint-disable-next-line react-refresh/only-export-components
 export const useTaskContext = ()=> useContext(TaskContext);