import { TRPCError } from "@trpc/server";
import { adminProcedure, privateProcedure } from "../trpc";
import { subjectsQueries } from "@/server/db/queries/subjects";
import { subjectInsertSchema } from "@/server/db/schemas/zodSchemas";
import { createTRPCRouter } from "../trpc";
import { z } from "zod";

export const subjectsRouter = createTRPCRouter({
  create: adminProcedure
    .input(subjectInsertSchema)
    .mutation(async ({ input }) => {
      try {
        return await subjectsQueries.create(input);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create subject",
          cause: error,
        });
      }
    }),

  getAll: adminProcedure.query(async () => {
    try {
      const result = await subjectsQueries.getAll();
      if (!result)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subjects not found",
        });
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subject by ID",
        cause: error,
      });
    }
  }),

  getById: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const result = await subjectsQueries.getById(input);
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subject not found",
        });
      }
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subject by ID",
        cause: error,
      });
    }
  }),

  getEnrolled: privateProcedure.query(async ({ ctx }) => {
    const {
      user: { id },
    } = ctx.session;
    try {
      const result = await subjectsQueries.getEnrolled(id);
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subject by UUID",
        cause: error,
      });
    }
  }),

  getByClassId: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const result = await subjectsQueries.getByClassId(input);
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch subjects for class",
        cause: error,
      });
    }
  }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: subjectInsertSchema.partial(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await subjectsQueries.update(input.id, input.data);
        if (!updated) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Subject not found",
          });
        }
        return updated;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update subject",
          cause: error,
        });
      }
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    try {
      const deleted = await subjectsQueries.delete(input);
      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Subject not found",
        });
      }
      return deleted;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete subject",
        cause: error,
      });
    }
  }),
});
