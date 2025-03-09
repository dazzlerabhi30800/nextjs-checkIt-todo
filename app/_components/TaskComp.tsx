import { useStoreContext } from "@/context/store";
import { task } from "@/type";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";
import TaskActionPicker from "./TaskActionPicker";

const TaskComp = ({ task }: { task: task }) => {
  const [editString, setEditString] = useState(task.task);
  const [edit, setEdit] = useState(false);
  const { theme } = useStoreContext();
  return (
    <div
      className={`p-3 w-full flex items-center gap-10 ${
        task.completed && "scale-75 opacity-90"
      } transition duration-200 linear border-b border-slate-600`}
    >
      {/* Checkbox &&  Edit Todo */}
      <div className="flex-1 flex w-full items-center gap-3">
        <label
          htmlFor={`task--complete--${task.id}`}
          className="hidden"
        ></label>
        <input
          id={`task--complete-${task.id}`}
          type="checkbox"
          className="w-5 h-5 accent-teal-500 bg-transparent"
        />
        {/* // Edit */}
        <div className="flex flex-1 w-full">
          {!edit ? (
            <h3
              className={`font-semibold ${
                theme === "dark" ? "text-slate-200" : "text-gray-900"
              } `}
            >
              {task.task}
            </h3>
          ) : (
            <form className="flex-1 flex w-full justify-between">
              <input
                type="text"
                id="task--edit"
                value={task.task}
                onChange={(e) => setEditString(e.target.value)}
                className="bg-stone-800 flex-1 w-full focus:outline-none  py-1 px-2"
              />
              <button
                disabled={task.task === editString || editString.length === 0}
                className="py-1 px-2 bg-teal-600 disable:cursor-not-allowed disabled:opacity-90"
              >
                <CheckIcon />
              </button>
            </form>
          )}
        </div>
      </div>
      <TaskActionPicker />
    </div>
  );
};

export default TaskComp;
