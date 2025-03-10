"use client";
import { useStoreContext } from "@/context/store";
import { task } from "@/type";
import { supabase } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import TaskComp from "./TaskComp";
import { Loader2Icon } from "lucide-react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

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

  // function to handle Drag & Drop
  const handleDrag = async (e: DropResult) => {
    // console.log(e);
    const { destination, source } = e;
    if (!destination || !source) return;
    const newItems = [...tasks];
    const itemSpliced = newItems.splice(source.index, 1)[0];
    newItems.splice(destination.index, 0, itemSpliced);
    setTasks(newItems);
    for (let i = 0; i < newItems.length; i++) {
      await supabase
        .from("Tasks")
        .update({
          position: i + 1,
        })
        .eq("id", newItems[i].id);
    }
  };

  useEffect(() => {
    if (!user) return;
    getTasks();
  }, [user]);

  if (loading) {
    return (
      <span className="mx-auto">
        <Loader2Icon className="animate-spin" size={40} />
      </span>
    );
  }
  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="taskWrapper">
        {(provided) => (
          <div
            className="w-full max-w-2xl"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="flex flex-col gap-1 w-full pb-10">
              {tasks?.map((task: task, index: number) => (
                <TaskComp key={index} index={index} task={task} />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskWrapper;
