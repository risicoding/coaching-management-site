import { isBefore, format, addDays, isSameDay } from "date-fns";

const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type InputEntry = {
  [key: string]: any;
  date: Date;
};

type InputData = InputEntry[];

type TransformedEntry = InputEntry & {
  status: "present" | "absent" | "off";
};

type TransformedData = TransformedEntry[];

const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = startDate;
  while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  return dates;
};

const transformData = (data: InputData): TransformedData => {
  if (data.length === 0) return [];

  const startDate = data[0]!.date;
  const endDate = data[data.length - 1]!.date;

  const dateMap = new Map(
    data.map((entry) => [entry.date.toISOString().split("T")[0], entry]),
  );

  return generateDateRange(startDate, endDate).map((date) => {
    const dateKey = date.toISOString().split("T")[0];
    const existingEntry = dateMap.get(dateKey);

    return existingEntry
      ? { ...existingEntry, status: "present" }
      : {
          id: null,
          userId: data[0]?.userId,
          subjectId: data[0]?.subjectId,
          createdAt: null,
          date,
          status: "absent",
        };
  });
};

const isWeekday = (date: Date, day: string) => {
  return format(date, "EEE").toLowerCase() === day.toLowerCase();
};

const filterWeekdays = (
  input: TransformedData,
  days: string[],
): TransformedData => {
  return input.map((entry) =>
    days.some((day) => isWeekday(entry.date, day))
      ? entry
      : { ...entry, status: entry.status === "present" ? "present" : "off" },
  );
};

const getDaysInMonth = (
  year: number,
  month: number,
  includeDays: string[] = days.filter((val) => val !== "sun"),
) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let count = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const dayOfWeek = new Date(year, month, day).getDay();
    if (includeDays.includes(days[dayOfWeek]!)) {
      count++;
    }
  }

  return count;
};

export { transformData, getDaysInMonth, filterWeekdays, type TransformedData };
