import { db } from "@/server/db/db";
import { subjects } from "@/server/db/schemas/subjects";
import { eq } from "drizzle-orm";

export const subjectsQueries = {
  create: async (subjectData: typeof subjects.$inferInsert) => {
    return await db.insert(subjects).values(subjectData).returning();
  },

  getById: async (id: number) => {
    return await db.query.subjects.findFirst({
      where: eq(subjects.id, id),
    });
  },

  getByUUID: async (uuid: string) => {
    return await db.query.subjects.findFirst({
      where: eq(subjects.uuid, uuid),
    });
  },

  getByClassId: async (classId: number) => {
    return await db.query.subjects.findMany({
      where: eq(subjects.classId, classId),
    });
  },

  update: async (
    id: number,
    subjectData: Partial<typeof subjects.$inferInsert>,
  ) => {
    return await db
      .update(subjects)
      .set(subjectData)
      .where(eq(subjects.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return await db.delete(subjects).where(eq(subjects.id, id)).returning();
  },
};
