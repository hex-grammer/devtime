import React from "react";
import type { MenuItem, Task } from "~/utils/types";
import SubtaskCard from "./SubtaskCard";
import TaskActions from "./TaskActions";
import {
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillCheckSquareFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import { LuTimerReset } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import getMenuItemsByStep, { formatTime } from "~/utils/utils";

interface TaskCardProps {
  task: Task;
}

const MENU: MenuItem[] = [
  {
    label: "Start",
    key: "start",
    action: () => console.log("Start clicked"),
    icon: <BsFillPlayFill />,
  },
  {
    label: "Pause",
    key: "pause",
    action: () => console.log("Pause clicked"),
    icon: <BsFillPauseFill />,
  },
  {
    label: "Finish",
    key: "finish",
    action: () => console.log("Finish clicked"),
    icon: <BsFillCheckSquareFill />,
  },
  {
    label: "Add Subtask",
    key: "add_subtask",
    action: () => console.log("Add Subtask clicked"),
    icon: <BsFillPlusSquareFill />,
  },
  {
    label: "Reset Time",
    key: "reset_time",
    action: () => console.log("Reset Time clicked"),
    icon: <LuTimerReset />,
  },
  {
    label: "Delete",
    key: "delete",
    danger: true,
    action: () => console.log("Delete clicked"),
    icon: <RiDeleteBin6Line />,
  },
];

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div
      className={`mb-1 rounded-md bg-gray-700 p-2 shadow-md ${
        task.subtasks.length > 0 ? "py-2" : "py-1"
      }`}
    >
      <div className="group flex items-end justify-between font-semibold">
        {task.title}
        <div className="flex gap-1">
          <span className="ml-2 text-sm font-normal text-gray-400">
            {formatTime(task.working_hours)}
          </span>
          <TaskActions items={getMenuItemsByStep(task.step, MENU)} />
        </div>
      </div>
      {/* Render subtasks here */}
      {task.subtasks.length > 0 && <hr className="my-1 border-gray-500" />}
      {task.subtasks.map((subtask) => (
        <SubtaskCard key={subtask.id} subtask={subtask} />
      ))}
    </div>
  );
};

export default TaskCard;
