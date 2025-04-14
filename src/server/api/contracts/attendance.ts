import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { honoErrorSchema } from "@/lib/hono-error";
import {
  attendanceSelectSchema,
  attendanceInsertSchema,
} from "@/server/db/schemas/zodSchemas";

const attendanceArraySchema = z.array(attendanceSelectSchema);

const c = initContract();

export const attendanceContract = c.router({
  createAttendance: {
    path: "/admin/attendance",
    method: "POST",
    body: attendanceInsertSchema,
    responses: {
      200: attendanceSelectSchema,
      500: honoErrorSchema,
    },
  },

  deleteAttendance: {
    path: "/admin/attendance/subject/:subjectId/user/:userId/:date",
    method: "DELETE",
    responses: {
      200: z.object({ id: z.string() }),
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

  getTodaysAttendanceBySubjectId: {
    path: "/admin/attendance/subject/:id/today",
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
      200: z.array(
        attendanceSelectSchema.extend({
          status: z.enum(["present", "absent", "off"]),
        }),
      ),
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
});
