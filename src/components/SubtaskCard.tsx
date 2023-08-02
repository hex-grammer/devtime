// SubtaskCard.tsx
import React from "react";
import { type Subtask } from "~/utils/types";

interface SubtaskCardProps {
  subtask: Subtask;
}

const SubtaskCard: React.FC<SubtaskCardProps> = ({ subtask }) => {
  return (
    <div className="mt-1 rounded-sm bg-gray-600 p-2 py-1 shadow-md">
      <p className="text-sm">{subtask.title}</p>
      {/* Render other subtask details if needed */}
    </div>
  );
};

export default SubtaskCard;
