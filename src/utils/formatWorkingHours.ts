export const formatWorkingHours = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds =
    seconds % 60 < 10 ? `0${seconds % 60}` : `${seconds % 60}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
