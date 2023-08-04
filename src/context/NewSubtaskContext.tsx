import React, { createContext, useContext, useState } from "react";

interface NewSubtaskContextType {
  newSubtaskTitle: string;
  setNewSubtaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskId: string | null;
  setTaskId: React.Dispatch<React.SetStateAction<string | null>>;
}

const NewSubtaskContext = createContext<NewSubtaskContextType | undefined>(
  undefined
);

export const useNewSubtaskContext = (): NewSubtaskContextType => {
  const context = useContext(NewSubtaskContext);
  if (!context) {
    throw new Error(
      "useNewSubtaskContext must be used within a NewSubtaskProvider"
    );
  }
  return context;
};

interface NewSubtaskProviderProps {
  children: React.ReactNode;
}

export const NewSubtaskProvider: React.FC<NewSubtaskProviderProps> = ({
  children,
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);

  const value: NewSubtaskContextType = {
    newSubtaskTitle,
    setNewSubtaskTitle,
    taskId,
    setTaskId,
  };

  return (
    <NewSubtaskContext.Provider value={value}>
      {children}
    </NewSubtaskContext.Provider>
  );
};
