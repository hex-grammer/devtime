import React from "react";
import { type Task } from "~/utils/types";
import TaskCard from "./TaskCard";
import NewTaskButton from "./NewTaskButton";
import { useCreateTasksContext } from "~/context/CreateTaskContext";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useMediaQuery } from "react-responsive";

interface KanbanSectionProps {
  title: string;
  tasks: Task[];
  projectId: string;
}

const KanbanSection: React.FC<KanbanSectionProps> = ({
  title,
  tasks,
  projectId,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const { isCreateNewTask, isTaskLoading } = useCreateTasksContext();

  return (
    <div className="rounded-lg text-gray-100">
      {!isTabletOrMobile && (
        <h3 className="mb-2 flex items-end justify-between text-xl font-semibold">
          {title}
        </h3>
      )}
      <div className="h-[70vh] overflow-auto sm:h-[80vh]">
        <PerfectScrollbar>
          {/* skeleton if isTaskLoading */}
          {isTaskLoading && (
            <div className="animate-pulse">
              <div className="mb-2 h-8 rounded-md bg-gray-700" />
            </div>
          )}
          {title === "TO DO" && isCreateNewTask && (
            <NewTaskButton isActive projectId={projectId} order="first" />
          )}
          {tasks
            .slice() // Create a shallow copy of the array to avoid mutating the original
            .sort((a, b) => a.order - b.order) // Sort tasks by order in ascending order
            .map((task) => (
              <TaskCard key={task.id} task={task} projectId={projectId} />
            ))}
          {title === "TO DO" && (
            <NewTaskButton projectId={projectId} order="last" />
          )}
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default KanbanSection;
