import AttendanceCalendar from "@/components/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const AttendanceCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Card className="h-28 w-full">
              <CardContent></CardContent>
            </Card>
            <Card className="h-28 w-full">
              <CardContent></CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="flex items-center  justify-center">
              <AttendanceCalendar
                attendanceData={[{ date: "2024-04-01", status: "present" },{ date: "2024-04-05", status: "present" }]}
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
