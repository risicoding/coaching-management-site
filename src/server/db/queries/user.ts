import { eq, getTableColumns, inArray } from "drizzle-orm";
import { db } from "../db";
import { user } from "../schemas";

const { emailVerified, banned, banReason, banExpires, updatedAt, ...rest } =
  getTableColumns(user);

export const userQueries = {
  getAll: async () => {
    return await db.select({ ...rest }).from(user);
  },

  getById: async (id: string) => {
    return await db
      .select({ ...rest })
      .from(user)
      .where(eq(user.id, id))
      .then((res) => res[0]);
  },

  getByEmail: async (email: string) => {
    return await db
      .select({ ...rest })
      .from(user)
      .where(eq(user.email, email))
      .then((res) => res[0]);
  },

  getAdmins: async () => {
    return await db
      .select({ ...rest })
      .from(user)
      .where(eq(user.role, "admin"));
  },
  getUsers: async () => {
    return await db
      .select({ ...rest })
      .from(user)
      .where(eq(user.role, "student"));
  },

  delete: async (ids: string[]) => {
    return await db
      .delete(user)
      .where(inArray(user.id, ids))
      .returning({ id: user.id });
  },

  setRole: async (ids: string[], role: "admin" | "student") => {
    return await db
      .update(user)
      .set({ role })
      .where(inArray(user.id, ids))
      .returning({ id: user.id, role: user.role });
  },
};
