import React, { useState, createContext, useContext } from "react";

// Define the type for Task Context
interface TaskContextType {
  isCreateNewTask: boolean;
  setIsCreateNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the Task Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create the custom hook for using the Task Context
export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

// Create the Task Provider
interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [isCreateNewTask, setIsCreateNewTask] = useState(false);

  const value: TaskContextType = {
    isCreateNewTask,
    setIsCreateNewTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Other Contexts...

// Combine all providers in one component
export const ContextProviders: React.FC<TaskProviderProps> = ({ children }) => {
  return <TaskProvider>{children}</TaskProvider>;
};
