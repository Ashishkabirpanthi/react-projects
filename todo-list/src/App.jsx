import React, { useState } from 'react'
import First from './Components/First'
import Create from './Components/Create'
import Show from './Components/Show'

const App = () => {
  const [tasks, settask] = useState([]);

  return (
    <>
      <div className='w-screen h-screen flex items-center justify-center bg-zinc-800'>
        <div className='w-6/12 h-4/5 flex flex-col items-center gap-y-4 justify-start'>
          <First tasks = {tasks} />
          <Create tasks = {tasks} settask = {settask}/>
          <Show tasks = {tasks} settask = {settask}/>
        </div>
      </div>
    </>
  )
}
export default App