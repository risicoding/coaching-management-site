import { db } from "@/server/db/db";
import { attendance } from "@/server/db/schemas/attendance";
import { and, asc, count, eq, gte, lte, sql } from "drizzle-orm";

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

  getAttendanceByUserIdSubjectId: async (userId: string, subjectId: string) => {
    const result = await db
      .select()
      .from(attendance)
      .where(
        and(eq(attendance.userId, userId), eq(attendance.subjectId, subjectId)),
      )
      .orderBy(asc(attendance.date));

    return result;
  },

  getMonthlyAttendance: async (userId: string, subjectId: string) => {
    return await db
      .select()
      .from(attendance)
      .where(
        sql`${attendance.userId} = ${userId} 
      AND ${attendance.subjectId} = ${subjectId}
      AND date_trunc('month', ${attendance.date}) = date_trunc('month', CURRENT_TIMESTAMP)`,
      );
  },

  getMonthlyAttendanceCount: async (userId: string, subjectId: string) => {
    const result = await db
      .select({ count: count() })
      .from(attendance)
      .where(
        sql`${attendance.userId} = ${userId} 
      AND ${attendance.subjectId} = ${subjectId}
      AND date_trunc('month', ${attendance.date}) = date_trunc('month', CURRENT_TIMESTAMP)`,
      );
    return result[0]?.count ?? 0;
  },

  getTodaysAttendanceBySubjectId: async (subjectId: string) => {
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

  getPresentCount: (subjectId: string) =>
    db
      .select({
        date: attendance.date,
        userCount: sql<number>`COUNT(DISTINCT ${attendance.userId})`,
      })
      .from(attendance)
      .where(eq(attendance.subjectId, subjectId))
      .groupBy(attendance.date)
      .orderBy(attendance.date),

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

  delete: async ({
    userId,
    subjectId,
    date,
  }: typeof attendance.$inferInsert) => {
    return await db
      .delete(attendance)
      .where(
        and(
          eq(attendance.userId, userId),
          eq(attendance.subjectId, subjectId),
          eq(attendance.date, date),
        ),
      )
      .returning();
  },
};
