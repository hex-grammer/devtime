import React, { useState } from "react";
import { Button, Popover } from "antd";
import { BsPlay, BsThreeDots } from "react-icons/bs";
import type { MenuItem } from "~/utils/types";
import { IoPause } from "react-icons/io5";
import { MdOutlineFileDownloadDone } from "react-icons/md";

interface TaskActionsProps {
  items: MenuItem[];
}

const TaskActions: React.FC<TaskActionsProps> = ({ items }) => {
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

  const handlePlay = () => {
    hide();
    console.log("Play clicked");
  };

  const handlePause = () => {
    hide();
    console.log("Pause clicked");
  };

  const handleFinish = () => {
    hide();
    console.log("Finish clicked");
  };

  const popoverContent = (
    <div className="flex flex-col items-start text-left">
      {/* start, pause and finish icons */}
      <div className="mb-0.5 flex w-full justify-between rounded-md bg-gray-100 px-4 py-2 text-lg text-gray-500">
        <BsPlay
          className="cursor-pointer text-xl transition-transform duration-100 hover:scale-x-110 hover:text-blue-600"
          onClick={handlePlay}
        />
        <IoPause
          className="cursor-pointer text-xl transition-transform duration-100 hover:scale-x-110 hover:text-blue-600"
          onClick={handlePause}
        />
        <MdOutlineFileDownloadDone
          className="cursor-pointer text-xl transition-transform duration-100 hover:scale-x-110 hover:text-blue-600"
          onClick={handleFinish}
        />
      </div>
      {items.map((item) => (
        <Button
          key={item.key}
          type="text"
          onClick={() => handleItemClick(item.action)}
          disabled={item.disabled}
          icon={item.icon}
          className={`w-full text-left ${
            item.danger
              ? "text-red-500 hover:bg-red-500 hover:text-white"
              : "text-gray-900"
          }`}
        >
          {item.label}
        </Button>
      ))}
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
