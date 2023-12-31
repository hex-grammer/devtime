import React from "react";
import type { Project } from "~/utils/types";
import Link from "next/link";
import ProgressCircle from "./ProgressCircle";
import { formatAverage, formatTime, formatWorkingHours } from "~/utils/utils";
import { GiSandsOfTime } from "react-icons/gi";

interface ProjectCardProps {
  project: Project; // Pass the entire project object as a prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, progress, working_hours, daySpent, id, isInProgress } =
    project;

  // Calculate the averagePerDay based on working_hours and daySpent
  const averagePerDay = Math.ceil(working_hours / (daySpent || 1));

  return (
    <Link href={`/kanban/${id}`}>
      <div className="cursor-pointer rounded-lg border-gray-500 bg-gray-900 p-4 shadow-md hover:bg-gray-950">
        {/* Title and Percentage */}
        <div className="mb-2 flex gap-2">
          <h2 className="flex flex-1 items-center gap-1 truncate text-lg font-bold text-gray-200">
            {isInProgress && (
              <span className="relative">
                <GiSandsOfTime className="absolute left-0 top-0 animate-ping text-sm text-blue-500 duration-500" />
                <GiSandsOfTime className="text-sm text-blue-500" />
              </span>
            )}
            <span>{title}</span>
          </h2>
          <ProgressCircle progress={progress} />
        </div>
        {/* working hours */}
        <div className="mb-2">
          <p className="text-xs text-gray-500">Working Hours</p>
          <div className="text-4xl font-bold text-blue-600">
            {formatTime(working_hours)}
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
              {formatTime(averagePerDay)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
