import { userSubjectQueries } from "@/server/db/queries/userSubject";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { userQueries } from "@/server/db/queries/user";
import { api } from "@/trpc/server";

export const userRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
    try {
      const result = await userQueries.getAll();
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const result = await userQueries.getById(input);
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (error as Error).message,
      });
    }
  }),

  getByEmail: adminProcedure
    .input(z.string().email())
    .query(async ({ input }) => {
      try {
        const result = await userQueries.getByEmail(input);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  getUsersBySubjectId: adminProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const result = await userSubjectQueries.getUsersInSubject(input);
        return result.length > 0 ? result : undefined;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  setRole: adminProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
        role: z.enum(["admin", "student"]),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const result = await userQueries.setRole(input.ids, input.role);


        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),

  delete: adminProcedure
    .input(z.array(z.string()))
    .mutation(async ({ input }) => {
      try {
        const result = await userQueries.delete(input);
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (error as Error).message,
        });
      }
    }),
});
