import { honoError } from "@/lib/hono-error";
import { attendanceQueries } from "@/server/db/queries/attendance";
import { attendanceInsertSchema } from "@/server/db/schemas";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.post("/", zValidator("json", attendanceInsertSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    const res = await attendanceQueries.create(data);
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/subject/:subjectId", async (c) => {
  try {
    const subjectId = c.req.param("subjectId");
    const res = await attendanceQueries.getBySubjectId(subjectId);

    if (!res || res.length === 0) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/user/:userId/subject/:subjectId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const subjectId = c.req.param("subjectId");

    const res = await attendanceQueries.getByUserAndSubject(userId, subjectId);

    if (res.length === 0) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/subject/:subjectId/count", async (c) => {
  try {
    const subjectId = c.req.param("subjectId");
    const res = await attendanceQueries.getPresentCount(subjectId);

    if (res.length === 0) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

export { app as attendanceRouter };
