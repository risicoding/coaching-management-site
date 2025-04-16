import { auth } from "@/auth";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { adminRouter } from "./routes/admin";

const app = new Hono().basePath("/api");

app.use(logger());

app.on(["GET", "POST"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.route("/admin", adminRouter);

export { app };
