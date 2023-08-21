// GetTasksContext.tsx
import React, { createContext, useContext, useState } from "react";
import { type Task } from "~/utils/types";

interface GetTasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const GetTasksContext = createContext<GetTasksContextType | undefined>(
  undefined
);

export const useGetTasksContext = (): GetTasksContextType => {
  const context = useContext(GetTasksContext);
  if (!context) {
    throw new Error(
      "useGetTasksContext must be used within a GetTasksProvider"
    );
  }
  return context;
};

interface GetTasksProviderProps {
  children: React.ReactNode;
}

export const GetTasksProvider: React.FC<GetTasksProviderProps> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <GetTasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GetTasksContext.Provider>
  );
};
