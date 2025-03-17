import { useStoreContext } from "@/context/store";
import { task } from "@/type";
import { CheckIcon } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import TaskActionPicker from "./TaskActionPicker";
import { supabase } from "@/utils/supabase/client";
import { Draggable } from "@hello-pangea/dnd";

const TaskComp = ({ task, index }: { task: task; index: number }) => {
  const [editString, setEditString] = useState(task.task);
  const [edit, setEdit] = useState(false);
  const { theme, tasks } = useStoreContext();
  const [loading, setLoading] = useState(false);

  // function to toggle complete
  const toggleComplete = async (checked: boolean) => {
    setLoading(true);
    task.completed = checked;
    const { error } = await supabase
      .from("Tasks")
      .update({ completed: checked })
      .eq("id", task.id);
    if (!error) {
      setLoading(false);
    }
  };

  // function update task
  const updateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editString === task.task) {
      setEdit(false);
    } else {
      task.task = editString;
      await supabase
        .from("Tasks")
        .update({
          task: editString,
        })
        .eq("id", task.id);
      setEdit(false);
    }
  };

  const taskRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (index === tasks.length - 1 && taskRef.current) {
      taskRef.current.scrollIntoView();
    }
  }, []);

  return (
    <Draggable index={index} draggableId={index.toString()}>
      {(provided, snapshot) => (
        <div
          className="w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            ref={taskRef}
            className={`pt-2 pb-1 w-full flex items-center gap-10 ${
              task.completed && "opacity-60"
            } transition duration-200 linear border-b border-slate-600 ${
              snapshot.isDragging && "scale-[1.03]"
            }`}
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
                    className={`font-(family-name:--font-caveat-brush) text-xl ${
                      theme === "dark" ? "text-slate-200" : "text-gray-900"
                    } ${task.completed && "line-through"} `}
                  >
                    {task.task}
                  </h3>
                ) : (
                  <form
                    onSubmit={updateTask}
                    className="flex-1 flex w-full justify-between"
                  >
                    <label
                      htmlFor={`task--edit--${task.id}`}
                      className="hidden"
                    ></label>
                    <input
                      type="text"
                      autoFocus={edit}
                      id={`task--edit--${task.id}`}
                      value={editString}
                      onChange={(e) => setEditString(e.target.value)}
                      className="bg-stone-800 flex-1 w-full focus:outline-none  py-1 px-2"
                    />
                    <button
                      type="submit"
                      disabled={editString.length === 0}
                      className="py-1 px-2 bg-teal-600 disable:cursor-not-allowed disabled:opacity-90"
                    >
                      <CheckIcon />
                    </button>
                  </form>
                )}
              </div>
            </div>
            <TaskActionPicker
              completed={task.completed}
              setEdit={setEdit}
              id={task.id}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskComp;
