"use client";
import { todoStore } from "@/context/StoreSlice";
import { supabase } from "@/utils/supabase/client";
import { Loader2Icon, SendIcon } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";

const TaskInput = () => {
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { setTasks, user, tasks } = todoStore((state) => state);

  // function to add todo
  const handleAddTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current) return;
    if (inputRef.current && inputRef.current?.value.length === 0) {
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    const { data } = await supabase
      .from("Tasks")
      .insert([
        {
          task: inputRef.current.value,
          completed: false,
          createdBy: user?.email,
          position: tasks.length + 1,
        },
      ])
      .select("*");
    if (data) {
      setTasks([...tasks, { ...data[0] }]);
      setLoading(false);
      inputRef.current.value = "";
    }
  };

  // function to focus input on pressing Ctrl + /
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "/") {
        event.preventDefault(); // Prevents default browser behavior
        inputRef?.current?.focus();
      }
      if (event.key === "Escape") {
        event.preventDefault(); // Prevents default browser behavior
        inputRef?.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col w-full max-w-2xl  items-center">
      <h1 className="mx-auto text-[2.5rem] md:text-[3.5rem] font-bold font-(family-name:--font-inter) task--heading">
        Check It
      </h1>
      <form
        onSubmit={handleAddTask}
        className="mt-10 mx-3 md:mx-0 flex w-full border-slate-700 justify-between"
      >
        <label htmlFor="task--input" className="hidden"></label>
        <input
          ref={inputRef}
          type="text"
          id="task--input"
          placeholder="Add your task"
          className="flex-1 w-full py-2 px-4 md:py-3 md:px-6 focus:outline-none border-2 border-slate-700 border-r-0 rounded-l-md"
        />
        <button
          disabled={loading}
          className="bg-teal-500 group text-white py-2 px-4 md:py-3 md:px-6 text-lg hover:brightness-125 rounded-r-sm disabled:opacity-90 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <SendIcon className="-translate-x-1 group-hover:-translate-y-1 group-hover:translate-x-1 transition duration-200 ease-in w-5 h-5 md:h-6 md:w-6" />
          )}
        </button>
      </form>
      {/* Error */}
      <small
        className={`mt-3 ${
          error ? "opacity-100 mb-5" : "opacity-0 mb-0"
        } transition duration-300 ml-1 linear text-red-400 self-start text-base font-semibold`}
      >
        Input can&apos;t be empty!
      </small>
    </div>
  );
};

export default TaskInput;
