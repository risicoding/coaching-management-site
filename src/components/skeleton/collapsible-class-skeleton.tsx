import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "../ui/card";

export const CollapsibleCardHeaderSkeleton = () => {
  return (
    <Card className="flex w-full items-center justify-between p-4">
      <Skeleton className="h-4 w-24" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </Card>
  );
};
