import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { honoErrorSchema } from "@/lib/hono-error";
import {
  paymentInsertSchema,
  paymentSelectSchema,
  paymentsWithSubjectsUserSelectSchema,
  paymentsWithUserSelectSchema,
  paymentsWithSubjectsSelectSchema,
} from "@/server/db/schemas/zodSchemas";

const c = initContract();

export const paymentsContract = c.router({
  getAllPayments: {
    path: "/admin/payments",
    method: "GET",
    responses: {
      200: z.array(paymentsWithSubjectsUserSelectSchema),
      500: honoErrorSchema,
    },
  },

  getPaymentById: {
    path: "/admin/payments/:id",
    method: "GET",
    responses: {
      200: paymentsWithSubjectsUserSelectSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  createPayment: {
    path: "/admin/payments",
    method: "POST",
    body: paymentInsertSchema,
    responses: {
      200: paymentSelectSchema,
      500: honoErrorSchema,
    },
  },

  getPaymentsBySubjectId: {
    path: "/admin/payments/subject/:subjectId",
    method: "GET",
    responses: {
      200: z.array(paymentsWithUserSelectSchema),
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getPaymentsByUserId: {
    path: "/admin/payments/user/:userId",
    method: "GET",
    responses: {
      200: z.array(paymentsWithSubjectsSelectSchema),
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getPaymentsByUserAndSubjectId: {
    path: "/admin/payments/user/:userId/subject/:subjectId",
    method: "GET",
    responses: {
      200: paymentSelectSchema.omit({ userId: true }),
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  deletePaymentById: {
    path: "/admin/payments/:id",
    method: "DELETE",
    responses: {
      200: paymentSelectSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },
});
