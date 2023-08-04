import axios from "axios";
import { createContext, useContext, type ReactNode } from "react";
import { mutate } from "swr";

interface TaskMutationContextType {
  createNewTask: (
    projectId: string,
    taskTitle: string,
    order: "first" | "last"
  ) => void;
  updateTitle: (projectId: string, taskId: string, taskTitle: string) => void;
  updateProgress: (
    projectId: string,
    taskId: string,
    progress: "TODO" | "IN_PROGRESS" | "DONE"
  ) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  updateWorkingHours: (
    projectId: string,
    taskId: string,
    workingHours: number
  ) => void;
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
  const createNewTask = (
    projectId: string,
    taskTitle: string,
    order: "first" | "last"
  ) => {
    axios
      .post("/api/task/create", { projectId, taskTitle, order })
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const updateTitle = (
    projectId: string,
    taskId: string,
    taskTitle: string
  ) => {
    axios
      .put(`/api/task/update`, { taskId, taskTitle })
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const updateProgress = (
    projectId: string,
    taskId: string,
    progress: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    axios
      .put(`/api/task/updateProgress`, { taskId, progress })
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error updating progress:", error);
      });
  };

  const deleteTask = (projectId: string, taskId: string) => {
    axios
      .delete(`/api/task/delete?taskId=${taskId}`)
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const updateWorkingHours = (
    projectId: string,
    taskId: string,
    workingHours: number
  ) => {
    axios
      .put(`/api/task/updateWorkingHours`, { taskId, workingHours })
      .then(async () => {
        await mutate(`/api/task/get-all?projectId=${projectId}`);
      })
      .catch((error) => {
        console.error("Error updating working hours:", error);
      });
  };

  const value: TaskMutationContextType = {
    createNewTask,
    updateTitle,
    updateProgress,
    deleteTask,
    updateWorkingHours,
  };

  return (
    <TaskMutationContext.Provider value={value}>
      {children}
    </TaskMutationContext.Provider>
  );
};
