import { z } from "zod";
import { honoErrorSchema } from "@/lib/hono-error";
import {
  attendanceSelectSchema,
  attendanceInsertSchema,
} from "@/server/db/schemas/zodSchemas";

const attendanceArraySchema = z.array(attendanceSelectSchema);

export const attendanceContract = {
  createAttendance: {
    path: "/admin/attendance",
    method: "POST",
    body: attendanceInsertSchema,
    responses: {
      200: attendanceSelectSchema,
      500: honoErrorSchema,
    },
  },

  getAttendanceBySubjectId: {
    path: "/admin/attendance/subject/:subjectId",
    method: "GET",
    responses: {
      200: attendanceArraySchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getAttendanceByUserAndSubject: {
    path: "/admin/attendance/user/:userId/subject/:subjectId",
    method: "GET",
    responses: {
      200: attendanceArraySchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getPresentCountBySubjectId: {
    path: "/admin/attendance/subject/:subjectId/count",
    method: "GET",
    responses: {
      200: z.object({ count: z.number() }),
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },
};
