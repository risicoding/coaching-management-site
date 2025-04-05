import { db } from "@/server/db/db";
import { subjects } from "@/server/db/schemas/subjects";
import { eq } from "drizzle-orm";
import { type subjectInsertSchema, userSubject } from "../schemas";
import type { z } from "zod";

export const subjectsQueries = {
  create: (subjectData: z.infer<typeof subjectInsertSchema>) =>
    db.insert(subjects).values(subjectData).returning(),

  getById: (id: string) =>
    db.query.subjects.findFirst({
      where: eq(subjects.id, id),
    }),
  getAll: () =>
    db.query.subjects.findMany({
      orderBy: (subjects, { desc }) => [desc(subjects.createdAt)],
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

  update: (id: string, data: Partial<z.infer<typeof subjectInsertSchema>>) =>
    db.update(subjects).set(data).where(eq(subjects.id, id)).returning(),

  delete: (id: string) =>
    db.delete(subjects).where(eq(subjects.id, id)).returning(),
};
