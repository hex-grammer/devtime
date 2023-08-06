import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import useSWR, { mutate } from "swr";
import KanbanList from "~/components/KanbanList";
import StatsDetail from "~/components/StatsDetail";
import { useCreateTasksContext } from "~/context/CreateTaskContext";
import { TaskMutationProvider } from "~/context/TaskMutationContext";
import type { Project } from "~/utils/types";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data as Project;
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { project_id } = router.query as { project_id: string };
  const { setIsTaskLoading, setIsCreateNewTask } = useCreateTasksContext();
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

  // when project data change
  // setTasks(projectData?.tasks ?? []);
  // useEffect(() => {
  //   setTasks(projectData?.tasks ?? []);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [projectData]);

  useEffect(() => {
    projectData && setNewProjectTitle(projectData.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const tasks: Task[] = projectData?.tasks ?? [];

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

  if (!projectData) {
    return <div>Loading...</div>;
  }

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
          <KanbanList
            projectId={project_id}
            initialTasks={projectData?.tasks ?? []}
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
