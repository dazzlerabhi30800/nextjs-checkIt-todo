import { useStoreContext } from "@/context/store";
import { supabase } from "@/utils/supabase/client";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

interface actionPicker {
  id: string;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
  completed: boolean;
}

const TaskActionPicker = ({ id, setEdit, completed }: actionPicker) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [showAction, setShowAction] = useState(false);
  const { theme, setTasks } = useStoreContext();

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setShowAction(false);
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("Tasks").delete().eq("id", id);
    if (!error) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
      setShowAction(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className={`${
          theme === "dark" ? "hover:text-slate-500" : "hover:text-gray-700"
        }`}
        onClick={() => setShowAction((prev) => !prev)}
      >
        <Ellipsis size={20} />
      </button>
      {/* Action Wrapper */}
      <div
        className={`border-1 ${
          theme === "dark" ? "border-slate-500" : "border-stone-700"
        } items-center gap-4 py-2  absolute top-6 rounded-md -translate-x-1/2 left-1/2 w-20 ${
          showAction ? "z-10 flex" : "hidden"
        } transition duration-200 linear justify-center bg-gray-800`}
      >
        <button
          onClick={() => deleteTask(id)}
          className="text-red-400 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
        <button
          disabled={completed}
          onClick={() => setEdit(true)}
          className="text-green-400 hover:text-green-700 disabled:opacity-50"
        >
          <Pencil size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskActionPicker;
