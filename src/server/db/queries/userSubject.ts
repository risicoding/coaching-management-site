import { db } from "@/server/db/db";
import { userSubject } from "@/server/db/schemas/userSubject";
import { eq, and } from "drizzle-orm";
import { users } from "../schemas";

export const userSubjectQueries = {
  enrollUser: async (userSubjectData: typeof userSubject.$inferInsert) => {
    return await db.insert(userSubject).values(userSubjectData).returning();
  },

  getByUserId: async (userId: number) => {
    return await db.query.userSubject.findMany({
      where: eq(userSubject.userId, userId),
    });
  },

  getBySubjectId: async (subjectId: number) => {
    return await db.query.userSubject.findMany({
      where: eq(userSubject.subjectId, subjectId),
    });
  },

  getEnrollment: async (userId: number, subjectId: number) => {
    return await db.query.userSubject.findFirst({
      where: and(
        eq(userSubject.userId, userId),
        eq(userSubject.subjectId, subjectId),
      ),
    });
  },

  getUsersInSubject: async (subjectId: number) => {
    return await db
      .select()
      .from(userSubject)
      .innerJoin(users, eq(userSubject.userId, users.id))
      .where(eq(userSubject.subjectId, subjectId));
  },

  unenrollUser: async (userId: number, subjectId: number) => {
    return await db
      .delete(userSubject)
      .where(
        and(
          eq(userSubject.userId, userId),
          eq(userSubject.subjectId, subjectId),
        ),
      )
      .returning();
  },
};
