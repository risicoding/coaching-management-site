import { userSubjectQueries } from "@/server/db/queries/userSubject";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
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
});
