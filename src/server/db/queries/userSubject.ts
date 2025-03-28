import { db } from "@/server/db/db";
import { userSubject } from "@/server/db/schemas/userSubject";
import { eq, and } from "drizzle-orm";
import { subjects, user  } from "../schemas";

export const userSubjectQueries = {
  enrollUser: (userSubjectData: typeof userSubject.$inferInsert) =>
    db.insert(userSubject).values(userSubjectData).returning(),

  getByUserId: (userId: string) =>
    db.query.userSubject.findMany({
      where: eq(userSubject.userId, userId),
    }),

  getBySubjectId: (subjectId: string) =>
    db.query.userSubject.findMany({
      where: eq(userSubject.subjectId, subjectId),
    }),

  getEnrollment: (userId: string, subjectId: string) =>
    db.query.userSubject.findFirst({
      where: and(
        eq(userSubject.userId, userId),
        eq(userSubject.subjectId, subjectId),
      ),
    }),

  getEnrolledSubject: async (userId: string, subjectId: string) => {
    const result = await db
      .select({
        id: subjects.id,
        name: subjects.name,
        days: subjects.days,
        pricing: subjects.pricing,
      })
      .from(userSubject)
      .innerJoin(subjects, eq(userSubject.subjectId, subjects.id))
      .where(
        and(
          eq(userSubject.userId, userId),
          eq(userSubject.subjectId, subjectId),
        ),
      )
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  },

  getUsersInSubject: (subjectId: string) =>
    db
      .select()
      .from(userSubject)
      .innerJoin(user, eq(userSubject.userId, user.id))
      .where(eq(userSubject.subjectId, subjectId)),

  getSubjectsByUserId: (userId: string) =>
    db
      .select({
        id: subjects.id,
        name: subjects.name,
        days: subjects.days,
        pricing: subjects.pricing,
      time:subjects.time
      })
      .from(userSubject)
      .innerJoin(subjects, eq(userSubject.subjectId, subjects.id))
      .where(eq(userSubject.userId, userId)),

  unenrollUser: (userId: string, subjectId: string) =>
    db
      .delete(userSubject)
      .where(
        and(
          eq(userSubject.userId, userId),
          eq(userSubject.subjectId, subjectId),
        ),
      )
      .returning(),
};
