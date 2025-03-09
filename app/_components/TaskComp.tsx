import { useStoreContext } from "@/context/store";
import { task } from "@/type";
import { CheckIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import TaskActionPicker from "./TaskActionPicker";
import { supabase } from "@/utils/supabase/client";

const TaskComp = ({ task, index }: { task: task; index: number }) => {
  const [editString, setEditString] = useState(task.task);
  const [edit, setEdit] = useState(false);
  const { theme, setTasks, tasks } = useStoreContext();
  const [loading, setLoading] = useState(false);

  // function to toggle complete
  const toggleComplete = async (checked: boolean) => {
    setLoading(true);
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === task.id) {
          return { ...item, completed: checked };
        }
        return item;
      })
    );
    const { error } = await supabase
      .from("Tasks")
      .update({ completed: checked })
      .eq("id", task.id);
    if (!error) {
      setLoading(false);
    }
  };

  const taskRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (index === tasks.length - 1 && taskRef.current) {
      taskRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div
      ref={taskRef}
      className={`pt-2 pb-1 w-full flex items-center gap-10 ${
        task.completed && "scale-[0.9] opacity-70"
      } transition duration-200 linear border-b border-slate-600`}
    >
      {/* Checkbox &&  Edit Todo */}
      <div className="flex-1 flex w-full items-center gap-3">
        <label
          htmlFor={`task--complete--${task.id}`}
          className="hidden"
        ></label>
        <input
          checked={task.completed}
          onChange={(e) => !loading && toggleComplete(e.target.checked)}
          id={`task--complete-${task.id}`}
          type="checkbox"
          className="w-4 h-4 accent-teal-500 bg-transparent"
        />
        {/* // Edit */}
        <div className="flex flex-1 w-full">
          {!edit ? (
            <h3
              className={`font-(family-name:--font-zeyada) text-xl ${
                theme === "dark" ? "text-slate-200" : "text-gray-900"
              } ${task.completed && "line-through"} `}
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
      <TaskActionPicker id={task.id} />
    </div>
  );
};

export default TaskComp;
