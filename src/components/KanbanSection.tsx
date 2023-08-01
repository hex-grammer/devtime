// KanbanSection.tsx
import React from "react";
import { type Task } from "~/utils/types";
import TaskCard from "./TaskCard";

interface KanbanSectionProps {
  title: string;
  tasks: Task[];
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ title, tasks }) => {
  return (
    <div className="rounded-lg text-gray-100">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default KanbanSection;
