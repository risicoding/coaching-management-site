import { z } from "zod";
import { adminProcedure, publicProcedure, createTRPCRouter } from "../trpc";
import { attendance } from "@/server/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// ✅ Schema Definitions
const createAttendanceSchema = z.object({
  userId: z.number().int(),
  courseId: z.number().int(),
  date: z.string().datetime(),
  status: z.enum(["present", "absent", "late"]).default("present"),
});

const deleteAttendanceSchema = z.object({
  userId: z.number().int(),
  courseId: z.number().int(),
  date: z.string().datetime(),
});

const fetchByStudentSchema = z.object({
  userId: z.number().int(),
});

const fetchByCourseSchema = z.object({
  courseId: z.number().int(),
});

export const attendanceRouter = createTRPCRouter({
  // ✅ Create Attendance (Admin Only)
  create: adminProcedure
    .input(createAttendanceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId, courseId, date, status } = input;

        await ctx.db.insert(attendance).values({
          userId,
          courseId,
          date: new Date(date), // Ensure date is properly converted to a JS Date object
          status,
          createdAt: sql`CURRENT_TIMESTAMP`,
        });

        return { success: true, message: "Attendance recorded successfully" };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  // ✅ Remove Attendance (Admin Only)
  remove: adminProcedure
    .input(deleteAttendanceSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const { userId, courseId, date } = input;

        const deletedRecords = await ctx.db
          .delete(attendance)
          .where(
            and(
              eq(attendance.userId, userId),
              eq(attendance.courseId, courseId),
              eq(attendance.date, new Date(date))
            )
          )
          .returning();

        if (deletedRecords.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Attendance record not found",
          });
        }

        return { success: true, message: "Attendance record removed successfully" };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  // ✅ Fetch All Attendance Records (Admin Only)
  fetchAll: adminProcedure.query(async ({ ctx }) => {
    try {
      const attendanceRecords = await ctx.db.select().from(attendance);
      return attendanceRecords;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch attendance records",
      });
    }
  }),

  // ✅ Fetch Attendance by Student ID (Public)
  fetchByStudentId: publicProcedure
    .input(fetchByStudentSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { userId } = input;

        const attendanceRecords = await ctx.db
          .select()
          .from(attendance)
          .where(eq(attendance.userId, userId));

        if (attendanceRecords.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No attendance records found for this student",
          });
        }

        return attendanceRecords;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance records for student",
        });
      }
    }),

  // ✅ Fetch Attendance by Course ID (Admin Only)
  fetchByCourseId: adminProcedure
    .input(fetchByCourseSchema)
    .query(async ({ ctx, input }) => {
      try {
        const { courseId } = input;

        const attendanceRecords = await ctx.db
          .select()
          .from(attendance)
          .where(eq(attendance.courseId, courseId));

        if (attendanceRecords.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No attendance records found for this course",
          });
        }

        return attendanceRecords;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch attendance records for course",
        });
      }
    }),
});
