import { useStoreContext } from "@/context/store";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useReducer, useRef, useState } from "react";

const TaskActionPicker = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const [showAction, setShowAction] = useState(false);
  const { theme } = useStoreContext();

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
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
        <Ellipsis size={30} />
      </button>
      {/* Action Wrapper */}
      <div
        className={`border-1 ${
          theme === "dark" ? "border-slate-500" : "border-stone-700"
        } flex items-center gap-5 py-3  absolute top-8 rounded-md -translate-x-1/2 left-1/2 w-24 ${
          showAction ? "opacity-100" : "opacity-0"
        } transition duration-200 linear justify-center bg-black`}
      >
        <button className="text-red-400 hover:text-red-700">
          <Trash2 size={22} />
        </button>
        <button className="text-green-400 hover:text-green-700">
          <Pencil size={22} />
        </button>
      </div>
    </div>
  );
};

export default TaskActionPicker;
