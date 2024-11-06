import { createContext,useState } from "react"


export const Taskcontext = createContext(null)

const TaskContext = (props) => {
  const [tasks, settask] = useState([]);
  return (
    <Taskcontext.Provider value = {[tasks, settask]}>
      {props.children}
    </Taskcontext.Provider>
  )
}

export default TaskContext
