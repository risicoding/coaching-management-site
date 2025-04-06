import { IoIosOptions } from "react-icons/io";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem } from "../ui/select";

import { SelectTrigger } from "@radix-ui/react-select";
export type TInputFilter = "name" | "email";

export type TInputProps = {
  filterKey: TInputFilter;
  setFilterKey: (filterKey: TInputFilter) => void;
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
};

const inputFilters = ["name", "email"] as TInputFilter[];

export const InputFilter = ({
  filterKey,
  setFilterKey,
  filterValue,
  setFilterValue,
}: TInputProps) => (
  <div className="flex h-9 w-full rounded-md border border-input bg-transparent text-base shadow-sm">
    <Input
      className="border-none shadow-none"
      placeholder={`Enter ${filterKey}....`}
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
    <Select value={filterKey} onValueChange={setFilterKey}>
      <SelectTrigger asChild>
        <Button variant="ghost">
          <IoIosOptions />
        </Button>
      </SelectTrigger>
      <SelectContent>
        {inputFilters.map((filter) => (
          <SelectItem key={filter} value={filter} className="capitalize">
            {filter}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
