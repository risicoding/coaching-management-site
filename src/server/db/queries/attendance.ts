import { db } from "@/server/db/db";
import { attendance } from "@/server/db/schemas/attendance";
import { eq } from "drizzle-orm";

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
