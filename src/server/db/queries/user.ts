import { db } from "@/server/db/db";
import { users } from "@/server/db/schemas/users";
import { eq } from "drizzle-orm";

export const userQueries = {
  create: async (userData: typeof users.$inferInsert) => {
    return await db.insert(users).values(userData).returning();
  },

  getById: async (id: number) => {
    return await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  },

  getByEmail: async (email: string) => {
    return await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  },

  update: async (id: number, userData: Partial<typeof users.$inferInsert>) => {
    return await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
  },

  delete: async (id: number) => {
    return await db.delete(users).where(eq(users.id, id)).returning();
  },
};
