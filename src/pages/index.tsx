import { UserButton, useUser } from "@clerk/nextjs";
import ProjectCard from "~/components/ProjectCard";
import Search from "~/components/Search";
import type { Project } from "~/utils/types";

const PROJECTS: Project[] = [
  {
    id: "project1",
    title: "Build E-commerce Website",
    progress: 75,
    working_hours: 132,
    daySpent: 3,
    started_at: "2023-03-15T00:00:00.000Z",
    numberOfTasks: 2,
    lastProgress: null,
  },
  {
    id: "project2",
    title: "Mobile App Development",
    progress: 50,
    working_hours: 9300,
    daySpent: 7,
    started_at: "2023-04-10T00:00:00.000Z",
    numberOfTasks: 2,
    lastProgress: null,
  },
  {
    id: "project3",
    title: "Website Redesign",
    progress: 25,
    working_hours: 5325,
    daySpent: 5,
    started_at: "2023-06-20T00:00:00.000Z",
    numberOfTasks: 1,
    lastProgress: null,
  },
  {
    id: "project4",
    title: "Data Analysis Tool",
    progress: 90,
    working_hours: 6720,
    daySpent: 12,
    started_at: "2023-05-10T00:00:00.000Z",
    numberOfTasks: 3,
    lastProgress: null,
  },
  {
    id: "project5",
    title: "Game Development",
    progress: 100,
    working_hours: 125172,
    daySpent: 3,
    started_at: "2023-07-01T00:00:00.000Z",
    numberOfTasks: 5,
    lastProgress: null,
  },
  {
    id: "project6",
    title: "Software Testing",
    progress: 40,
    working_hours: 4800,
    daySpent: 10,
    started_at: "2023-06-15T00:00:00.000Z",
    numberOfTasks: 2,
    lastProgress: null,
  },
];

export default function Home() {
  const { user } = useUser();
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
      <div className="flex items-center justify-between gap-4 px-4 py-2 sm:px-32">
        <Search />
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          + New Project
        </button>
      </div>

      {/* Project Card List Section */}
      <div className="grid gap-4 px-4 py-4 sm:grid-cols-3 sm:px-32 md:grid-cols-4">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </main>
  );
}
