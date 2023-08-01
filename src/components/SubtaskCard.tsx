// SubtaskCard.tsx
import React from "react";
import { type Subtask } from "~/utils/types";

interface SubtaskCardProps {
  subtask: Subtask;
}

const SubtaskCard: React.FC<SubtaskCardProps> = ({ subtask }) => {
  return (
    <div className="mb-2 rounded-md bg-gray-600 p-2 shadow-md">
      <p className="text-md">{subtask.title}</p>
      {/* Render other subtask details if needed */}
    </div>
  );
};

export default SubtaskCard;
