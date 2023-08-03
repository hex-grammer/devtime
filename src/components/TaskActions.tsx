import React from "react";
import { Dropdown, Space } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { MenuItem } from "~/utils/types";

interface TaskActionsProps {
  items: MenuItem[];
}

const TaskActions: React.FC<TaskActionsProps> = ({ items }) => {
  const onClick = ({ key }: { key: string }) => {
    const selectedItem = items.find((item) => item.key === key);
    if (selectedItem) {
      selectedItem.action();
    }
  };

  return (
    <Dropdown
      menu={{ items, onClick }}
      overlayClassName="bg-gray-800 text-gray-100 rounded-lg shadow-lg"
    >
      <div
        onClick={(e) => e.preventDefault()}
        className="hidden cursor-pointer rounded-sm bg-gray-600 p-0.5 px-1.5 group-hover:block"
      >
        {/* <Space> */}
        <BsThreeDots />
        {/* </Space> */}
      </div>
    </Dropdown>
  );
};

export default TaskActions;
