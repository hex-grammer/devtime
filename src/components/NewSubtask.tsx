import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { type Subtask } from "~/utils/types";
import { formatTime } from "~/utils/utils";

interface SubtaskCardProps {
  subtask: Subtask;
}

const NewSubtask: React.FC<SubtaskCardProps> = ({ subtask }) => {
  const [checked, setChecked] = useState(subtask.is_done);
  const [editing, setEditing] = useState(true);
  const [editedTitle, setEditedTitle] = useState(subtask.title);

  const toggleChecked = () => {
    // setChecked((prevChecked) => !prevChecked);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleInputBlur = () => {
    setEditing(false);
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
        {editing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`mb-1 flex-1 border-b bg-gray-700 outline-none ${
              checked ? "text-gray-500 line-through" : ""
            }`}
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer ${
              checked ? "text-gray-500 line-through" : ""
            }`}
            onClick={handleEditClick}
          >
            {subtask.title}
          </span>
        )}
      </label>
    </div>
  );
};

export default NewSubtask;
