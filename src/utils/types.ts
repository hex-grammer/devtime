export type Progress = "TODO" | "IN_PROGRESS" | "DONE";

export interface Project {
  id: string;
  title: string;
  daySpent: number;
  working_hours: number; // Total working hours spent on all tasks (in seconds)
  progress: number;
  started_at?: string; // ISO date string
  numberOfTasks?: number; // Optional number of tasks in the project
  lastProgress?: string | null; // ISO date string or null if no tasks in "IN_PROGRESS"
  tasks?: Task[]; // Optional array of tasks in the project
  isInProgress?: boolean; // Optional boolean indicating if any task is in progress
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  step: Progress;
  working_hours: number; // Working hours spent on the task (in seconds)
  subtasks: Subtask[];
  order: number;
  taskprogress: TaskProgress[];
}

export interface Subtask {
  id: string;
  task_id: string;
  title: string;
  is_done: boolean;
  working_hours: number; // Working hours spent on the subtask (in seconds)
}

export interface TaskProgress {
  id: string;
  start_date: string | Date; // ISO date string
  stop_date: string | Date; // ISO date string
  project_id: string;
  task_id: string;
  progress: Progress;
}

export interface ProjectWithStats extends Project {
  avgPerDay: number;
  lastProgress: string | null; // ISO date string or null if no tasks in "IN_PROGRESS"
}

export interface MenuItem {
  label: string;
  key: string;
  disabled?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
  action: () => void;
}
