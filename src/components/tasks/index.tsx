import { useEffect, useState } from "react";
import { TaskList } from "./list";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTask } from "@/lib/hooks/useTask";

export const TasksPanel = () => {
  const { tasks, queryTasks } = useTask();
  useEffect(()=>{
    queryTasks()
  }, [])
  return (
    <div>
      {tasks.length > 0 ? (
        <DndProvider backend={HTML5Backend}>
          <TaskList />
        </DndProvider>
      ) : (
        <div className="w-full h-[60vh] text-center flex flex-col justify-center">
          <h3 className="font-bold text-xl">You don&apos;t have any tasks</h3>
          <h4 className="font-semibold text-lg text-gray-200">Click on the + button to add one</h4>
        </div>
      )}
    </div>
  );
};
