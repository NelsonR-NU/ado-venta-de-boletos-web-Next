import moment from "moment";
import "moment/locale/es";

/**
 * Formats the current date in the format "Vier 12 de nov" with proper capitalization
 * @param locale - The current locale (e.g., 'es', 'en')
 * @returns Formatted date string
 */
export const formatCurrentDate = (locale: string): string => {
  moment.locale(locale);
  return moment()
    .format("ddd DD [de] MMM")
    .replace(/\b[A-Za-z\u00C0-\u00FF](?=[A-Za-z\u00C0-\u00FF]{2})/g, (match: string) =>
      match.toUpperCase()
    );
};
/**
 * Format the hour from a date string.
 * @param dateString - Date string in ISO format
 * @returns Formatted hour string (e.g., "10:30")
 */
export const formatHourFromDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "--:--";
    }

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  } catch {
    // Return default value in case of error
    return "--:--";
  }
};

/**
 * Format date to display format.
 * @param dateString - Date string in ISO format
 * @returns Formatted date string (e.g., "15/10/2023")
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "--/--/----";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch {
    // Return default value in case of error
    return "--/--/----";
  }
};
