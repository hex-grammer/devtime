import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import useSWR, { mutate } from "swr";
import KanbanSection from "~/components/KanbanSection";
import StatsDetail from "~/components/StatsDetail";
import { useTaskContext, useTaskLoadingContext } from "~/context/AppContext";
import { TaskMutationProvider } from "~/context/TaskMutationContext";
import type { Project, Task } from "~/utils/types";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data as Project;
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { setIsCreateNewTask } = useTaskContext();
  const { setIsTaskLoading } = useTaskLoadingContext();
  const { project_id } = router.query as { project_id: string };
  const [editTitle, setEditTitle] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");

  const { data: projectData } = useSWR<Project>(
    `/api/task/get-all?projectId=${project_id}`,
    fetcher
  );

  if (!projectData) {
    setIsTaskLoading(true);
  } else {
    setIsTaskLoading(false);
  }

  useEffect(() => {
    projectData && setNewProjectTitle(projectData.title);
  }, []);

  const tasks: Task[] = projectData?.tasks ?? [];

  const todoTasks = tasks.filter((task) => task.step === "TODO");
  const inProgressTasks = tasks.filter((task) => task.step === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.step === "DONE");

  const handleEditTitle = async () => {
    // return if task title is empty
    if (!newProjectTitle) {
      return setEditTitle(false);
    }

    // create a new task
    await axios.post("/api/project/update-title", {
      projectId: projectData?.id,
      newTitle: newProjectTitle,
    });

    await mutate(`/api/task/get-all?projectId=${project_id}`);

    setEditTitle(false);
  };

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
            {editTitle ? (
              <input
                type="text"
                className="m-0 truncate border-b bg-gray-800 text-left text-gray-200 outline-none"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                onBlur={() => void handleEditTitle()}
                onKeyDown={(event) =>
                  event.key === "Enter" && void handleEditTitle()
                }
                autoFocus
              />
            ) : (
              <div
                className="w-full cursor-pointer truncate"
                onClick={() => setEditTitle(true)}
              >
                {projectData?.title}
              </div>
            )}
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
      <TaskMutationProvider>
        <div className="grid gap-4 px-4 py-4 sm:grid-cols-4 sm:px-32">
          {/* TODO */}
          <KanbanSection
            projectId={projectData?.id ?? ""}
            title="TO DO"
            tasks={todoTasks}
          />

          {/* IN_PROGRESS */}
          <KanbanSection
            projectId={projectData?.id ?? ""}
            title="IN PROGRESS"
            tasks={inProgressTasks}
          />

          {/* DONE */}
          <KanbanSection
            projectId={projectData?.id ?? ""}
            title="DONE"
            tasks={doneTasks}
          />

          {/* STATS */}
          <div>
            <h3 className="mb-2 text-xl font-bold text-gray-200">STATS</h3>
            <StatsDetail projectData={projectData} />
          </div>
        </div>
      </TaskMutationProvider>
    </main>
  );
};

export default KanbanPage;
