import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { attendanceRouter } from "./routers/attendance";
import { subjectsRouter } from "./routers/subjects";
import { classesRouter } from "./routers/classes";
import { userRouter } from "./routers/user";
import { paymentsRouter } from "./routers/payments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subjects: subjectsRouter,
  classes: classesRouter,
  attendance: attendanceRouter,
  users: userRouter,
  payments: paymentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
