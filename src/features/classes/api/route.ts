import { honoError } from "@/lib/hono-error";
import { classesQueries } from "@/server/db/queries/classes";
import { classInsertSchema } from "@/server/db/schemas";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const res = await classesQueries.getAll();
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const res = await classesQueries.getById(id);

    if (!res) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.post("/", zValidator("json", classInsertSchema), async (c) => {
  try {
    const data = c.req.valid("json");
    const res = await classesQueries.create(data);
    return c.json(res[0]);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.put("/:id", zValidator("json", classInsertSchema.partial()), async (c) => {
  try {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const res = await classesQueries.update(id, data);

    if (!res || res.length === 0) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const res = await classesQueries.delete(id);

    if (!res || res.length === 0) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

export { app as classesRouter };
