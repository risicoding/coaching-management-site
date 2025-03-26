import { db } from "@/server/db/db";
import { subjects } from "@/server/db/schemas/subjects";
import { eq } from "drizzle-orm";
import { userSubject } from "../schemas";

export const subjectsQueries = {
  create: (subjectData: typeof subjects.$inferInsert) =>
    db.insert(subjects).values(subjectData).returning(),

  getById: (id: string) =>
    db.query.subjects.findFirst({
      where: eq(subjects.id, id),
    }),

  getByClassId: (classId: string) =>
    db.query.subjects.findMany({
      where: eq(subjects.classId, classId),
    }),

  getEnrolled: (userId: string) =>
    db
      .select()
      .from(userSubject)
      .innerJoin(subjects, eq(userSubject.subjectId, subjects.id))
      .where(eq(userSubject.userId, userId)),

  update: (id: string, subjectData: Partial<typeof subjects.$inferInsert>) =>
    db.update(subjects).set(subjectData).where(eq(subjects.id, id)).returning(),

  delete: (id: string) =>
    db.delete(subjects).where(eq(subjects.id, id)).returning(),
};
