import React from "react";
import { formatWorkingHours } from "~/utils/formatWorkingHours";
import type { Project } from "~/utils/types";
import { Circle } from "rc-progress";
import { formatAverage } from "~/utils/formatAverage";
import Link from "next/link";

interface ProjectCardProps {
  project: Project; // Pass the entire project object as a prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, progress, working_hours, daySpent, id } = project;

  // Calculate the averagePerDay based on working_hours and daySpent
  const averagePerDay = Math.ceil(working_hours / (daySpent || 1));

  return (
    <Link href={`/kanban/${id}`}>
      <div className="cursor-pointer rounded-lg border-gray-500 bg-gray-900 p-4 shadow-md hover:border hover:bg-gray-950">
        {/* Title and Percentage */}
        <div className="mb-2 flex gap-2">
          <h2 className="flex-1 truncate text-lg font-bold text-gray-200">
            {title}
          </h2>
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[10px] font-semibold text-gray-400">
                {progress}%
              </div>
            </div>
            <Circle
              percent={progress}
              strokeWidth={10}
              trailWidth={4}
              trailColor="#D3D3D388"
              strokeColor="#2383E2"
            />
          </div>
        </div>
        {/* working hours */}
        <div className="mb-2">
          <p className="text-xs text-gray-500">Working Hours</p>
          <div className="text-4xl font-bold text-blue-600">
            {formatWorkingHours(working_hours)}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="">
            <p className="text-xs text-gray-500">Days Spent</p>
            <div className="text-xl text-gray-400">{daySpent} days</div>
          </div>
          <div className="">
            <p className="text-xs text-gray-500">Avg. (per day)</p>
            <div className="text-xl text-gray-400">
              {formatAverage(averagePerDay)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
