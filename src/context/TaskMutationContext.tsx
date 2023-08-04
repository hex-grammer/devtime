import axios from "axios";
import { createContext, useContext, ReactNode } from "react";
import { mutate } from "swr";

interface TaskMutationContextType {
  createNewTask: (projectId: string, taskTitle: string) => void;
}

const TaskMutationContext = createContext<TaskMutationContextType | undefined>(
  undefined
);

export const useTaskMutationContext = (): TaskMutationContextType => {
  const context = useContext(TaskMutationContext);
  if (!context) {
    throw new Error(
      "useTaskMutationContext must be used within a TaskMutationProvider"
    );
  }
  return context;
};

interface TaskMutationProviderProps {
  children: ReactNode;
}

export const TaskMutationProvider: React.FC<TaskMutationProviderProps> = ({
  children,
}) => {
  const createNewTask = (projectId: string, taskTitle: string) => {
    axios
      .post("/api/task/create", { projectId, taskTitle })
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const value: TaskMutationContextType = {
    createNewTask,
  };

  return (
    <TaskMutationContext.Provider value={value}>
      {children}
    </TaskMutationContext.Provider>
  );
};
