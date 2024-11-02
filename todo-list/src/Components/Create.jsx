import React from 'react'
import { useState } from 'react';

const Create = (props) => {
    const [tittle, settittle] = useState("");
    const {tasks,settask} = props;
    const taskhandler = (e) => {
        e.preventDefault();
        let newtask = { text: tittle, completed: false };
        let copytask = [...tasks]
        copytask.push(newtask);
        settask(copytask);
        settittle("");
    }
    return <form className='flex w-full gap-7' onSubmit={taskhandler}>
        <input value={tittle} onChange={(e) => settittle(e.target.value)} placeholder=' Write your task here....' className='w-9/12 h-full rounded-md bg-gray-600 text-bold' type="text" />
        <input type="submit" className='w-20 h-20 bg-orange-700 rounded-full text-center' />
    </form>
}

export default Create
