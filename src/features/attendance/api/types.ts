import { type attendance } from "@/server/db/schemas";
import { type InferSelectModel } from "drizzle-orm";

type Attendance = InferSelectModel<typeof attendance>;
type TransformedAttendance = Attendance & {
  status: "present" | "absent" | "off";
};

export type { Attendance, TransformedAttendance };
