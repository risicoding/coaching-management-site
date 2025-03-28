"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/components/calendar.css";

type AttendanceStatus = "present" | "absent";
type AttendanceRecord = { date: string; status: AttendanceStatus };

interface AttendanceCalendarProps {
  attendanceData: AttendanceRecord[];
}

const AttendanceCalendar = ({ attendanceData }: AttendanceCalendarProps) => {
  const [value, setValue] = useState<Date>(new Date());

  const tileClassName = ({ date }: { date: Date }) => {
  const formattedDate = date.toLocaleDateString("en-CA"); // "YYYY-MM-DD" format
  const entry = attendanceData.find((d) => d.date === formattedDate);
  return entry
    ? entry.status === "present"
      ? "present-day"
      : "absent-day"
    : "";
};


  return (
    <div>
      <Calendar value={value} tileClassName={tileClassName} />
    </div>
  );
};

export default AttendanceCalendar;
