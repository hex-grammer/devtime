import React, { useState, createContext, useContext } from "react";

// Define the type
interface TaskContextType {
  isCreateNewTask: boolean;
  setIsCreateNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TaskLoadingContextType {
  isTaskLoading: boolean;
  setIsTaskLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);
const TaskLoadingContext = createContext<TaskLoadingContextType | undefined>(
  undefined
);

// Create the custom hooks
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const useTaskLoadingContext = (): TaskLoadingContextType => {
  const context = useContext(TaskLoadingContext);
  if (!context) {
    throw new Error("useTaskLoadingContext must be used within a TaskProvider");
  }
  return context;
};

// Create the Task Provider
interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [isCreateNewTask, setIsCreateNewTask] = useState(false);

  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const taskLoadingValue: TaskLoadingContextType = {
    isTaskLoading,
    setIsTaskLoading,
  };

  const taskValue: TaskContextType = {
    isCreateNewTask,
    setIsCreateNewTask,
  };

  return (
    <TaskContext.Provider value={taskValue}>
      <TaskLoadingContext.Provider value={taskLoadingValue}>
        {children}
      </TaskLoadingContext.Provider>
    </TaskContext.Provider>
  );
};

// Combine all providers in one component
export const ContextProviders: React.FC<TaskProviderProps> = ({ children }) => {
  return <TaskProvider>{children}</TaskProvider>;
};
