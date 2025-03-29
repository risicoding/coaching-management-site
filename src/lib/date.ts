import { isBefore, addDays, isSameDay } from "date-fns";

// Define the type for the input data
type InputData = {
  [key: string]: any;
  date: Date;
}[];

// Define the type for the transformed output
export type TransformedData = InputData &
  {
    status: "present" | "absent";
  }[];

// Utility function to format dates

// Function to generate missing dates between start and end
const generateDates = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = startDate;

  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

// Transform function
const transformData = (data: InputData): TransformedData => {
  if (data.length === 0) return [];

  const sortedData = [...data].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const startDate = sortedData[0]!.date;
  const endDate = sortedData[sortedData.length - 1]!.date;

  const allDates = generateDates(startDate, endDate);
  const result: TransformedData = [];

  allDates.forEach((date) => {
    const existingEntry = sortedData.find((entry) =>
      isSameDay(entry.date, date),
    );

    if (existingEntry) {
      result.push({ ...existingEntry, status: "present" });
    } else {
      result.push({
        id: null,
        userId: sortedData[0]?.userId,
        subjectId: sortedData[0]?.subjectId,
        createdAt: null,
        date,
        status: "absent",
      });
    }
  });

  return result;
};

export { transformData };
