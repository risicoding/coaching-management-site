"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import '@/components/calendar.css'

const attendanceData = [
  { date: "2025-03-25", status: "present" },
  { date: "2025-03-26", status: "absent" },
  { date: "2025-03-27", status: "present" },
  { date: "2025-03-28", status: "absent" },
];

const AttendanceCalendar = () => {
  const [value, setValue] = useState(new Date());

  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const entry = attendanceData.find((d) => d.date === formattedDate);
    return entry ? (entry.status === "present" ? "present-day" : "absent-day") : "";
  };

  return (
    <div className="flex flex-col items-center p-4 bg-background shadow-lg rounded-lg w-full max-w-md">
      <h2 className="text-lg font-semibold text-foreground mb-4">Attendance Calendar</h2>
      <Calendar onChange={setValue} value={value} tileClassName={tileClassName} />
    </div>
  );
};

export default AttendanceCalendar;

