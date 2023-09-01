import { type Task } from "./types";

export const addNewTask = (
  prevTasks: Task[],
  taskTitle: string,
  order: string
): Task => {
  const smallest =
    prevTasks.length === 0
      ? { order: 0 }
      : prevTasks.reduce((acc, curr) => (acc.order < curr.order ? acc : curr));

  const largest =
    prevTasks.length === 0
      ? { order: 0 }
      : prevTasks.reduce((acc, curr) => (acc.order > curr.order ? acc : curr));

  const newOrder = order === "first" ? smallest.order - 1 : largest.order + 1;
  const newTask = {
    id: "",
    project_id: "",
    title: taskTitle,
    step: "TODO",
    working_hours: 0,
    subtasks: [],
    order: newOrder,
    taskprogress: [],
  } as Task;

  return newTask;
  // return [...prevTasks, newTask];
};
