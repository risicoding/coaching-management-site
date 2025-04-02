"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import React from "react";
import UserCard from "./user-card";
import { UserCardSkeleton } from "@/components/skeleton/user-card";

export const AttendanceMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const { data: userData } = api.users.getUsersBySubjectId.useQuery(subjectId);
  const { data: attendanceData } =
    api.attendance.getTodaysAttendanceBySubjectId.useQuery(subjectId);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {userData && attendanceData ? (
          userData?.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              image={user.image}
              isPresent={attendanceData.some(
                (attendance) => attendance.userId === user.id,
              )}
            />
          ))
        ) : (
          <div className="space-y-4">
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

{
  /* <div className="space-y-4"> */
}
{
  /*   <div className="flex gap-4"> */
}
{
  /*     <Card className="h-28 w-full"> */
}
{
  /*       <CardContent></CardContent> */
}
{
  /*     </Card> */
}
{
  /*     <Card className="h-28 w-full"> */
}
{
  /*       <CardContent></CardContent> */
}
{
  /*     </Card> */
}
{
  /*   </div> */
}
{
  /*   <Card> */
}
{
  /*     <CardContent className="flex items-center justify-center"> */
}
{
  /*       <AttendanceCalendar */
}
{
  /*         attendanceData={[ */
}
{
  /*           { date: "2024-04-01", status: "present" }, */
}
{
  /*           { date: "2024-04-05", status: "present" }, */
}
{
  /*         ]} */
}
{
  /*       /> */
}
{
  /*     </CardContent> */
}
{
  /*   </Card> */
}
{
  /* </div> */
}
