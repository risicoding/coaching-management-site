import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { paymentQueries } from "@/server/db/queries/payments";
import { paymentsInsertSchema } from "@/server/db/schemas";
import { isSameMonth } from "date-fns";

export const paymentsRouter = createTRPCRouter({
  create: adminProcedure
    .input(paymentsInsertSchema)
    .mutation(async ({ input }) => {
      try {
        const [payment] = await paymentQueries.create(input);
        return payment;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  getAll: adminProcedure.query(async () => {
    try {
      return await paymentQueries.getAll();
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const [payment] = await paymentQueries.getById(input);
      return payment;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getByUser: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      return await paymentQueries.getByUserId(input);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getSelf: privateProcedure.query(async ({ ctx }) => {
    try {
      return await paymentQueries.getByUserId(ctx.session.user.id);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getByUserAndMonth: adminProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        month: z.date(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const all = await paymentQueries.getByUserId(input.userId);
        return all.filter((p) => isSameMonth(new Date(p.month), input.month));
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  deleteById: adminProcedure
    .input(z.string().uuid())
    .mutation(async ({ input }) => {
      try {
        return await paymentQueries.deleteById(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
});
