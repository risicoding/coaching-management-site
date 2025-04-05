import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SubjectCardSkeleton = () => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-primary/5 pb-2">
        <CardTitle className="text-lg font-medium">
          <Skeleton className="h-5 w-3/4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-1/3" />
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
};
