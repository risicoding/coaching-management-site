import type { auth } from "@/auth";
export type Context = {
  session: NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
};
