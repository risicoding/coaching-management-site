import { db } from "@/server/db/db";
import { classes } from "@/server/db/schemas/classes";
import { eq } from "drizzle-orm";

export const classesQueries = {
  create: async (classData: typeof classes.$inferInsert) => {
    return await db.insert(classes).values(classData).returning();
  },

  getById: async (id: number) => {
    return await db.query.classes.findFirst({
      where: eq(classes.id, id),
    });
  },

  getByUUID: async (uuid: string) => {
    return await db.query.classes.findFirst({
      where: eq(classes.uuid, uuid),
    });
  },

  update: async (id: number, classData: Partial<typeof classes.$inferInsert>) => {
    return await db
      .update(classes)
      .set(classData)
      .where(eq(classes.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return await db.delete(classes).where(eq(classes.id, id)).returning();
  },
};

