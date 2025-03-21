import { TRPCError } from "@trpc/server";
import { adminProcedure } from "../trpc";
import { classesQueries } from "@/server/db/queries/classes";
import { classInsertSchema } from "@/server/db/schemas/zodSchemas";
import { createTRPCRouter } from "../trpc";
import { z } from "zod";

export const classesRouter = createTRPCRouter({
  create: adminProcedure.input(classInsertSchema).mutation(async ({ input }) => {
    try {
      return await classesQueries.create(input);
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create class",
        cause: error,
      });
    }
  }),

  getById: adminProcedure.input(z.number()).query(async ({ input }) => {
    try {
      const result = await classesQueries.getById(input);
      if (!result) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Class not found" });
      }
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch class by ID",
        cause: error,
      });
    }
  }),

  getByUUID: adminProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const result = await classesQueries.getByUUID(input);
      if (!result) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Class not found" });
      }
      return result;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch class by UUID",
        cause: error,
      });
    }
  }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        data: classInsertSchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const updated = await classesQueries.update(input.id, input.data);
        if (!updated) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Class not found" });
        }
        return updated;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update class",
          cause: error,
        });
      }
    }),

  delete: adminProcedure.input(z.number()).mutation(async ({ input }) => {
    try {
      const deleted = await classesQueries.delete(input);
      if (!deleted) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Class not found" });
      }
      return deleted;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete class",
        cause: error,
      });
    }
  }),
});

