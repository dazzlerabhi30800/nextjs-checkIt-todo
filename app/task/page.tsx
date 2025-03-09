import React from "react";
import TaskInput from "../_components/TaskInput";
import TaskWrapper from "../_components/TaskWrapper";

const page = () => {
  return (
    <main className="flex flex-col flex-1 h-inherit  items-center pt-24 px-4">
      <TaskInput />
      <TaskWrapper />
    </main>
  );
};

export default page;
