import React from "react";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./Context/TaskContext";
import TaskForm from "./components/TaskForm";
import './index.css'


const App = () => {
  // Debugging log
  console.log("App is rendering..."); 

  return (
    <TaskProvider>
      <h2>HI SHYNYN,</h2>
      <TaskForm />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
