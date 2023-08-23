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
import { RiDeleteBin6Line } from "react-icons/ri";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
import { NextSeo } from "next-seo";

const { confirm } = Modal;

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

  const handleDelete = async (projectId: string) => {
    console.log("Clicked delete button");
    try {
      // Make an axios DELETE request to the API endpoint and return the promise
      const deletePromise = axios.delete(`/api/project/delete?id=${projectId}`);
      await deletePromise; // Wait for the DELETE request to complete
      await mutate(`/api/project/getByUserId?userId=${user?.id ?? ""}`);
    } catch (error) {
      console.error(error);
      // Handle error here (e.g., show an error message)
    }
  };

  const showDeleteConfirm = async (title: string, projectId: string) => {
    try {
      await new Promise<void>((resolve) => {
        confirm({
          title: "Delete project",
          icon: <ExclamationCircleFilled />,
          content: `Are you sure delete '${title}'?`,
          okText: "Yes",
          okType: "danger",
          cancelText: "No",
          async onOk() {
            await handleDelete(projectId); // Wait for handleDelete to finish
            resolve(); // Resolve the promise to close the dialog
          },
          onCancel() {
            console.log("Cancel");
            resolve(); // Resolve the promise to close the dialog
          },
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NextSeo
        title="DevTime"
        openGraph={{
          type: "website",
          url: "https://devtime.rizaltsx.com",
          title: "DevTime | Project Management Tool",
          description: "A useful tool for managing your projects and tasks.",
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
            <AiOutlinePlus className="text-xl font-bold" /> New Project
          </button>
        </div>

        {/* Project Card List Section */}
        <div className="grid gap-4 px-4 py-4 sm:grid-cols-3 sm:px-32 md:grid-cols-4">
          {projects ? (
            projects.map((project, index) => (
              <div key={index} className="group relative">
                <ProjectCard project={project} />
                <button
                  className="absolute right-5 top-5 hidden scale-0 rounded-full bg-red-500 p-1.5 transition-all duration-75 hover:bg-red-600 group-hover:block group-hover:scale-125"
                  onClick={() =>
                    void showDeleteConfirm(project.title, project.id)
                  }
                >
                  <RiDeleteBin6Line className="text-xs text-white" />
                </button>
              </div>
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
    </>
  );
}
