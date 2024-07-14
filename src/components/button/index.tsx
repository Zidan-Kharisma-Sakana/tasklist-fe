import { Tooltip } from "@mui/material";
import styles from "./button.module.css";
import classNames from "classnames";
import { Add } from "@mui/icons-material";
import Link from "next/link";

export const AddButton = (props: { onCLick: any }) => {
  return (
    <Tooltip title={"add task"} placement="left">
      <div
        onClick={props.onCLick}
        className={classNames(
          styles.addbutton,
          " cursor-pointer flex justify-center items-center fixed right-24 bottom-24 w-16 h-16 bg-indigo-300 text-white rounded-full shadow-lg transition-all hover:bg-indigo-400"
        )}
      >
        <Add />
      </div>
    </Tooltip>
  );
};
