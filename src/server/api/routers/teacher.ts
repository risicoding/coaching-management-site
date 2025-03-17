import { z } from "zod";
import { teachers } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { teacherInsertSchema } from "@/server/db/schema";

// Teacher insert schema

/**
 * tRPC router for managing teachers
 */
export const teacherRouter = createTRPCRouter({
  /**
   * Create a new teacher (Admin only)
   */
  create: adminProcedure
    .input(teacherInsertSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.insert(teachers).values(input).returning();
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  /**
   * Fetch all teachers (Public access)
   */

  fetchAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.db.query.teachers.findMany();
      return res;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (err as Error).message,
      });
    }
  }),

  /**
   * Fetch a single teacher by ID (Public access)
   */

  fetchById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const res = await ctx.db.query.teachers.findFirst({
          where: (teachers, { eq }) => eq(teachers.id, input.id),
        });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  /**
   * Update a teacher (Admin only)
   */

  update: adminProcedure
    .input(teacherInsertSchema.extend({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db
          .update(teachers)
          .set(input)
          .where(eq(teachers.id, input.id));
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  /**
   * Delete a teacher (Admin only)
   */

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const res = await ctx.db
          .delete(teachers)
          .where(eq(teachers.id, input.id))
          .returning();
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),
});
