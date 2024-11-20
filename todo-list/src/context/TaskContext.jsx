import { createContext,useState, useEffect } from "react"


export const Taskcontext = createContext(null)

const TaskContext = (props) => {
  const [tasks, settask] = useState(()=>{
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Taskcontext.Provider value = {[tasks, settask]}>
      {props.children}
    </Taskcontext.Provider>
  )
}

export default TaskContext
