// KanbanSection.tsx
import React from "react";
import { type Task } from "~/utils/types";
import TaskCard from "./TaskCard";
import NewTaskButton from "./NewTaskButton";
import { useTaskContext } from "~/context/AppContext";
import { AiOutlinePlus } from "react-icons/ai";

interface KanbanSectionProps {
  title: string;
  tasks: Task[];
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ title, tasks }) => {
  const { isCreateNewTask, setIsCreateNewTask } = useTaskContext();
  return (
    <div className="rounded-lg text-gray-100">
      <h3 className="mb-2 flex justify-between text-xl font-semibold">
        {title}
        {/* {title === "TO DO" && (
          <button
            className="flex items-center gap-1 rounded-md bg-blue-600 p-1.5 py-1 text-white hover:bg-blue-700"
            onClick={() => void setIsCreateNewTask(true)}
          >
            <AiOutlinePlus className="text-xl" />
          </button>
        )} */}
      </h3>
      {title === "TO DO" && isCreateNewTask && <NewTaskButton isActive />}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {title === "TO DO" && <NewTaskButton />}
    </div>
  );
};

export default KanbanSection;
