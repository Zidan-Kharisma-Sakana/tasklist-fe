import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import { AddTaskForm } from "../form/add-task";

export const AddTask = (props: { open: boolean; close: any }) => {
  return (
    <div className="">
      <Modal open={props.open} onClose={props.close}>
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-white rounded-xl w-4/5 lg:w-1/2">
          <div className="flex justify-between items-center">
            <h2>Add New Task</h2>
            <div onClick={props.close} className="cursor-pointer rounded-full">
              <Close />
            </div>
          </div>
          <div className="border my-2" />
          <AddTaskForm closeModal={props.close} />
        </div>
      </Modal>
    </div>
  );
};
