import {
  courseInsertSchema,
  courses as coursesTable,
  userCourse,
  users,
} from "@/server/db/schema";
import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { eq, inArray } from "drizzle-orm";

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
        const res = await ctx.db.insert(coursesTable).values(input).returning();
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

  fetchEnrolled: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.session;
    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    try {
      const [userEntry] = await ctx.db
        .select()
        .from(users)
        .where(eq(users.clerkUserId, userId));

      if (!userEntry) throw new TRPCError({ code: "NOT_FOUND" });

      const userCourseEntries = await ctx.db
        .select()
        .from(userCourse)
        .where(eq(userCourse.userId, userEntry.id));

      const courseIds = userCourseEntries.map((entry) => entry.courseId);

      if (!courseIds.length) return [];

      const courses = await ctx.db
        .select()
        .from(coursesTable)
        .where(inArray(coursesTable.id, courseIds));

      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
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
          .update(coursesTable)
          .set(input)
          .where(eq(coursesTable.id, input.id!));
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
          .delete(coursesTable)
          .where(eq(coursesTable.id, input.id))
          .returning();
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),

  enroll: privateProcedure
    .input(z.object({ courseId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.session;
      if (!userId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const { courseId } = input;

      try {
        const user = await ctx.db
          .select()
          .from(users)
          .where(eq(users.clerkUserId, userId));
        if (user[0] === undefined)
          throw new TRPCError({ code: "UNAUTHORIZED" });

        const res = await ctx.db
          .insert(userCourse)
          .values({ userId: user[0]?.id, courseId });
        return res;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: (err as Error).message,
        });
      }
    }),
});
