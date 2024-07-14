import { useTask } from "@/lib/hooks/useTask";
import { ITask, ITaskStatus } from "./type";
import { Task } from "./task";
import { useDrop } from "react-dnd";
import { LegacyRef, useEffect } from "react";

export const TaskList = () => {
  const status: ITaskStatus[] = [1, 2, 3];
  return (
    <div className="grid grid-cols-3 gap-x-4 mt-12">
      {status.map((stati) => (
        <TasksSection key={stati} status={stati} />
      ))}
    </div>
  );
};

const TasksSection = (props: { status: ITaskStatus }) => {
  const { tasks, updateTask } = useTask();
  const textMap: { [key in ITaskStatus]: string } = {
    1: "Todo tasks",
    2: "In progress tasks",
    3: "Completed tasks",
  };
  
  const changeStatus = async (id: number, status: ITaskStatus) => {
    const updatedTask = tasks.find((t) => t.id == id);
    console.log(updatedTask, status)
    if (!!updatedTask && updatedTask.status != status) {
      updateTask({ ...updatedTask, status: status });
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: any) => {
      console.log(item)
      changeStatus(item.id, props.status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [tasks]);
  return (
    <div ref={drop as unknown as LegacyRef<HTMLDivElement>} className={`px-4 py-2 ${isOver ? "bg-indigo-400" : ""}`}>
      <Header
        text={textMap[props.status]}
        bg="bg-indigo-800"
        count={tasks.filter((t) => t.status == props.status).length}
      />
      {tasks
        .filter((task) => task.status == props.status)
        .map((task) => (
          <Task key={`tasks-${task.id}`} task={task} />
        ))}
    </div>
  );
};

const Header = (props: { text: string; bg: string; count: number }) => {
  return (
    <div className={`${props.bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
      {props.text}{" "}
      <div className="ml-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-black">
        {props.count}
      </div>
    </div>
  );
};
