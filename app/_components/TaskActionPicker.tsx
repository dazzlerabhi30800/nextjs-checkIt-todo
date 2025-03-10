import { useStoreContext } from "@/context/store";
import { supabase } from "@/utils/supabase/client";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

interface actionPicker {
  id: string;
  setEdit: React.Dispatch<SetStateAction<boolean>>;
}

const TaskActionPicker = ({ id, setEdit }: actionPicker) => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [showAction, setShowAction] = useState(false);
  const { theme, setTasks } = useStoreContext();

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      console.log("hello");
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
        <Ellipsis size={25} />
      </button>
      {/* Action Wrapper */}
      <div
        className={`border-1 ${
          theme === "dark" ? "border-slate-500" : "border-stone-700"
        } items-center gap-5 py-3  absolute top-8 rounded-md -translate-x-1/2 left-1/2 w-24 ${
          showAction ? "z-10 flex" : "hidden"
        } transition duration-200 linear justify-center bg-gray-800`}
      >
        <button
          onClick={() => deleteTask(id)}
          className="text-red-400 hover:text-red-700"
        >
          <Trash2 size={22} />
        </button>
        <button
          onClick={() => setEdit(true)}
          className="text-green-400 hover:text-green-700"
        >
          <Pencil size={22} />
        </button>
      </div>
    </div>
  );
};

export default TaskActionPicker;
