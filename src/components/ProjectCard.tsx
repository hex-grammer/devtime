import React from "react";
import { formatWorkingHours } from "~/utils/formatWorkingHours";
import type { Project } from "~/utils/types";

interface ProjectCardProps {
  project: Project; // Pass the entire project object as a prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, progress, working_hours, daySpent } = project;

  // Calculate the averagePerDay based on working_hours and daySpent
  const averagePerDay = Math.ceil(working_hours / (daySpent || 1)); // Ensure daySpent is not 0

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <div className="mb-4">
        <p className="text-gray-600">Progress: {progress}%</p>
        <p className="text-gray-600">
          Working Hours: {formatWorkingHours(working_hours)}
        </p>
        <p className="text-gray-600">Days Spent: {daySpent} days</p>
        <p className="text-gray-600">
          Avg. (per day): {formatWorkingHours(averagePerDay)}
        </p>
      </div>
      {/* Add any additional content or buttons specific to the project card */}
    </div>
  );
};

export default ProjectCard;
