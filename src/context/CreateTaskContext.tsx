// CreateTasksContext.tsx
import React, { createContext, useContext, useState } from "react";

interface CreateTasksContextType {
  isCreateNewTask: boolean;
  setIsCreateNewTask: React.Dispatch<React.SetStateAction<boolean>>;
  isTaskLoading: boolean;
    setIsTaskLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTasksContext = createContext<CreateTasksContextType | undefined>(
  undefined
);

export const useCreateTasksContext = (): CreateTasksContextType => {
  const context = useContext(CreateTasksContext);
  if (!context) {
    throw new Error("useCreateTasksContext must be used within a CreateTasksProvider");
  }
  return context;
};

interface CreateTasksProviderProps {
  children: React.ReactNode;
}

export const CreateTasksProvider: React.FC<CreateTasksProviderProps> = ({
  children,
}) => {
  const [isCreateNewTask, setIsCreateNewTask] = useState(false);
  const [isTaskLoading, setIsTaskLoading] = useState(false);

  const createTasksValue = {
    isCreateNewTask,
    setIsCreateNewTask,
    isTaskLoading,
    setIsTaskLoading,
  };

  return (
    <CreateTasksContext.Provider value={createTasksValue}>
      {children}
    </CreateTasksContext.Provider>
  );
};
