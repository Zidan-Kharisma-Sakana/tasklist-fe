import { useContext } from "react";
import { TaskContext } from "../contexts/tasks";

export const useTask = ()=> useContext(TaskContext)