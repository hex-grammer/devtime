import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import useSWR from "swr";
import ProjectCard from "~/components/ProjectCard";
import ProjectSkeleton from "~/components/ProjectSkeleton";
import Search from "~/components/Search";
import type { Project } from "~/utils/types";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as Project[]);

export default function Home() {
  const { user } = useUser();
  // Fetch projects using SWR
  const { data: projects } = useSWR<Project[]>(
    user ? `/api/project/getByUserId?userId=${user.id}` : null,
    fetcher
  );

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
        {projects ? (
          projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <ProjectSkeleton number={4} />
        )}
      </div>
    </main>
  );
}
