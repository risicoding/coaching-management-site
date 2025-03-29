"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./attendance-calendar.css";
import type { TransformedData } from "@/lib/date";
import { isSameDay } from "date-fns";

export const AttendanceCalendar = ({ data }: { data: TransformedData }) => {
  const [value, setValue] = useState<Date>(new Date());

  const tileClassName = ({ date }: { date: Date }) => {
    const entry = data.find((d) => isSameDay(d.date, date));
    console.log(entry);
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
