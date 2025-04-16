import { db } from "../db";
import { payments, paymentSubjects } from "../schemas/payments";
import { and, eq, getTableColumns } from "drizzle-orm";
import type { z } from "zod";
import { user  } from "../schemas";
import {paymentInsertSchema} from '@/server/db/schemas/zodSchemas'
import { isSameMonth } from "date-fns";

type PaymentInput = z.infer<typeof paymentInsertSchema>;

const { userId, ...paymentColumns } = getTableColumns(payments);

export const paymentQueries = {
  create: async (data: PaymentInput) => {
    return await db.insert(payments).values(data).returning();
  },

  getAll: async () => {
    const result = await db.query.payments.findMany({
      with: {
        user: { columns: { id: true, name: true, email: true, image: true } },
        paymentSubjects: {
          with: {
            subject: {
              columns: {
                id: true,
                name: true,
                pricing: true,
              },
            },
          },
        },
      },
    });

    return result.map((r) => {
      const { paymentSubjects, ...rest } = r;
      return { ...rest, subjects: paymentSubjects.map((p) => p.subject!) };
    });
  },

  getById: async (id: string) => {
    const result = await db.query.payments.findFirst({
      where: (payments, { eq }) => eq(payments.id, id),
      with: {
        user: { columns: { id: true, name: true, email: true, image: true } },
        paymentSubjects: {
          with: {
            subject: {
              columns: {
                id: true,
                name: true,
                pricing: true,
              },
            },
          },
        },
      },
    });

    if (!result) return undefined;

    const { paymentSubjects, ...rest } = result;
    return { ...rest, subjects: paymentSubjects.map((p) => p.subject!) };
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
      .innerJoin(user, eq(payments.userId, user.id))
      .innerJoin(paymentSubjects, eq(payments.id, paymentSubjects.paymentId))
      .where(eq(paymentSubjects.subjectId, subjectId));
  },

  getByUserId: async (userId: string) => {
    const result = await db.query.payments.findMany({
      where: (payments, { eq }) => eq(payments.userId, userId),
      with: {
        paymentSubjects: {
          with: {
            subject: {
              columns: {
                id: true,
                name: true,
                pricing: true,
              },
            },
          },
        },
      },
    });

    return result.map((r) => {
      const { paymentSubjects, userId, ...rest } = r;
      return {
        ...rest,
        subjects: paymentSubjects.map((p) => p.subject),
      };
    });
  },

  getByUserAndSubjectId: async (userId: string, subjectId: string) =>
    db
      .select({
        id: payments.id,
        invoiceNumber: payments.invoiceNumber,
        month: payments.month,
        amount: payments.month,
        createdAt: payments.createdAt,
      })
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
  create: async (paymentId: string, subjects: string[]) => {
    console.log(paymentId, subjects);
    const res = await db
      .insert(paymentSubjects)
      .values(subjects.map((sub) => ({ paymentId, subjectId: sub })))
      .returning();
    console.log(res);
    return res;
  },

  getByPaymentId: (paymentId: string) =>
    db
      .select()
      .from(paymentSubjects)
      .where(eq(paymentSubjects.paymentId, paymentId)),
};
