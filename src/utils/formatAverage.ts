export const formatAverage = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = `${hours}h`;
  const formattedMinutes = `${minutes}m`;
  const formattedSeconds = `${seconds % 60}s`;

  return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
};
