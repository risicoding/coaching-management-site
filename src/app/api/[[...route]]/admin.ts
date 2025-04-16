import { Hono } from "hono";
import { adminMiddleware } from "./auth";
import { attendanceRouter } from "@/features/attendance/api/route";
import { subjectsRouter } from "@/features/subjects/api/route";
import { userRouter } from "@/features/users/api/route";
import { classesRouter } from "@/features/classes/api/route";

const app = new Hono();

app.use(adminMiddleware);

app.route("/attendance", attendanceRouter);
app.route("/classes", classesRouter);
// app.route("/payments", paymentsRouter);
app.route("/user", userRouter);
app.route("/subjects", subjectsRouter);

export { app as adminRouter };
