import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { daysEnum } from "@/server/db/schemas";
import type { z } from "zod";

const weekdayValues = daysEnum.options;

const defaultValues = weekdayValues.filter((val) => val !== "sun");

type weekDayType = z.infer<typeof daysEnum>;

interface WeekdaySelectorProps {
  value?: weekDayType[];
  onChange: (selected: weekDayType[]) => void;
  onBlur?: () => void;
  className?: string;
}

export const WeekdayPicker = ({
  value,
  onChange,
  onBlur,
  className,
}: WeekdaySelectorProps) => {
  const [selected, setSelected] = useState<weekDayType[]>(
    value ?? defaultValues,
  );

  const toggleDay = (day: weekDayType) => {
    const newSelected = selected?.includes(day)
      ? selected.filter((d) => d !== day)
      : [...selected, day];

    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className={cn("flex gap-2", className)} onBlur={onBlur}>
      {weekdayValues.map((day, index) => {
        const dayValue = weekdayValues[index];
        return (
          <Button
            type="button"
            key={dayValue}
            variant={selected.includes(dayValue!) ? "default" : "outline"}
            className="h-10 w-10 rounded-full p-0"
            onClick={() => toggleDay(dayValue!)}
          >
            {day[0]?.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
};
