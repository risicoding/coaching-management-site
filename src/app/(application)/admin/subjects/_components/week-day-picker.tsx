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
  disabled?: boolean;
  className?: string;
}

export const WeekdayPicker = ({
  value,
  onChange,
  onBlur,
  disabled = false,
  className,
}: WeekdaySelectorProps) => {
  const [selected, setSelected] = useState<weekDayType[]>(
    value ?? defaultValues,
  );

  const toggleDay = (day: weekDayType) => {
    if (disabled) return; // Prevent toggling when disabled

    const newSelected = selected.includes(day)
      ? selected.filter((d) => d !== day)
      : [...selected, day];

    setSelected(newSelected);
    onChange(newSelected);
  };

  const getVariant = (day: weekDayType) => {
    if (!disabled) return selected.includes(day) ? "default" : "outline";
    return selected.includes(day) ? "disabled" : "disabledOutline";
  };

  return (
    <div className={cn("flex gap-2", className)} onBlur={onBlur}>
      {weekdayValues.map((day) => (
        <Button
          type="button"
          key={day}
          variant={getVariant(day)}
          className="h-10 w-10 rounded-full p-0"
          onClick={() => toggleDay(day)}
          disabled={disabled} // Prevents button clicks when disabled
        >
          {day[0]?.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
