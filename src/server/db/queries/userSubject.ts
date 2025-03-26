import { db } from "@/server/db/db";
import { userSubject } from "@/server/db/schemas/userSubject";
import { eq, and } from "drizzle-orm";
import { user } from "../schemas";

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

  getUsersInSubject: (subjectId: string) =>
    db
      .select()
      .from(userSubject)
      .innerJoin(user, eq(userSubject.userId, user.id))
      .where(eq(userSubject.subjectId, subjectId)),

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
