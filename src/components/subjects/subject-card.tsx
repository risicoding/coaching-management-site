import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

export interface SubjectCardProps {
  name: string;
  classNo?: number | null;
  time?: string | null;
  id: string;
}

export const SubjectCard = ({ name, time, id, classNo }: SubjectCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-primary/5 pb-2">
        <CardTitle className="text-lg font-medium">{name}</CardTitle>
        <CardDescription>Class:{classNo ?? "other"}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{time ?? "N/A"}</span>
        </div>
      </CardContent>
    </Card>
  );
};
