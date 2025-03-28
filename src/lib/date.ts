import { format, isBefore, addDays, parseISO, isSameDay } from "date-fns";

// Define the type for the input data
interface InputData {
  id: number | null;
  date: string;
}

// Define the type for the transformed output
interface TransformedData {
  id: number | null;
  date: string;
  status: "present" | "absent";
}

// Utility function to format dates
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

// Function to generate missing dates between start and end
const generateDates = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = startDate;

  // Generate all dates in the range
  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

// Transform function
const transformData = (data: InputData[]): TransformedData[] => {
  // Sort data by date
  data.sort((a, b) => (isBefore(parseISO(a.date), parseISO(b.date)) ? -1 : 1));

  // Get the earliest and latest date
  const startDate = parseISO(data[0]!.date);
  const endDate = parseISO(data[data.length - 1]!.date);

  // Generate all dates between the start and end
  const allDates = generateDates(startDate, endDate);

  // Result array to hold transformed data
  const result: TransformedData[] = [];

  // Iterate over each date in the range
  allDates.forEach((date) => {
    const formattedDate = formatDate(date);

    // Check if there is an entry for this date in the input data
    const existingEntry = data.find((entry) => entry.date === formattedDate);

    if (existingEntry) {
      result.push({
        id: existingEntry.id,
        date: formattedDate,
        status: "present",
      });
    } else {
      result.push({
        id: null,
        date: formattedDate,
        status: "absent",
      });
    }
  });

  return result;
};

export { transformData };
