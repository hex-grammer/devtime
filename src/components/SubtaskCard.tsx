// SubtaskCard.tsx
import React from "react";
import { formatTime } from "~/utils/formatiTime";
import { type Subtask } from "~/utils/types";

interface SubtaskCardProps {
  subtask: Subtask;
}

const SubtaskCard: React.FC<SubtaskCardProps> = ({ subtask }) => {
  return (
    <div className="mt-1 rounded-sm bg-gray-600 p-2 py-1 shadow-md">
      <p className="flex justify-between text-sm">
        {subtask.title}
        <span className="ml-2 text-sm text-gray-400">
          {formatTime(subtask.working_hours)}
        </span>
      </p>
      {/* Render other subtask details if needed */}
    </div>
  );
};

export default SubtaskCard;
