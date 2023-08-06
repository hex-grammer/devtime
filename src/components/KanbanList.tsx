import React, { useEffect, useState } from "react";
import KanbanSection from "./KanbanSection";
import { useGetTasksContext } from "~/context/GetTaskContext";
import { type Task } from "~/utils/types";

// KanbanListType
interface KanbanListType {
  projectId: string;
  initialTasks: Task[];
}

const KanbanList: React.FC<KanbanListType> = ({ projectId, initialTasks }) => {
  const { tasks: taskContext, setTasks: setTasksContext } =
    useGetTasksContext();
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasksContext(initialTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTasks]);

  // update tasks when taskContext change
  useEffect(() => {
    setTasks(taskContext);
  }, [taskContext]);

  const todoTasks = tasks.filter((task) => task.step === "TODO");
  const inProgressTasks = tasks.filter((task) => task.step === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.step === "DONE");

  return (
    <>
      {/* TODO */}
      <KanbanSection projectId={projectId} title="TO DO" tasks={todoTasks} />

      {/* IN_PROGRESS */}
      <KanbanSection
        projectId={projectId}
        title="IN PROGRESS"
        tasks={inProgressTasks}
      />

      {/* DONE */}
      <KanbanSection projectId={projectId} title="DONE" tasks={doneTasks} />
    </>
  );
};

export default KanbanList;
