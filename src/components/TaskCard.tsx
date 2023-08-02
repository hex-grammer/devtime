// TaskCard.tsx
import React from "react";
import { type Task } from "~/utils/types";
import SubtaskCard from "./SubtaskCard";
import { formatTime } from "~/utils/formatiTime";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const isSubTask = task.subtasks.length > 0;
  return (
    <div
      className={`mb-1 rounded-md bg-gray-700 p-2 shadow-md ${
        isSubTask ? "py-2" : "py-1"
      }`}
    >
      <h4 className="flex justify-between font-semibold">
        {task.title}
        <span className="ml-2 text-sm font-normal text-gray-400">
          {formatTime(task.working_hours)}
        </span>
      </h4>
      {/* Render subtasks here */}
      {isSubTask && <hr className="my-1 border-gray-500" />}
      {task.subtasks.map((subtask) => (
        <SubtaskCard key={subtask.id} subtask={subtask} />
      ))}
    </div>
  );
};

export default TaskCard;
