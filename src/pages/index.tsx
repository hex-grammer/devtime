import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import useSWR, { mutate } from "swr";
import CreateProjectModal from "~/components/CreateProjectModal";
import ProjectCard from "~/components/ProjectCard";
import ProjectSkeleton from "~/components/ProjectSkeleton";
import Search from "~/components/Search";
import type { Project } from "~/utils/types";
import { AiOutlinePlus } from "react-icons/ai";

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data as Project[]);

export default function Home() {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  // Fetch projects using SWR
  const { data: projects } = useSWR<Project[]>(
    user ? `/api/project/getByUserId?userId=${user.id}` : null,
    fetcher
  );

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setNewProjectName("");
    setOpenModal(false);
  };

  const handleCreateProject = async () => {
    console.log(newProjectName);
    setConfirmLoading(true);
    try {
      // Make an axios POST request to the API endpoint
      await axios.post("/api/project/create", {
        userId: user?.id ?? "",
        title: newProjectName.trim(),
      });

      await mutate(`/api/project/getByUserId?userId=${user?.id ?? ""}`);

      // Close the modal after successful creation
      handleCancel();
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., show an error message)
    } finally {
      setConfirmLoading(false);
      setNewProjectName("");
    }
  };

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
        <button
          className="flex items-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setOpenModal(true)}
        >
          <AiOutlinePlus className="text-xl font-bold" /> New Task
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

      {/* Create Project Modal */}
      <CreateProjectModal
        open={openModal}
        onCreate={() => void handleCreateProject()}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        projectName={newProjectName}
        onProjectNameChange={setNewProjectName}
      />
    </main>
  );
}
