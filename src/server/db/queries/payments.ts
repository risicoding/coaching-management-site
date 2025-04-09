import { db } from "../db";
import { payments, paymentSubjects } from "../schemas/payments";
import { and, eq, getTableColumns } from "drizzle-orm";
import type { z } from "zod";
import {
  subjects as subjectsSchema,
  user as userSchema,
  type paymentsInsertSchema,
} from "../schemas";
import { isSameMonth } from "date-fns";

type PaymentInput = z.infer<typeof paymentsInsertSchema>;

const { userId, ...paymentColumns } = getTableColumns(payments);

export const paymentQueries = {
  create: async (data: PaymentInput) => {
    return await db.insert(payments).values(data).returning();
  },

  getAll: async () => {
    const results = await db
      .select({
        user: {
          id: userSchema.id,
          name: userSchema.name,
          email: userSchema.email,
          image: userSchema.image,
        },
        ...paymentColumns,
        subjects: subjectsSchema,
      })
      .from(payments)
      .innerJoin(userSchema, eq(payments.userId, userSchema.id))
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(
        subjectsSchema,
        eq(subjectsSchema.id, paymentSubjects.subjectId),
      );

    if (results.length === 0) return null;

    const { user, ...paymentData } = results[0]!;

    return {
      ...paymentData,
      user,
      subjects: results.map((r) => r.subjects).filter(Boolean),
    };
  },

  getById: async (id: string) => {
    const results = await db
      .select({
        ...paymentColumns,
        user: {
          id: userSchema.id,
          name: userSchema.name,
          email: userSchema.email,
          image: userSchema.image,
        },
        subjects: {
          id: subjectsSchema.id,
          name: subjectsSchema.name,
          pricing: subjectsSchema.pricing,
        },
      })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(userSchema, eq(payments.userId, userSchema.id))
      .innerJoin(
        subjectsSchema,
        eq(paymentSubjects.subjectId, subjectsSchema.id),
      )
      .where(eq(payments.id, id));

    if (results.length === 0) return null;

    const { user, ...paymentData } = results[0]!;
    return {
      ...paymentData,
      user,
      subjects: results.map((r) => r.subjects).filter(Boolean),
    };
  },

  getBySubjectId: async (subjectId: string) => {
    return await db
      .select({
        ...paymentColumns,
        user: {
          id: userSchema.id,
          name: userSchema.name,
          email: userSchema.email,
        },
      })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(userSchema, eq(payments.userId, userSchema.id))
      .where(eq(paymentSubjects.subjectId, subjectId));
  },

  getByUserId: async (userId: string) => {
    return await db
      .select({
        ...paymentColumns,
        subjects: {
          id: subjectsSchema.id,
          name: subjectsSchema.name,
          pricing: subjectsSchema.pricing,
        },
      })
      .from(payments)
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .innerJoin(
        subjectsSchema,
        eq(paymentSubjects.subjectId, subjectsSchema.id),
      )
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
