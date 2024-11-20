import { useContext } from "react";
import React from "react";
import { RiDeleteBin6Line } from "@remixicon/react";
import { Taskcontext } from "../context/TaskContext";

const Show = () => {
  const [tasks, settask] = useContext(Taskcontext);

  const deletetask = (index) => {
    let copytask = [...tasks];
    copytask.splice(index, 1);
    settask(copytask);
  };

  const completedtask = (e, index) => {
    let copytask = [...tasks];
    copytask[index].completed = !copytask[index].completed;
    settask(copytask);
  };

  let taskrender = "No task available";
  if (tasks.length > 0) {
    taskrender = tasks.map((task, i) => (
      <div key={i} className="w-full h-10 flex flex-col gap-2">
        <div className="w-full h-9 border border-blue-100 rounded-md flex items-center justify-between">
          <div className="flex gap-2">
            <input
              value={task.completed ? "✔" : ""}
              readOnly
              onClick={(e) => completedtask(e, i)}
              className="ml-1 rounded-md text-xl w-6 h-6 bg-white text-center"
              type="text"
            />
            <span
              className={`text-white ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.text}
            </span>
          </div>
          <RiDeleteBin6Line
            onClick={(e) => deletetask(i)}
            className="mr-5"
            size={24}
            color="white"
          />
        </div>
      </div>
    ));
  }

  return (
    <div className="w-full h-1/5 flex flex-col gap-2">
      <span>{taskrender}</span>
    </div>
  );
};

export default Show;
