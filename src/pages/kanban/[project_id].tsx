import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlinePlus } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import useSWR from "swr";
import KanbanSection from "~/components/KanbanSection";
import StatsDetail from "~/components/StatsDetail";
import { useTaskContext, useTaskLoadingContext } from "~/context/AppContext";
import type { Project, Task } from "~/utils/types";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data as Project;
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setIsCreateNewTask } = useTaskContext();
  const { setIsTaskLoading } = useTaskLoadingContext();
  const { project_id } = router.query as { project_id: string };

  const { data: projectData } = useSWR<Project>(
    `/api/task/get-all?userId=${user?.id}&projectId=${project_id}`,
    fetcher
  );

  if (!projectData) {
    setIsTaskLoading(true);
  } else {
    setIsTaskLoading(false);
  }

  const tasks: Task[] = projectData?.tasks ?? [];

  const todoTasks = tasks.filter((task) => task.step === "TODO");
  const inProgressTasks = tasks.filter((task) => task.step === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.step === "DONE");

  return (
    <main className="min-h-screen bg-gray-800">
      {/* Header */}
      <div className="flex flex-col items-center justify-between gap-2 p-4 pb-0 sm:flex-row sm:px-32 sm:pb-4">
        <div className="mb-4 flex justify-start gap-2 sm:m-0">
          <button
            className="transform text-3xl font-semibold text-gray-400 transition-all hover:-translate-x-1 hover:text-white"
            onClick={() => router.back()}
          >
            <FiArrowLeft />
          </button>
          <h2 className="flex-1 text-2xl font-bold text-gray-200">
            {projectData?.title}
          </h2>
        </div>
        <button
          className="flex w-full items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-fit"
          onClick={() => void setIsCreateNewTask(true)}
        >
          <AiOutlinePlus className="text-xl font-bold" /> New Task
        </button>
      </div>

      {/* Kanban */}
      <div className="grid gap-4 px-4 py-4 sm:grid-cols-4 sm:px-32">
        {/* TODO */}
        <KanbanSection title="TO DO" tasks={todoTasks} />

        {/* IN_PROGRESS */}
        <KanbanSection title="IN PROGRESS" tasks={inProgressTasks} />

        {/* DONE */}
        <KanbanSection title="DONE" tasks={doneTasks} />

        {/* STATS */}
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-200">STATS</h3>
          <StatsDetail projectData={projectData} />
        </div>
      </div>
    </main>
  );
};

export default KanbanPage;
