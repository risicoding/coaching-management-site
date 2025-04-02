import { TRPCError } from "@trpc/server";
import { adminProcedure, privateProcedure } from "../trpc";
import { attendanceQueries } from "@/server/db/queries/attendance";
import {
  attendanceInsertSchema,
  daysEnum,
} from "@/server/db/schemas/zodSchemas";
import { createTRPCRouter } from "../trpc";
import { z } from "zod";
import { filterWeekdays, transformData } from "@/lib/date";
import { subjectsQueries } from "@/server/db/queries/subjects";

export const attendanceRouter = createTRPCRouter({
  create: adminProcedure
    .input(attendanceInsertSchema)
    .mutation(async ({ input }) => {
      try {
        return await attendanceQueries.create(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to record attendance",
          cause: error,
        });
      }
    }),

  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const result = await attendanceQueries.getById(input);
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attendance record not found",
        });
      }
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch attendance record",
        cause: error,
      });
    }
  }),

  getBySubjectId: privateProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const result = await attendanceQueries.getBySubjectId(input);
        if (!result) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Attendance record not found",
          });
        }
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance records for subject",
          cause: error,
        });
      }
    }),

  getAttendanceByUserIdSubjectId: adminProcedure
    .input(z.object({ userId: z.string(), subjectId: z.string() }))
    .query(async ({ input }) => {
      try {
        const subject = await subjectsQueries.getById(input.subjectId);
        const result = await attendanceQueries.getAttendanceByUserIdSubjectId(
          input.userId,
          input.subjectId,
        );
        return filterWeekdays(
          transformData(result),
          subject?.days ?? daysEnum.options.filter((val) => val !== "sun"),
        );
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  getMonthlyAttendance: adminProcedure
    .input(z.object({ userId: z.string(), subjectId: z.string() }))
    .query(async ({ input }) => {
      try {
        const result =await attendanceQueries.getMonthlyAttendance(
          input.userId,
          input.subjectId,
        );
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  getMonthlyAttendanceCount: adminProcedure
    .input(z.object({ userId: z.string(), subjectId: z.string() }))
    .query(async ({ input }) => {
      try {
        const result =await attendanceQueries.getMonthlyAttendanceCount(
          input.userId,
          input.subjectId,
        );
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),


  getTodaysAttendanceBySubjectId: adminProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const result =
          await attendanceQueries.getTodaysAttendanceBySubjectId(input);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance records for subject",
          cause: error,
        });
      }
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: attendanceInsertSchema.partial(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await attendanceQueries.update(input.id, input.data);
        if (!updated) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Attendance record not found",
          });
        }
        return updated;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update attendance record",
          cause: error,
        });
      }
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const deleted = await attendanceQueries.delete(input);
      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Attendance record not found",
        });
      }
      return deleted;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete attendance record",
        cause: error,
      });
    }
  }),
});
