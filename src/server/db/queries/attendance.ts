import { db } from "@/server/db/db";
import { attendance } from "@/server/db/schemas/attendance";
import { and, count, eq, gte, lte } from "drizzle-orm";

export const attendanceQueries = {
  create: async (attendanceData: typeof attendance.$inferInsert) => {
    return await db.insert(attendance).values(attendanceData).returning();
  },

  getById: async (id: string) => {
    return await db.query.attendance.findFirst({
      where: eq(attendance.id, id),
    });
  },

  getBySubjectId: async (id: string) => {
    return await db.query.attendance.findMany({
      where: eq(attendance.subjectId, id),
    });
  },

  getMonthlyAttendanceForUser: async (userId: string, subjectId: string) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const result = await db
      .select({ count: count() })
      .from(attendance)
      .where(
        and(
          eq(attendance.userId, userId),
          eq(attendance.subjectId, subjectId),
          gte(attendance.date, firstDayOfMonth),
          lte(attendance.date, lastDayOfMonth),
        ),
      );

    return result[0]?.count ?? 0;
  },

  getTodaysAttendanceForSubject: async (subjectId: string) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const result = await db
      .select({
        id: attendance.id,
        date: attendance.date,
        userId: attendance.userId,
        createdAt: attendance.createdAt,
      })

      .from(attendance)
      .where(
        and(
          eq(attendance.subjectId, subjectId),
          gte(attendance.date, todayStart),
          lte(attendance.date, todayEnd),
        ),
      );

    return result;
  },

  getByUserAndSubject: async (userId: string, subjectId: string) => {
    return await db.query.attendance.findMany({
      where: (att) => eq(att.userId, userId) && eq(att.subjectId, subjectId),
    });
  },

  getByDateRange: async (startDate: Date, endDate: Date) => {
    return await db.query.attendance.findMany({
      where: (att, { and, gte, lte }) =>
        and(gte(att.date, startDate), lte(att.date, endDate)),
    });
  },

  update: async (
    id: string,
    attendanceData: Partial<typeof attendance.$inferInsert>,
  ) => {
    return await db
      .update(attendance)
      .set(attendanceData)
      .where(eq(attendance.id, id))
      .returning();
  },

  delete: async (id: string) => {
    return await db.delete(attendance).where(eq(attendance.id, id)).returning();
  },
};
