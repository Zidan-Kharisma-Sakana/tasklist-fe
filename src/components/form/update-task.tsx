import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Modal } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useTask } from "@/lib/hooks/useTask";
import { useEffect, useState } from "react";
import { ITask } from "../tasks/type";
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";

type Input = {
  title: string;
  description: string;
  deadline: string;
};

export const UpdateTaskForm = (props: { closeModal: any; task: ITask }) => {
  const date = props.task.deadline as unknown as string;
  const { updateTask, deleteTask, loading } = useTask();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      deadline: date ?? "",
      description: props.task.description,
      title: props.task.title,
    },
  });

  const [open, setOpen] = useState(false);

  const confirmeDelete = async () => {
    setOpen(false);
    props.closeModal();
    toast.loading("Saving task...");
    await deleteTask(props.task.id);
    toast.dismiss();
  };

  const onSubmitUpdate: SubmitHandler<Input> = async ({ title, description, deadline }) => {
    console.log(title, description, deadline);
    props.closeModal();
    toast.loading("Saving task...");
    await updateTask({
      ...props.task,
      title,
      description,
      deadline: deadline as any
    });
    toast.dismiss()
  };

  return (
    <div className="w-full">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-xl w-1/2 lg:w-1/3 text-center">
          <h2 className="text-xl font-semibold">Confirm Delete Task</h2>
          <div className="grid grid-cols-2 gap-x-8 mt-8">
            <div
              onClick={() => setOpen(false)}
              className="w-full cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              No, Go Back
            </div>
            <div
              onClick={confirmeDelete}
              className="w-full cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Yes, Delete Task
            </div>
          </div>
        </div>
      </Modal>
      <form className="pt-4 w-full" onSubmit={handleSubmit(onSubmitUpdate)}>
        <div className="w-full grid grid-cols-6 gap-4">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Title*
          </label>
          <Input
            className="w-full col-span-5 px-2"
            type="text"
            id="title"
            placeholder="Finish homework..."
            required
            {...register("title")}
          />
          <label htmlFor="deadline" className="block mb-2 text-sm font-medium">
            Deadline
          </label>
          <div className="col-span-5">
            <Input id="deadline" className="px-2" type="datetime-local" {...register("deadline")} />
          </div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium">
            Description
          </label>
          <TextareaAutosize
            id="description"
            placeholder="insert description..."
            className="col-span-5 border px-2 py-1"
            minRows={5}
            {...register("description")}
          />
        </div>
        <div className="w-full flex justify-between mt-4">
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <Delete />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
