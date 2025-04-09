import { db } from "../db";
import { payments, paymentSubjects } from "../schemas/payments";
import { and, eq, getTableColumns } from "drizzle-orm";
import type { z } from "zod";
import { subjects, user, type paymentsInsertSchema } from "../schemas";
import { isSameMonth } from "date-fns";

type PaymentInput = z.infer<typeof paymentsInsertSchema>;

const { userId, ...paymentColumns } = getTableColumns(payments);

export const paymentQueries = {
  create: async (data: PaymentInput) => {
    return await db.insert(payments).values(data).returning();
  },

  getAll: async () => {
    return await db
      .select({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        ...paymentColumns,
        subjects: {
          id: subjects.id,
          name: subjects.name,
          pricing: subjects.pricing,
        },
      })
      .from(payments)
      .innerJoin(user, eq(payments.userId, user.id))
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(subjects, eq(subjects.id, paymentSubjects.subjectId));
  },

  getById: async (id: string) => {
    return await db
      .select({
        ...paymentColumns,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
        subject: {
          id: subjects.id,
          name: subjects.name,
          pricing: subjects.pricing,
        },
      })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(user, eq(payments.userId, user.id))
      .innerJoin(subjects, eq(paymentSubjects.subjectId, subjects.id))
      .where(eq(payments.id, id))
      .limit(1);
  },

  getBySubjectId: async (subjectId: string) => {
    return await db
      .select({
        ...paymentColumns,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, payments.id))
      .innerJoin(user, eq(payments.userId, user.id))
      .where(eq(paymentSubjects.subjectId, subjectId));
  },

  getByUserId: async (userId: string) => {
    return await db
      .select({ ...paymentColumns, subjects })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(subjects, eq(paymentSubjects.subjectId, subjects.id))
      .where(eq(payments.userId, userId));
  },

  getByUserAndSubjectId: async (userId: string, subjectId: string) =>
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
