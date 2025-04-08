"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getMonthOptions = () => {
  const now = new Date();
  const year = now.getFullYear();
  const currentMonth = now.getMonth();
  return Array.from({ length: currentMonth + 1 }, (_, i) => {
    const date = new Date(year, i, 1);
    const label = date.toLocaleString("default", { month: "long" });
    const value = date.toISOString().split("T")[0]!;
    return { label, value };
  });
};

const MonthSelect = ({
  value = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0]!,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const options = getMonthOptions();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MonthSelect;
