"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "lucide-react";
import { useParams } from "next/navigation";
import { UserAttendanceDialog } from "./user-attendance-dialog";
import { useCreateAttendance, useDeleteAttendance } from "../hooks";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  isPresent: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  email,
  image,
  isPresent,
}) => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [present, setPresent] = useState(isPresent);

  const { mutate: createAttendance } = useCreateAttendance();

  const { mutate: deleteAttendance } = useDeleteAttendance();

  const handleCheckboxChange = (checked: boolean) => {
    setPresent(checked);
    if (checked) {
      createAttendance({ userId: id, subjectId, date: new Date() });
    } else {
      deleteAttendance({ userId: id, subjectId, date: new Date() });
    }
  };

  return (
    <Card className="flex w-full items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            className="size-[45px] overflow-clip rounded-full"
            alt={`user-image-${id}`}
          />
        ) : (
          <User className="size-[45px] rounded-full bg-muted p-[7px] text-neutral-600" />
        )}
        <div className="flex flex-col gap-0">
          <p className="text-md font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Checkbox checked={present} onCheckedChange={handleCheckboxChange} />
        <UserAttendanceDialog userId={id} />
      </div>
    </Card>
  );
};

export default UserCard;
