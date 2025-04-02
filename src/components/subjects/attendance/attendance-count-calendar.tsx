"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { isSameDay } from "date-fns";
import React from "react";

const AttendanceCountCalendar = ({
  data,
}: {
  data: { date: Date; userCount: number }[];
}) => {
  return (
    <Calendar
      mode="single"
      components={{
        Day: ({ date }) => {
          return (
            <Button
              variant="outline"
              className="m-[4px] border-neutral-200 flex justify-start p-[1px] h-9 w-9 flex-col gap-0 text-xs font-normal aria-selected:opacity-100"
            >
              <span className="ml-1 mr-auto text-sm">{date.getDate()}</span>
              <span className="ml-auto mr-1 text-green-500">
                {
                  data.find((itx) => isSameDay(new Date(date), itx.date))
                    ?.userCount
                }
              </span>
            </Button>
          );
        },
      }}
    />
  );
};

export default AttendanceCountCalendar;
