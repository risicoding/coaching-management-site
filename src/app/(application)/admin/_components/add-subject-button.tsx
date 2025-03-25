import { Button, type ButtonProps } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddSubjectButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "flex min-h-[50px] w-full items-center justify-center rounded-md border border-dashed border-black",
        className,
      )}
      {...props}
    >
      <PlusCircle className="size-12" />
    </Button>
  );
};
