import React, { useState } from 'react'
import { RiDeleteBin6Line } from "@remixicon/react"
const App = () => {
  const [tasks, settask] = useState([]);
  const [tittle, settittle] = useState("");

  const taskhandler = (e) => {
    e.preventDefault();
    let newtask = { text: tittle, completed: false };
    let copytask = [...tasks]
    copytask.push(newtask);
    settask(copytask);
    settittle("");
  }

  const deletetask = (index) => { 
    let copytask = [...tasks];
    copytask.splice(index, 1);
    settask(copytask);
  }

  const completedtask = (e,index) => { 
    let copytask = [...tasks];
    copytask[index].completed =!copytask[index].completed;
    settask(copytask);
  }

  let taskrender = "No task available";
  if (tasks.length > 0) {
    taskrender = tasks.map((task, i) => <div key={i} className='w-full h-10 flex flex-col gap-2'><div className='w-full h-9 border border-blue-100 rounded-md flex items-center justify-between'>
      <div className='flex gap-2'>
        <input onClick={(e) => completedtask(e,i)} className="ml-5 rounded-md scale-150" type="checkbox" />
        <span className={`text-white ${task.completed ? "line-through" : ""}`}>{task.text}</span>
      </div>
      <RiDeleteBin6Line onClick={(e) => deletetask(i)} className="mr-5"
        size={24}
        color="white"
      />
    </div>
    </div>)
  }
  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center bg-zinc-800'>
        <div className='w-6/12 h-4/5 flex flex-col items-center gap-y-4 justify-start'>
          <div className='w-full h-2/5 border border-blue-100 rounded-md flex items-center justify-evenly'>
            <div>
              <p className='text-red-300 text-3xl'>Lets Todo</p>
              <span className='text-sm text-red-300'>Keep do thinks</span>
            </div>
            <div className='w-48 h-48 bg-orange-700 rounded-full flex items-center justify-center'>
              <span className='text-2xl'>{tasks.filter(task => task.completed).length}/{tasks.length}</span>
            </div>
          </div>
          <form className='flex w-full gap-7' onSubmit={taskhandler}>
            <input value={tittle} onChange={(e) => settittle(e.target.value)} placeholder=' Write your task here....' className='w-9/12 h-full rounded-md bg-gray-600 text-bold' type="text" />
            <input type="submit" className='w-20 h-20 bg-orange-700 rounded-full text-center' />
          </form>
          <div className='w-full h-1/5 flex flex-col gap-2'>
            <span>{taskrender}</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default App