export const formatWorkingHours = (workingHoursInSeconds: number): string => {
  const hours = Math.floor(workingHoursInSeconds / 3600);
  const minutes = Math.floor((workingHoursInSeconds % 3600) / 60);
  const seconds = workingHoursInSeconds % 60;

  const formattedHours = hours > 0 ? `${hours}h` : "";
  const formattedMinutes = minutes > 0 ? `${minutes}m` : "";
  const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

  return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`.trim();
};
