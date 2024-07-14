import { LegacyRef, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ITask } from "./type";
import { useTask } from "@/lib/hooks/useTask";
import { Modal } from "@mui/material";
import { Close, Edit } from "@mui/icons-material";
import { UpdateTaskForm } from "../form/update-task";

export function Task(props: { task: ITask }) {
  const { loading } = useTask();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: props.task.id },
      canDrag: !loading,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [loading]
  );
  const [timeLeft, color] = getTime(props.task.deadline);
  const [open, setOpen] = useState(false);
  const shortTitle = props.task.title.length > 20 ? `${props.task.title.slice(0, 20)}...`: props.task.title
  return (
    <div
      onDoubleClick={()=>setOpen(true)}
      className={`my-2 text-indigo-900 ${loading ? "cursor-not-allowed" : "cursor-pointer"} break-words`}
      ref={drag as unknown as LegacyRef<HTMLDivElement>}
    >
      <div className={`${isDragging ? "opacity-50" : "opacity-100"} bg-gray-200 rounded-lg p-4`}>
        <div className="flex flex-row-reverse">
          {props.task.deadline && props.task.status != 3 && <div className={`${color} py-1 px-2 rounded-lg text-white text-xs`}>{timeLeft}</div>}
        </div>
        <div className="w-full grid grid-cols-6 gap-2 mt-2">
          <div className="text-lg capitalize col-span-5">{shortTitle}</div>
          <div className="flex justify-end" onClick={() => setOpen(true)}>
            <Edit />
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-xl w-4/5 lg:w-1/2">
          <div className="flex justify-between items-center">
            <h2>Task</h2>
            <div onClick={() => setOpen(false)} className="cursor-pointer rounded-full">
              <Close />
            </div>
          </div>
          <div className="border my-2" />
          <UpdateTaskForm closeModal={() => setOpen(false)} task={props.task} />
        </div>
      </Modal>
    </div>
  );
}
const getTime = (date: Date) => {
  if (!date) {
    return [];
  }
  const seconds = Math.floor((new Date(date).getTime() - new Date().getTime()) / 1000);
  if (seconds < 0) {
    return ["lewat deadline", "bg-red-500"];
  }
  var days = Math.floor(seconds / 24 / 60 / 60);
  if (days > 0) {
    return [`${days} hari tersisa`, "bg-green-500"];
  }
  var hoursLeft = Math.floor(seconds - days * 86400);
  var hours = Math.floor(hoursLeft / 3600);

  return [`${hours > 0 ? `${hours} jam tersisa` : "menjelang deadline"}`, "bg-orange-500"];
};
