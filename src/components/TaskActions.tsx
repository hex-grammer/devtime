import React, { useState } from "react";
import { Button, Popover } from "antd";
import { BsThreeDots } from "react-icons/bs";
import type { MenuItem } from "~/utils/types";

interface TaskActionsProps {
  items: MenuItem[];
  projectId: string;
  taskId: string;
  progress: "TODO" | "IN_PROGRESS" | "DONE";
}

const TaskActions: React.FC<TaskActionsProps> = ({ items, progress }) => {
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleItemClick = (action: () => void) => {
    hide();
    action();
  };

  const popoverContent = (
    <div className="mb-0.5 flex flex-col items-start text-left">
      {items.map((item) => {
        // if progress is TODO and DONE, disable pause and finish
        if (["TODO", "DONE"].includes(progress)) {
          if (item.key === "pause" || item.key === "finish") {
            return null;
          }
        }
        // if progress is IN_PROGRESS, disable play
        if (progress === "IN_PROGRESS" && item.key === "play") {
          return null;
        }
        return (
          <Button
            key={item.key}
            type="text"
            onClick={() => handleItemClick(item.action)}
            disabled={item.disabled}
            icon={item.icon}
            className={`w-full px-2 text-left font-semibold ${
              item.danger
                ? "text-red-500 hover:bg-red-500 hover:text-white"
                : "text-gray-900"
            }`}
          >
            {item.label}
          </Button>
        );
      })}
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomLeft"
      content={popoverContent}
      trigger="click"
    >
      <div className="hidden cursor-pointer rounded-sm bg-gray-600 p-0.5 px-1.5 group-hover:block">
        <BsThreeDots />
      </div>
    </Popover>
  );
};

export default TaskActions;
