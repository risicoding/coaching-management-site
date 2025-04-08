import { db } from "../db";
import { payments, paymentSubjects } from "../schemas/payments";
import { and, eq } from "drizzle-orm";
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
      .innerJoin(paymentSubjects, eq(payments.id, payments.id))
      .where(eq(paymentSubjects.subjectId, subjectId));
  },

  getByUserId: async (userId: string) => {
    return await db.select().from(payments).where(eq(payments.userId, userId));
  },

  getByUserAndSubjectId:async (userId: string, subjectId: string) =>
    db
      .select()
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .where(
        and(
          eq(payments.userId, userId),
          eq(paymentSubjects.subjectId, subjectId),
        ),
      ),

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

export const paymentSubjectQueries = {
  create: (paymentId: string, subjects: string[]) =>
    db
      .insert(paymentSubjects)
      .values(subjects.map((sub) => ({ paymentId, subjectId: sub })))
      .returning(),

  getByPaymentId: (paymentId: string) =>
    db
      .select()
      .from(paymentSubjects)
      .where(eq(paymentSubjects.paymentId, paymentId)),
};
