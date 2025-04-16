import { Hono } from "hono";
import type { Context } from "@/types/hono-context";

import { attendanceRouter } from "./attendance";
import { subjectsRouter } from "./subjects";
import { userRouter } from "./user";
import { classesRouter } from "./classes";
import { paymentsRouter } from "./payments";

const app = new Hono<{ Variables: Context }>();

app.route("/attendance", attendanceRouter);
app.route("/classes", classesRouter);
app.route("/payments", paymentsRouter);
app.route("/user", userRouter);
app.route("/subjects", subjectsRouter);

export { app as adminRouter };
