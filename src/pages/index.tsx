import { AddButton } from "@/components/button";
import { TasksPanel } from "@/components/tasks";
import { AddTask } from "@/components/tasks/add";
import { TaskProvider } from "@/lib/contexts/tasks";
import { guardAuthenticated } from "@/lib/utils/guardAuthenticated";
import { Add, AddRoadOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  const [taskModal, setTaskModal] = useState(false);
  return (
    <main className="">
      <TaskProvider>
        <TasksPanel />
        <AddTask open={taskModal} close={() => setTaskModal(false)} />
      </TaskProvider>
      <AddButton onCLick={() => setTaskModal(true)} />
    </main>
  );
}
export default guardAuthenticated(Home);
