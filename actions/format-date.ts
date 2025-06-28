/**
 * Formats a date string into a readable format.
 *
 * @param dateString - The date string to be formatted (e.g., "2025-01-12T10:15:30.000Z").
 * @returns A string representing the formatted date in the format "Month Day, Year" (e.g., "January 12, 2025").
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
