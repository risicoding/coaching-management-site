import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const  UserCardSkeleton= () => {
  return (
    <Card className="flex w-full items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="size-[45px] rounded-full" />
        <div className="flex flex-col gap-0">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24 mt-1" />
        </div>
      </div>
      <Skeleton className="size-5 rounded-md" />
    </Card>
  );
};


