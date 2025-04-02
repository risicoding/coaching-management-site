"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import type { DayProps } from "react-day-picker";
import type { TransformedData } from "@/lib/date";
import { CalendarMonthView } from "@/components/ui/calendar-month-view";

export const AttendanceCalendar = ({
  data,
  month,
}: {
  data: TransformedData;
  month?: Date;
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <CalendarMonthView
      month={month}
      components={{
        Day: (props: DayProps) => {
          const obj = data.find((d) => isSameDay(new Date(d.date), props.date));

          return (
            <Button
              variant={obj?.status === "off" ? "ghost" : "default"}
              className={cn(
                "m-[2px] h-8 w-8 p-0 font-normal aria-selected:opacity-100",
                obj?.status === "present"
                  ? "bg-green-400"
                  : obj?.status === "absent"
                    ? "bg-red-400"
                    : "bg-white text-black shadow-none",
              )}
            >
              {props.date.getDate()}
            </Button>
          );
        },
      }}
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  );
};
