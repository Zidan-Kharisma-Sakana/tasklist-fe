import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useTask } from "@/lib/hooks/useTask";
import { useEffect } from "react";

type Input = {
  title: string;
  description: string;
  deadline: string;
};

export const AddTaskForm = (props: { closeModal: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const { addTask } = useTask();

  const onSubmit: SubmitHandler<Input> = async ({ title, description, deadline }) => {
    console.log(title, description, deadline);
    props.closeModal();
    await addTask(title, description, deadline);
  };

  return (
    <div className="w-full">
      <form className="pt-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="w-full flex justify-end mt-4">
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
