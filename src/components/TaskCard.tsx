import React, { useState, useRef, useEffect } from "react";
import type { MenuItem, Task } from "~/utils/types";
import SubtaskCard from "./SubtaskCard";
import TaskActions from "./TaskActions";
import { LuCheckSquare, LuPause, LuPlay } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import getMenuItemsByStep, { formatTime } from "~/utils/utils";
import { useTaskMutationContext } from "~/context/TaskMutationContext";
import { NewSubtaskProvider } from "~/context/NewSubtaskContext";

interface TaskCardProps {
  task: Task;
  projectId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, projectId }) => {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const taskMutation = useTaskMutationContext();

  const handleRename = () => {
    setEditing(true);
    console.log("Rename clicked");
  };

  const handlePlay = () => {
    taskMutation.updateProgress(projectId, task.id, "IN_PROGRESS");
  };

  const handlePause = () => {
    taskMutation.updateProgress(projectId, task.id, "TODO");
  };

  const handleFinish = () => {
    taskMutation.updateProgress(projectId, task.id, "DONE");
  };

  const handleDelete = () => {
    taskMutation.deleteTask(projectId, task.id);
  };

  const MENU: MenuItem[] = [
    {
      label: "Do It!",
      key: "play",
      action: handlePlay,
      icon: <LuPlay />,
    },
    {
      label: "Pause",
      key: "pause",
      action: handlePause,
      icon: <LuPause />,
    },
    {
      label: "Finish",
      key: "finish",
      action: handleFinish,
      icon: <LuCheckSquare />,
    },
    {
      label: "Rename",
      key: "rename",
      action: handleRename,
      icon: <LiaEdit />,
    },
    // {
    //   label: "Add Subtask",
    //   key: "add_subtask",
    //   action: () => console.log("Add Subtask clicked"),
    //   icon: <VscDiffAdded />,
    // },
    {
      label: "Delete",
      key: "delete",
      danger: true,
      action: handleDelete,
      icon: <RiDeleteBin6Line />,
    },
  ];

  const handleSave = () => {
    // return if task title is empty
    if (!taskTitle) {
      return setEditing(false);
    }

    // create a new task
    taskMutation.updateTitle(projectId, task.id, taskTitle);

    // setTaskTitle("");
    setEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.select(); // Select all text in the input
    }
  }, [editing]);

  return (
    <NewSubtaskProvider>
      <div
        className={`mb-1 rounded-md bg-gray-700 p-2 shadow-md ${
          task.subtasks.length > 0 ? "py-2" : "py-1"
        }`}
      >
        <div className="group flex items-end justify-between font-semibold">
          {editing ? (
            <input
              type="text"
              value={taskTitle}
              onChange={handleChange}
              onBlur={handleSave}
              placeholder="Task title..."
              onKeyDown={(event) => event.key === "Enter" && handleSave()}
              className="m-0 truncate border-b bg-gray-700 text-left text-gray-200 outline-none"
              ref={inputRef}
              autoFocus
            />
          ) : (
            <div className="w-full cursor-pointer" onClick={handleRename}>
              {taskTitle}
            </div>
          )}
          <div className="flex gap-1">
            <span className="ml-2 whitespace-nowrap text-sm font-normal text-gray-400">
              {formatTime(task.working_hours)}
            </span>
            <TaskActions
              projectId={projectId}
              taskId={task.id}
              progress={task.step}
              items={getMenuItemsByStep(task.step, MENU)}
            />
          </div>
        </div>
        {/* Render subtasks here */}
        {task.subtasks.length > 0 && <hr className="my-1 border-gray-500" />}
        {task.subtasks.map((subtask) => (
          <SubtaskCard key={subtask.id} subtask={subtask} />
        ))}
        {/* <NewSubtask
          subtask={{
            id: "new",
            task_id: task.id,
            title: "",
            is_done: false,
            working_hours: 54336,
          }}
        /> */}
      </div>
    </NewSubtaskProvider>
  );
};

export default TaskCard;
