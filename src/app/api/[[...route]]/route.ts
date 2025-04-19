import { handle } from "hono/vercel";
import { auth } from "@/auth";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { adminRouter } from "./admin";
import { authMiddleware } from "./auth";
import { superjsonMiddleware } from "@/lib/superjson";

const app = new Hono().basePath("/api");

app.use(logger());

app.on(["GET", "POST"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/onboard", async (c) => {
  const headers = c.req.raw.headers;

  const session = await auth.api.getSession({ headers });

  if (!session) return c.redirect("/login");

  if (session.user.role === "admin") {
    return c.redirect("/admin");
  }

  return c.redirect("/dashboard");
});

app.use(superjsonMiddleware);
app.use(authMiddleware);
app.route("/admin", adminRouter);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
