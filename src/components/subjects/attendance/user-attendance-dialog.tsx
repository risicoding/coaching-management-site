import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { SquareArrowOutUpRight, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { AttendanceCalendar } from "./attendance-calendar";
import { getDaysInMonth  } from "@/lib/date";
import { CalendarNavButton } from "@/components/ui/calendar-nav-button";
import { useState } from "react";
import { isSameMonth } from "date-fns";

const StatCard = ({ value, label }: { value: string; label?: string }) => (
  <Card className="flex items-center justify-center p-4 text-center font-bold">
    <p>
      <span className="text-lg font-bold">{value}</span>
      {label && <span>{label}</span>}
    </p>
  </Card>
);

export const UserAttendanceDialog = ({ userId }: { userId: string }) => {
  const [month, setMonth] = useState(new Date());
  const { subjectId } = useParams<{ subjectId: string }>();

  const { data: attendanceData, isLoading: isAttendanceLoading } =
    api.attendance.getAttendanceByUserIdSubjectId.useQuery({
      userId,
      subjectId,
    });

  console.log("month", month.getMonth());

  const { data: subjectData, isLoading: isSubjectLoading } =
    api.subjects.getById.useQuery(subjectId);

  const isLoading = isAttendanceLoading || isSubjectLoading;

  return (
    <Dialog>
      <DialogTrigger>
        <SquareArrowOutUpRight className="size-4 text-gray-500" />
      </DialogTrigger>
      <DialogContent className="w-3/4 rounded-md p-4">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader className="size-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <>
            <CalendarNavButton month={month} onMonthChange={setMonth} />
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                value={`${attendanceData!.filter((itx) => isSameMonth(itx.date, month) && itx.status === "present").length}/`}
                label={String(
                  getDaysInMonth(
                    month.getFullYear(),
                    month.getMonth(),
                    subjectData!.days,
                  ),
                )}
              />
              <StatCard
                value={`${Math.floor((attendanceData!.filter((itx) => isSameMonth(itx.date, month) && itx.status === "present").length / getDaysInMonth(month.getFullYear(), month.getMonth(), subjectData!.days)) * 100)}%`}
              />
              <div className="col-span-2">
                <Card className="flex items-center justify-center">
                  <AttendanceCalendar month={month} data={attendanceData!} />
                </Card>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
