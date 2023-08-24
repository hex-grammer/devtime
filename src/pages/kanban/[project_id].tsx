import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import useSWR, { mutate } from "swr";
import KanbanList from "~/components/KanbanList";
import StatsDetail from "~/components/StatsDetail";
import { useCreateTasksContext } from "~/context/CreateTaskContext";
import { TaskMutationProvider } from "~/context/TaskMutationContext";
import type { Project } from "~/utils/types";
import { NextSeo } from "next-seo";
import PerfectScrollbar from "react-perfect-scrollbar";

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

  // is project data in progress
  const isInProgress = projectData?.tasks?.some(
    (task) => task.step === "IN_PROGRESS"
  );

  if (!projectData) {
    setIsTaskLoading(true);
  } else {
    setIsTaskLoading(false);
  }

  useEffect(() => {
    projectData && setNewProjectTitle(projectData.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setIsTaskLoading(true);
  } else {
    setIsTaskLoading(false);
  }

  return (
    <>
      <NextSeo
        title={`${isInProgress ? "[ ▶ ] " : ""}${
          projectData ? projectData?.title : "DevTime"
        }`}
        openGraph={{
          type: "website",
          url: `https://devtime.rizaltsx.com/kanban/${project_id}`,
          title: `Devtime | ${projectData?.title}`,
          description:
            "I use Devtime to manage my projects and tasks. Check it out!",
          images: [
            {
              url: "https://devtime.rizaltsx.com/img/og-image.png",
              width: 800,
              height: 600,
              alt: "DevTime Image",
            },
          ],
        }}
      />
      <main className="bg-gray-800 sm:h-screen sm:overflow-hidden sm:px-32">
        {/* Header */}
        <div className="flex h-[16vh] flex-col justify-between p-4 pb-0 sm:h-[10vh] sm:flex-row sm:items-center sm:pb-4">
          <div className="flex justify-start gap-2 sm:m-0">
            <Link
              href={"/"}
              className="transform text-3xl font-semibold text-gray-400 transition-all hover:scale-105 hover:text-gray-100"
              onClick={() => router.back()}
            >
              <MdDashboard />
            </Link>
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
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-4">
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
    </>
  );
};

export default KanbanPage;
