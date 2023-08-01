import { UserButton, useUser } from "@clerk/nextjs";
import ProjectCard from "~/components/ProjectCard";
import type { Project } from "~/utils/types";

const PROJECTS: Project[] = [
  {
    id: "project1",
    title: "Project 1",
    progress: 70,
    working_hours: 132,
    daySpent: 3,
    started_at: "2023-03-15T00:00:00.000Z",
    numberOfTasks: 2,
    lastProgress: null,
  },
  {
    id: "project2",
    title: "Project 2",
    progress: 50,
    working_hours: 9300,
    daySpent: 7,
    started_at: "2023-04-10T00:00:00.000Z",
    numberOfTasks: 2,
    lastProgress: null,
  },
  // Add more projects as needed
];

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <main className="min-h-screen bg-gray-100">
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white px-8 py-4">
          <h1 className="text-3xl font-bold">DevTime</h1>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold text-gray-500">
              {user.fullName}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-between bg-gray-200 px-8 py-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 rounded-md px-4 py-2"
          />
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white">
            + New Project
          </button>
        </div>

        {/* Project Card List Section */}
        <div className="grid gap-4 bg-gray-100 px-8 py-8 sm:grid-cols-3 md:grid-cols-4">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
    </>
  );
}
