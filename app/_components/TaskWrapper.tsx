"use client";
import { useStoreContext } from "@/context/store";
import { task } from "@/type";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import TaskComp from "./TaskComp";
import { Loader2Icon } from "lucide-react";

const TaskWrapper = () => {
  const { tasks, setTasks, user } = useStoreContext();
  const [loading, setLoading] = useState(false);

  // function to fetch tasks
  const getTasks = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("Tasks")
      .select("*")
      .eq("createdBy", user?.email);
    if (data) {
      setTasks(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!user) return;
    getTasks();
  }, [user]);
  return (
    <div className="flex flex-col gap-1 w-full max-w-2xl pb-10">
      {!loading ? (
        tasks?.map((task: task, index: number) => (
          <TaskComp key={index} index={index} task={task} />
        ))
      ) : (
        <span className="mx-auto">
          <Loader2Icon className="animate-spin" size={40} />
        </span>
      )}
    </div>
  );
};

export default TaskWrapper;
