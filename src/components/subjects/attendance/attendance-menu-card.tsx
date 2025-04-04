"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import React from "react";
import UserCard from "./user-card";
import { UserCardSkeleton } from "@/components/skeleton/user-card";

export const AttendanceMenuCard = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const { data: userData, isLoading: userIsLoading } =
    api.users.getUsersBySubjectId.useQuery(subjectId);
  const { data: attendanceData, isLoading: attendanceIsLoading } =
    api.attendance.getTodaysAttendanceBySubjectId.useQuery(subjectId);

  const isLoading = userIsLoading || attendanceIsLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isLoading ? (
          userData ? (
            userData.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                image={user.image}
                isPresent={
                  attendanceData?.some(
                    (attendance) => attendance.userId === user.id,
                  ) ?? false
                }
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">No users found</p>
          )
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
