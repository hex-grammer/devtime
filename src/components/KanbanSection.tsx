import React from "react";
import { type Task } from "~/utils/types";
import TaskCard from "./TaskCard";
import NewTaskButton from "./NewTaskButton";
import { useTaskContext, useTaskLoadingContext } from "~/context/AppContext";

interface KanbanSectionProps {
  title: string;
  tasks: Task[];
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ title, tasks }) => {
  const { isCreateNewTask } = useTaskContext();
  const { isTaskLoading } = useTaskLoadingContext();
  return (
    <div className="rounded-lg text-gray-100">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {/* skeleton if isTaskLoading */}
      {isTaskLoading && (
        <div className="animate-pulse">
          <div className="mb-2 h-8 rounded-md bg-gray-700" />
        </div>
      )}
      {title === "TO DO" && isCreateNewTask && <NewTaskButton isActive />}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {title === "TO DO" && <NewTaskButton />}
    </div>
  );
};

export default KanbanSection;
