import { db } from "../db";
import { payments } from "../schemas/payments";
import { eq, and, gte, lt } from "drizzle-orm";
import type { z } from "zod";
import type { paymentsInsertSchema } from "../schemas";
import { isSameMonth } from "date-fns";

type PaymentInput = z.infer<typeof paymentsInsertSchema>;

export const paymentQueries = {
  create: async (data: PaymentInput) => {
    return await db.insert(payments).values(data).returning();
  },

  getAll: async () => {
    return await db.select().from(payments);
  },

  getById: async (id: string) => {
    return await db.select().from(payments).where(eq(payments.id, id)).limit(1);
  },

  getBySubjectId: async (subjectId: string) => {
    return await db
      .select()
      .from(payments)
      .where(eq(payments.subjectId, subjectId));
  },

  getByUserId: async (userId: string) => {
    return await db.select().from(payments).where(eq(payments.userId, userId));
  },

  getByUserAndMonth: async (userId: string, targetMonth: Date) => {
    const allUserPayments = await db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId));
    return allUserPayments.filter((p) =>
      isSameMonth(new Date(p.month), targetMonth),
    );
  },

  deleteById: async (id: string) => {
    return await db.delete(payments).where(eq(payments.id, id));
  },
};
