import React from "react";
import { type Task } from "~/utils/types";
import TaskCard from "./TaskCard";
import NewTaskButton from "./NewTaskButton";
import { useTaskContext } from "~/context/AppContext";

interface KanbanSectionProps {
  title: string;
  tasks: Task[];
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ title, tasks }) => {
  const { isCreateNewTask } = useTaskContext();
  return (
    <div className="rounded-lg text-gray-100">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {title === "TO DO" && isCreateNewTask && <NewTaskButton isActive />}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {title === "TO DO" && <NewTaskButton />}
    </div>
  );
};

export default KanbanSection;
