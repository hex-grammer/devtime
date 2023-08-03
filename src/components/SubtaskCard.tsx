import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { type Subtask } from "~/utils/types";
import { formatTime } from "~/utils/utils";

interface SubtaskCardProps {
  subtask: Subtask;
}

const SubtaskCard: React.FC<SubtaskCardProps> = ({ subtask }) => {
  const [checked, setChecked] = useState(subtask.is_done);

  const toggleChecked = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className="group mt-1 flex justify-between text-sm">
      <label
        className="flex flex-1 cursor-pointer items-center"
        onClick={toggleChecked}
      >
        <div
          className={`mr-1 flex h-4 w-4 items-center justify-center rounded border border-gray-400 text-xs ${
            checked ? "border-blue-600 bg-blue-600" : ""
          }`}
        >
          {checked && <AiOutlineCheck />}
        </div>
        <span className={checked ? "text-gray-500 line-through" : ""}>
          {subtask.title}
        </span>
      </label>
      <div className="relative flex gap-1">
        <span className="ml-2 text-sm font-normal text-gray-400">
          {formatTime(subtask.working_hours)}
        </span>
        <div className="absolute right-0 top-0 hidden cursor-pointer rounded-sm bg-gray-600 p-1 group-hover:block">
          <IoCloseSharp />
        </div>
      </div>
    </div>
  );
};

export default SubtaskCard;
