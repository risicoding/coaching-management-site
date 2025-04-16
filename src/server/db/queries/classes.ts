import { db } from "@/server/db/db";
import { classes } from "@/server/db/schemas/classes";
import { eq } from "drizzle-orm";

export const classesQueries = {
  create: (classData: typeof classes.$inferInsert) =>
    db.insert(classes).values(classData).returning({ id: classes.id }),

  getAll: () =>
    db.query.classes.findMany({
      orderBy: (classes, { asc }) => [asc(classes.classNumber)],
    }),

  getById: (id: string) =>
    db.query.classes.findFirst({
      where: eq(classes.id, id),
    }),

  update: (id: string, classData: Partial<typeof classes.$inferInsert>) =>
    db
      .update(classes)
      .set(classData)
      .where(eq(classes.id, id))
      .returning({ id: classes.id }),

  delete: (id: string) =>
    db.delete(classes).where(eq(classes.id, id)).returning({ id: classes.id }),
};
