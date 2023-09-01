import React, { useState, useRef, useEffect } from "react";
import type { MenuItem, Task } from "~/utils/types";
import SubtaskCard from "./SubtaskCard";
import TaskActions from "./TaskActions";
import { LuCheckSquare, LuPause, LuPlay } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import getMenuItemsByStep, {
  getWorkingHours,
  formatTime,
  getOrder,
  updateStep,
} from "~/utils/utils";
import { useTaskMutationContext } from "~/context/TaskMutationContext";
import { NewSubtaskProvider } from "~/context/NewSubtaskContext";
import { GiSandsOfTime } from "react-icons/gi";
import { useGetTasksContext } from "~/context/GetTaskContext";

interface TaskCardProps {
  task: Task;
  projectId: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, projectId }) => {
  const [editing, setEditing] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string>(task.title);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const taskMutation = useTaskMutationContext();
  const [timer, setTimer] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tasks, setTasks } = useGetTasksContext();

  useEffect(() => {
    const interval = setInterval(() => {
      task.step === "IN_PROGRESS" && setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [task.step, timer]);

  const handleRename = () => {
    setEditing(true);
  };

  const setStepTo = async (step: "TODO" | "IN_PROGRESS" | "DONE") => {
    const order = getOrder(tasks, step);
    setTasks((prevTasks) => {
      return updateStep(prevTasks, task.id, step);
    });
    await taskMutation.updateProgress(projectId, task.id, step, order);
  };

  const handleDelete = async () => {
    setTasks((prevTasks) =>
      prevTasks.filter((prevTask) => prevTask.id !== task.id)
    );
    await taskMutation.deleteTask(projectId, task.id);
  };

  const MENU: MenuItem[] = [
    {
      label: "Do It!",
      key: "play",
      action: () => void setStepTo("IN_PROGRESS"),
      icon: <LuPlay />,
    },
    {
      label: "Pause",
      key: "pause",
      action: () => void setStepTo("TODO"),
      icon: <LuPause />,
    },
    {
      label: "Finish",
      key: "finish",
      action: () => void setStepTo("DONE"),
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
      action: () => void handleDelete(),
      icon: <RiDeleteBin6Line />,
    },
  ];

  const handleSave = async () => {
    // return if task title is empty
    if (!taskTitle) {
      return setEditing(false);
    }

    setEditing(false);
    await taskMutation.updateTitle(projectId, task.id, taskTitle);
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
        <div
          className={`group flex items-end justify-between font-semibold ${
            taskTitle.length > 28
              ? taskTitle.length > 40
                ? "flex-col"
                : "sm:flex-col"
              : ""
          }`}
        >
          {editing ? (
            <input
              type="text"
              value={taskTitle}
              onChange={handleChange}
              onBlur={() => void handleSave}
              placeholder="Task title..."
              onKeyDown={(event) => event.key === "Enter" && void handleSave()}
              className="m-0 w-full truncate border-b bg-gray-700 text-left text-gray-200 outline-none"
              ref={inputRef}
              autoFocus
            />
          ) : (
            <div className="w-full cursor-pointer" onClick={handleRename}>
              {taskTitle}
            </div>
          )}
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap font-normal text-gray-400">
              {task.step === "IN_PROGRESS" ? (
                <div className="flex items-center gap-1">
                  {task.taskprogress.length > 0
                    ? formatTime(getWorkingHours(task.taskprogress))
                    : "0s"}
                  <div className="relative">
                    <GiSandsOfTime className="absolute left-0 top-0 animate-ping text-xs text-blue-500 duration-500" />
                    <GiSandsOfTime className="text-xs text-blue-500" />
                  </div>
                </div>
              ) : task.taskprogress.length > 0 ? (
                formatTime(getWorkingHours(task.taskprogress))
              ) : (
                "0s"
              )}
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
      </div>
    </NewSubtaskProvider>
  );
};

export default TaskCard;
