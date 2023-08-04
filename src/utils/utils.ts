import type { MenuItem } from "./types";

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
