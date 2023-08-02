import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import KanbanSection from "~/components/KanbanSection";
import StatsDetail from "~/components/StatsDetail";
import type { Project, Task } from "~/utils/types";

// Dummy data for demonstration purposes
const PROJECTS: Project = {
  id: "project1",
  title: "Build E-commerce Website",
  progress: 75,
  working_hours: 13252,
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
    {
      id: "task3",
      project_id: "project1",
      title: "Task 3",
      step: "DONE",
      working_hours: 3600,
      subtasks: [
        {
          id: "subtask6",
          task_id: "task3",
          title: "Subtask 6",
          is_done: true,
          working_hours: 3600,
        },
      ],
      lastProgress: "2023-07-28T10:00:00.000Z",
    },
    {
      id: "task4",
      project_id: "project1",
      title: "Task 4",
      step: "DONE",
      working_hours: 3600,
      subtasks: [],
      lastProgress: "2023-07-28T10:00:00.000Z",
    },
    {
      id: "task5",
      project_id: "project1",
      title: "Task 5",
      step: "TODO",
      working_hours: 3600,
      subtasks: [],
      lastProgress: "2023-07-28T10:00:00.000Z",
    },
    {
      id: "task6",
      project_id: "project1",
      title: "Task 6",
      step: "TODO",
      working_hours: 3600,
      subtasks: [],
      lastProgress: "2023-07-28T10:00:00.000Z",
    },
  ],
};

const KanbanPage: React.FC = () => {
  const router = useRouter();
  const { project_id } = router.query;
  const [projectData, setprojectData] = useState<Project | null>(PROJECTS);

  //  wait 2 seconds before setting the project data
  setTimeout(() => {
    setprojectData(PROJECTS);
  }, 0);

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
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-4 sm:px-32">
        <button
          className="transform text-3xl font-semibold text-gray-400 transition-all hover:-translate-x-1 hover:text-white"
          onClick={() => router.back()}
        >
          <FiArrowLeft />
        </button>
        <h2 className="flex-1 text-2xl font-bold text-gray-200">
          {projectData.title}
        </h2>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          + New Task
        </button>
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-4 gap-4 px-4 py-4 sm:px-32">
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
