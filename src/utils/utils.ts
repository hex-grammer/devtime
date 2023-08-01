export const formatTitleToSlug = (title: string): string => {
  const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
  return formattedTitle;
};
