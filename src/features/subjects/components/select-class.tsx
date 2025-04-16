import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useAllClasses } from "@/features/classes/hooks";

export type SelectClassProps = {
  onChange: (value: string) => void;
  value: string | null | undefined;
  onBlur: () => void;
};
export const SelectClass = ({ onChange, value }: SelectClassProps) => {
  const { data: classesData } = useAllClasses();

  return (
    <Select onValueChange={onChange} value={value ?? undefined}>
      <SelectTrigger>
        <SelectValue placeholder="Select class" />
      </SelectTrigger>
      <SelectContent>
        {classesData?.map((itx) => (
          <SelectItem
            key={itx.id}
            value={itx.id}
          >{`Class ${itx.classNumber}`}</SelectItem>
        ))}
        <SelectItem value="other">Other</SelectItem>
      </SelectContent>
    </Select>
  );
};
