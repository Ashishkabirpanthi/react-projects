import React from 'react'

const First = (props) => {
    const {tasks} = props;
    return <div className='w-full h-2/5 border border-blue-100 rounded-md flex items-center justify-evenly'>
        <div>
            <p className='text-red-300 text-3xl'>Lets Todo</p>
            <span className='text-sm text-red-300'>Keep do thinks</span>
        </div>
        <div className='w-48 h-48 bg-orange-700 rounded-full flex items-center justify-center'>
            <span className='text-2xl'>{tasks.filter(task => task.completed).length}/{tasks.length}</span>
        </div>
    </div>
}

export default First

