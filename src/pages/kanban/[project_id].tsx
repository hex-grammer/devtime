import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import KanbanSection from "~/components/KanbanSection";
import type { Project, Task } from "~/utils/types";

// Dummy data for demonstration purposes
const PROJECTS: Project = {
  id: "project1",
  title: "Build E-commerce Website",
  progress: 75,
  working_hours: 132,
  daySpent: 3,
  started_at: "2023-03-15T00:00:00.000Z",
  numberOfTasks: 2,
  lastProgress: null,
  tasks: [
    {
      id: "task1",
      project_id: "project1",
      title: "Task 1",
      step: "TODO",
      working_hours: 3600,
      subtasks: [
        {
          id: "subtask1",
          task_id: "task1",
          title: "Subtask 1",
          is_done: false,
          working_hours: 1800,
        },
        {
          id: "subtask2",
          task_id: "task1",
          title: "Subtask 2",
          is_done: true,
          working_hours: 2700,
        },
        {
          id: "subtask3",
          task_id: "task1",
          title: "Subtask 3",
          is_done: false,
          working_hours: 3600,
        },
      ],
      lastProgress: null,
    },
    {
      id: "task2",
      project_id: "project1",
      title: "Task 2",
      step: "IN_PROGRESS",
      working_hours: 7200,
      subtasks: [
        {
          id: "subtask4",
          task_id: "task2",
          title: "Subtask 4",
          is_done: false,
          working_hours: 1200,
        },
        {
          id: "subtask5",
          task_id: "task2",
          title: "Subtask 5",
          is_done: false,
          working_hours: 1800,
        },
      ],
      lastProgress: "2023-07-28T10:00:00.000Z",
    },
  ],
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const { project_id } = router.query;
  const [projectData, setprojectData] = useState<Project | null>(null);

  //  wait 2 seconds before setting the project data
  setTimeout(() => {
    setprojectData(PROJECTS);
  }, 1000);

  // log project_id in useEffect
  useEffect(() => {
    console.log(project_id);
  }, [project_id]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const tasks: Task[] = projectData.tasks!;

  const todoTasks = tasks.filter((task) => task.step === "TODO");
  const inProgressTasks = tasks.filter((task) => task.step === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.step === "DONE");

  return (
    <main className="min-h-screen bg-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-32">
        <h1 className="text-3xl font-bold text-gray-200">DevTime</h1>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="text-lg font-semibold text-gray-300">
              {user.fullName}
            </div>
          ) : (
            // div skeleton with animate-pulse
            <div className="h-8 w-32 animate-pulse rounded-md bg-gray-700" />
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center justify-between gap-2 px-4 py-2 sm:px-32">
        {/* back button */}
        <button
          className="transform text-3xl font-semibold text-gray-400 transition-all hover:-translate-x-1 hover:text-white"
          onClick={() => router.back()}
        >
          <FiArrowLeft />
        </button>
        <h2 className="flex-1 text-2xl font-bold text-gray-200">
          {projectData.title} ({projectData.progress}%)
        </h2>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          + New Project
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-3 gap-4 px-4 py-4 sm:px-32">
        {/* TODO */}
        <KanbanSection title="TODO" tasks={todoTasks} />

        {/* IN_PROGRESS */}
        <KanbanSection title="IN_PROGRESS" tasks={inProgressTasks} />

        {/* DONE */}
        <KanbanSection title="DONE" tasks={doneTasks} />
      </div>
    </main>
  );
};

export default KanbanPage;
