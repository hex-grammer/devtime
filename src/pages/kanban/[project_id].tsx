import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import useSWR, { mutate } from "swr";
import StatsDetail from "~/components/StatsDetail";
import { useCreateTasksContext } from "~/context/CreateTaskContext";
import { TaskMutationProvider } from "~/context/TaskMutationContext";
import type { Project, Task } from "~/utils/types";
import { NextSeo } from "next-seo";
import { useMediaQuery } from "react-responsive";
import KanbanSection from "~/components/KanbanSection";
import { Tabs } from "antd";
import React from "react";
import { useGetTasksContext } from "~/context/GetTaskContext";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data as Project;
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { project_id } = router.query as { project_id: string };
  const { setIsTaskLoading, setIsCreateNewTask } = useCreateTasksContext();
  const [domLoaded, setDomLoaded] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const { tasks, setTasks } = useGetTasksContext();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [todoTasks, setTodoTasks] = useState<Task[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const { data: dbProjectData } = useSWR<Project>(
    `/api/task/get-all?projectId=${project_id}`,
    fetcher
  );

  // is project data in progress
  const isInProgress = dbProjectData?.tasks?.some(
    (task) => task.step === "IN_PROGRESS"
  );

  if (!dbProjectData) {
    setIsTaskLoading(true);
  } else {
    setIsTaskLoading(false);
    tasks.length === 0 && setTasks(dbProjectData?.tasks ?? []);
    // localStorage.setItem("tasks", JSON.stringify(projectData?.tasks ?? []));
  }

  useEffect(() => {
    dbProjectData && setNewProjectTitle(dbProjectData.title);
    setDomLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use effect on dbProjectData change
  useEffect(() => {
    if (dbProjectData) {
      setTasks(dbProjectData.tasks ?? []);
      // console.log("dbProjectData", dbProjectData.tasks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbProjectData]);

  const handleEditTitle = async () => {
    // return if task title is empty
    if (!newProjectTitle) {
      return setEditTitle(false);
    }

    // create a new task
    await axios.post("/api/project/update-title", {
      projectId: dbProjectData?.id,
      newTitle: newProjectTitle,
    });

    await mutate(`/api/task/get-all?projectId=${project_id}`);

    setEditTitle(false);
  };

  useEffect(() => {
    setTodoTasks([...tasks.filter((task) => task.step === "TODO")]);
    setInProgressTasks([
      ...tasks.filter((task) => task.step === "IN_PROGRESS"),
    ]);
    setDoneTasks([...tasks.filter((task) => task.step === "DONE")]);
  }, [tasks]);

  const Label = ({ title }: { title: string }) => (
    <span className="font-semibold text-gray-300">{title}</span>
  );

  const tabsContent = [
    {
      label: <Label title="TO DO" />,
      key: "1",
      children: (
        <KanbanSection
          projectId={project_id}
          title="TO DO"
          tasks={todoTasks ?? []}
        />
      ),
    },
    {
      label: <Label title="IN PROGRESS" />,
      key: "2",
      children: (
        <KanbanSection
          projectId={project_id}
          title="IN PROGRESS"
          tasks={inProgressTasks ?? []}
        />
      ),
    },
    {
      label: <Label title="DONE" />,
      key: "3",
      children: (
        <KanbanSection
          projectId={project_id}
          title="DONE"
          tasks={doneTasks ?? []}
        />
      ),
    },
    {
      label: <Label title="STATS" />,
      key: "4",
      children: (
        <div>
          {!isTabletOrMobile && (
            <h3 className="mb-2 text-xl font-bold text-gray-200">STATS</h3>
          )}
          <StatsDetail projectData={dbProjectData} />
        </div>
      ),
    },
  ];

  return (
    <>
      <NextSeo
        title={`${isInProgress ? "[ ▶ ] " : ""}${
          dbProjectData ? dbProjectData?.title : "DevTime"
        }`}
        openGraph={{
          type: "website",
          url: `https://devtime.rizaltsx.com/kanban/${project_id}`,
          title: `Devtime | ${dbProjectData?.title}`,
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
      <main className="h-screen overflow-hidden bg-gray-800 sm:px-32">
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
                  {dbProjectData?.title}
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
            {isTabletOrMobile && domLoaded ? (
              <Tabs defaultActiveKey="1" centered items={tabsContent} />
            ) : (
              <>
                {domLoaded &&
                  tabsContent.map((tabContent, index) => (
                    <React.Fragment key={index}>
                      {tabContent.children}
                    </React.Fragment>
                  ))}
              </>
            )}
          </div>
        </TaskMutationProvider>
      </main>
    </>
  );
};

export default KanbanPage;
