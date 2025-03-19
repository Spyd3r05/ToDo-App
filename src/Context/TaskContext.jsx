import { useContext } from "react";
import { createContext, useReducer } from "react";

// create the context

const TaskContext = createContext({tasks: [], dispatch : ()=>{}})

// define the reducer function
function taskReducer(state, action){
    switch (action.type) {
        case "ADD_TASK":
            return [...state, {id : Date.now, task: action.payload}];
        
    
        default:
            return state;
    }

}

// create the provider component

export const TaskProvider = ({children}) =>{
    const [tasks, dispatch] = useReducer(taskReducer, []);

    return (
        <TaskContext.Provider value={{tasks,dispatch}} >
            {children}

        </TaskContext.Provider>
    )

}


// create a custom hook to use the context
 // eslint-disable-next-line react-refresh/only-export-components
 export const useTaskContext = ()=> useContext(TaskContext);