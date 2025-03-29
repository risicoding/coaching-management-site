import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { SquareArrowOutUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { AttendanceCalendar } from "./attendance-calendar";

export const AttendanceUserPopup = ({ userId }: { userId: string }) => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const { data } = api.attendance.getAttendanceByUserIdSubjectId.useQuery({
    userId,
    subjectId,
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <SquareArrowOutUpRight className="size-4 text-gray-500" />
        </DialogTrigger>
        <DialogContent className="flex w-3/4 items-center justify-center rounded-md">
          {data && <AttendanceCalendar data={data} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
