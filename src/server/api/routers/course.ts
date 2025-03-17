import { courseInsertSchema, courses } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Create a tRPC router for course management
export const courseRouter = createTRPCRouter({
  /**
   * Create a new course (Admin only)
   */
  create: adminProcedure
    .input(courseInsertSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Insert new course into the database
        const res = await ctx.db.insert(courses).values(input).returning();
        return res;
      } catch (err) {
        // Handle errors gracefully
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  /**
   * Fetch all courses (Public access)
   */
  fetchAll: publicProcedure.query(async ({ ctx }) => {
    try {
      // Retrieve all courses from the database
      const res = await ctx.db.query.courses.findMany();
      return res;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: (err as Error).message,
      });
    }
  }),

  /**
   * Fetch a single course by ID (Public access)
   */
  fetchById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        // Find a course by its ID
        const res = await ctx.db.query.courses.findFirst({
          where: (courses, { eq }) => eq(courses.id, input.id),
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
   * Update an existing course (Admin only)
   */
  update: adminProcedure
    .input(courseInsertSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Update course details in the database
        const res = await ctx.db
          .update(courses)
          .set(input)
          .where(eq(courses.id, input.id!));
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  /**
   * Delete a course by ID (Admin only)
   */
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Delete a course and return the deleted record
        const res = await ctx.db
          .delete(courses)
          .where(eq(courses.id, input.id))
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

