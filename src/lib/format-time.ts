import { format } from "date-fns";

export function convertToAMPM(timeString: string) {
  const [hour, minute] = timeString.split(":").map(Number);

  // Create a Date object using the current date and the provided time
  const date = new Date();
  date.setHours(hour!, minute, 0, 0);

  // Return formatted time in hh:mm am/pm format
  return format(date, "hh:mm a");
}
