import { useRouter } from "next/router";
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { AxiosClient, setToken } from "../client/axios";
import { AxiosError } from "axios";
import { ITask, ITaskStatus } from "@/components/tasks/type";
import update from "immutability-helper";

interface TaskContextType {
  tasks: ITask[];
  loading: boolean;
  updateTask: (updated_task: ITask) => Promise<void>;
  changeOrder: (dragIndex: number, dropIndex: number) => Promise<void>;
  addTask: (title: string, description: string, deadline: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  queryTasks: () => Promise<void>;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export function TaskProvider({ children }: { children: ReactNode }): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const queryTasks = async () => {
    await AxiosClient.get("/task")
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
      })
      .catch((error: AxiosError) => {
        console.error(error);
        toast.error("Error fetching tasks");
      });
  };

  const deleteTask = useCallback(
    async (id: number) => {
      const old_task = [...tasks];
      setTasks((prev) => prev.filter((task) => task.id != id));
      setLoading(true);
      await AxiosClient.delete(`/task/${id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          setTasks(old_task);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [tasks]
  );

  const updateTask = async (updated_task: ITask) => {
    const old_task = [...tasks];
    const toast_id = toast.loading("saving task...");
    setLoading(true);
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id == updated_task.id) {
          return updated_task;
        }
        return task;
      })
    );
    await AxiosClient.patch(`/task/${updated_task.id}`, updated_task)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err: AxiosError) => {
        toast.error("Error saving task");
        setTasks(old_task);
        console.error(err);
      })
      .finally(() => {
        toast.dismiss(toast_id);
        setLoading(false);
      });
  };

  const changeOrder = useCallback(
    async (dragIndex: number, hoverIndex: number) => {
      const dragCard = tasks[dragIndex];
      setTasks(
        update(tasks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [tasks]
  );

  const addTask = useCallback(
    async (title: string, description: string, deadline: string) => {
      const toast_id = toast.loading("adding task...");
      const old_tasks = [...tasks];
      setTasks([...tasks, { title, description, deadline: deadline ?? null, status: 1 } as any]);
      await AxiosClient.post("/task", { title, description, deadline })
        .then((response) => {
          setTasks([...old_tasks, response.data]);
        })
        .catch((error: AxiosError) => {
          console.error(error);
          toast.error("Error saving task");
          setTasks(old_tasks);
        })
        .finally(() => {
          toast.dismiss(toast_id);
        });
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        changeOrder,
        updateTask,
        addTask,
        queryTasks,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

const t: ITask[] = [
  {
    id: 1,
    title: "title 1",
    status: 1,
    description: "desc",
    deadline: new Date("2024/06/9"),
  },
  {
    id: 2,
    title: "title 2",
    status: 1,
    description: "desc",
    deadline: new Date("2024/07/6"),
  },
  {
    id: 3,
    title: "title 3",
    status: 1,
    description: "desc",
    deadline: new Date("2024/07/9"),
  },
  {
    id: 4,
    title: "title 4",
    status: 1,
    description: "desc",
    deadline: new Date("2024/07/9"),
  },
];
