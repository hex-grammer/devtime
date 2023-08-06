import type { MenuItem, Progress, Task } from "./types";

export const formatTitleToSlug = (title: string): string => {
  const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
  return formattedTitle;
};

const getMenuItemsByStep = (step: string, menu: MenuItem[]): MenuItem[] => {
  if (step === "DONE") {
    return menu.filter((item) => !["pause", "finish"].includes(item.key));
  } else if (step === "TODO") {
    return menu.filter((item) => item.key !== "pause");
  } else if (step === "IN_PROGRESS") {
    return menu.filter((item) => item.key !== "start");
  } else {
    return menu;
  }
};

export default getMenuItemsByStep;

export const formatWorkingHours = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    seconds % 60 < 10 ? `0${seconds % 60}` : `${seconds % 60}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }

  const hours = Math.floor(seconds / 3600);
  let remSec = seconds % 3600;
  const minutes = Math.floor(remSec / 60);
  remSec = remSec % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m ${remSec}s`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const formatAverage = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = `${hours}h`;
  const formattedMinutes = `${minutes}m`;
  const formattedSeconds = `${seconds % 60}s`;

  return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
};

export const createNewTask = (
  prevTasks: Task[],
  taskTitle: string,
  order: string
): Task[] => {
  const smallest = prevTasks.reduce((acc, curr) =>
    acc.order < curr.order ? acc : curr
  );
  const biggest = prevTasks.reduce((acc, curr) =>
    acc.order > curr.order ? acc : curr
  );
  const newOrder = order === "first" ? smallest.order - 1 : biggest.order + 1;
  return [
    ...prevTasks,
    {
      id: "new-task",
      project_id: "projectId",
      title: taskTitle,
      step: "TODO",
      working_hours: 0,
      subtasks: [],
      lastProgress: null,
      order: newOrder,
    },
  ];
};

export const updateStep = (
  prevTasks: Task[],
  taskId: string,
  step: Progress
): Task[] => {
  const taskToUpdate = prevTasks.find((task) => task.id === taskId);

  if (!taskToUpdate) {
    return prevTasks; // Task not found, return the original list
  }

  // Find the smallest order value among existing tasks
  const tasksWithSameStep = prevTasks.filter((task) => task.step === step);
  const smallestOrder = tasksWithSameStep.reduce(
    (minOrder, task) => Math.min(minOrder, task.order),
    Number.MAX_SAFE_INTEGER
  );

  // Update the step of the task with the specified taskId
  const updatedTask: Task = {
    ...taskToUpdate,
    step, // Use the provided step value here
    order: smallestOrder - 1,
  };

  // Add the updated task and the new task to the list
  return [...prevTasks.filter((task) => task.id !== taskId), updatedTask];
};
