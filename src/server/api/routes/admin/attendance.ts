import { honoError } from "@/lib/hono-error";
import { attendanceQueries } from "@/server/db/queries/attendance";
import { attendanceInsertSchema, daysEnum } from "@/server/db/schemas";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { filterWeekdays, transformData } from "@/lib/date";
import { z } from "zod";

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

    const data = filterWeekdays(
      transformData(res),
      daysEnum.options.filter((val) => val !== "sun"),
    );

    return c.json(data);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/subject/:id/today", async (c) => {
  const id = c.req.param("id");
  try {
    const res = await attendanceQueries.getTodaysAttendanceBySubjectId(id);
    if (res.length === 0) return honoError("NOT_FOUND", c);
    return c.json(res);
  } catch (error) {
    return honoError("INTERNAL_SERVER_ERROR", c, error);
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

app.delete(
  "/subject/:subjectId/user/:userId/:date",
  zValidator(
    "param",
    z.object({
      userId: z.string(),
      subjectId: z.string(),
      date: z.coerce.date(),
    }),
  ),
  async (c) => {
    const params = c.req.valid("param");
    try {
      const res = await attendanceQueries.delete(params);

      return c.json(res);
    } catch (error) {
      return honoError("INTERNAL_SERVER_ERROR", c, error);
    }
  },
);

export { app as attendanceRouter };
