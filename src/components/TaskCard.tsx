// TaskCard.tsx
import React from "react";
import { type Task } from "~/utils/types";
import SubtaskCard from "./SubtaskCard";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="mb-4 rounded-md bg-white p-4 shadow-md">
      <h4 className="mb-2 text-lg font-semibold">{task.title}</h4>
      {/* Render subtasks here */}
      {task.subtasks.map((subtask) => (
        <SubtaskCard key={subtask.id} subtask={subtask} />
      ))}
    </div>
  );
};

export default TaskCard;
