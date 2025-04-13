import { Hono } from "hono";
import type { Context } from "../admin/index";
import { zValidator } from "@hono/zod-validator";
import { subjectsQueries } from "@/server/db/queries/subjects";
import { userSubjectQueries } from "@/server/db/queries/userSubject";
import { subjectInsertSchema } from "@/server/db/schemas/zodSchemas";
import { z } from "zod";
import { honoError } from "@/lib/hono-error";

const app = new Hono<{ Variables: Context }>();
const subjectUpdateSchema = subjectInsertSchema.partial();

app.post("/", zValidator("json", subjectInsertSchema), async (c) => {
  try {
    const subjectData = c.req.valid("json");
    const newSubject = await subjectsQueries.create(subjectData);
    return c.json(newSubject);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const subject = await subjectsQueries.getById(id);

    if (!subject) return honoError("NOT_FOUND", c);

    return c.json(subject);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/", async (c) => {
  try {
    const subjects = await subjectsQueries.getAll();
    return c.json(subjects);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/class/:classId", async (c) => {
  try {
    const { classId } = c.req.param();
    const subjects = await subjectsQueries.getByClassId(classId);
    return c.json(subjects);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const res = await userSubjectQueries.getSubjectsByUserId(userId);

    if (res.length === 0) return honoError("NOT_FOUND", c);

    return c.json(res);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.post(
  "/enrolled",
  zValidator("json", z.object({ subjectId: z.string() })),
  async (c) => {
    try {
      const { subjectId } = c.req.valid("json");
      const { id } = c.get("session").user;
      let result = await userSubjectQueries.getEnrolledSubject(id, subjectId);

      if (!result) {
        await userSubjectQueries.enrollUser({ userId: id, subjectId });
        result = await userSubjectQueries.getEnrolledSubject(id, subjectId);
      }

      return c.json(result);
    } catch (err) {
      return honoError("INTERNAL_SERVER_ERROR", c, err);
    }
  },
);

app.put(
  "/:id",
  zValidator("json", subjectUpdateSchema.partial()),
  async (c) => {
    try {
      const { id } = c.req.param();
      const session = c.get("session");
      const userId = session?.user?.id;

      if (!userId) {
        return c.json({ error: "User not authenticated" }, 401);
      }

      const subjectData = c.req.valid("json");
      const updatedSubject = await subjectsQueries.update(id, subjectData);

      if (!updatedSubject) return honoError("NOT_FOUND", c);

      return c.json(updatedSubject);
    } catch (err) {
      return honoError("INTERNAL_SERVER_ERROR", c, err);
    }
  },
);

app.delete("/:id", async (c) => {
  try {
    const { id } = c.req.param();
    const deletedSubject = await subjectsQueries.delete(id);

    if (!deletedSubject) return honoError("NOT_FOUND", c);

    return c.json({ message: "Subject deleted" });
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

export {app as subjectsRouter}

