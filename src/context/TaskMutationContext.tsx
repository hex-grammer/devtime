import axios from "axios";
import { createContext, useContext, type ReactNode } from "react";
import { mutate } from "swr";
import { useGetTasksContext } from "./GetTaskContext";
import { type Project } from "~/utils/types";

interface TaskMutationContextType {
  createNewTask: (
    projectId: string,
    taskTitle: string,
    order: "first" | "last"
  ) => Promise<void>;
  updateTitle: (
    projectId: string,
    taskId: string,
    taskTitle: string
  ) => Promise<void>;
  updateProgress: (
    projectId: string,
    taskId: string,
    progress: "TODO" | "IN_PROGRESS" | "DONE",
    order: number
  ) => Promise<void>;
  deleteTask: (projectId: string, taskId: string) => Promise<void>;
  updateWorkingHours: (
    projectId: string,
    taskId: string,
    workingHours: number
  ) => Promise<void>;
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
  const { setTasks } = useGetTasksContext();
  const createNewTask = async (
    projectId: string,
    taskTitle: string,
    order: "first" | "last"
  ) => {
    try {
      await axios.post("/api/task/create", { projectId, taskTitle, order });
      await mutate(`/api/task/get-all?projectId=${projectId}`).then(
        (res: Project) => {
          setTasks(res.tasks ?? []);
        }
      );
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTitle = async (
    projectId: string,
    taskId: string,
    taskTitle: string
  ) => {
    try {
      await axios.put(`/api/task/update`, { taskId, taskTitle });
      await mutate(`/api/task/get-all?projectId=${projectId}`);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const updateProgress = async (
    projectId: string,
    taskId: string,
    progress: "TODO" | "IN_PROGRESS" | "DONE",
    order: number
  ) => {
    try {
      await axios.put(`/api/task/updateProgress`, { taskId, progress, order });
      await mutate(`/api/task/get-all?projectId=${projectId}`);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const deleteTask = async (projectId: string, taskId: string) => {
    try {
      await axios.delete(`/api/task/delete?taskId=${taskId}`);
      await mutate(`/api/task/get-all?projectId=${projectId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateWorkingHours = async (
    projectId: string,
    taskId: string,
    workingHours: number
  ) => {
    try {
      await axios.put(`/api/task/updateWorkingHours`, { taskId, workingHours });
      await mutate(`/api/task/get-all?projectId=${projectId}`);
    } catch (error) {
      console.error("Error updating working hours:", error);
    }
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
