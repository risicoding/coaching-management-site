import { honoError } from "@/lib/hono-error";
import { userQueries } from "@/server/db/queries/user";
import { userSubjectQueries } from "@/server/db/queries/userSubject";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono();

app.get("/", async (c) => {
  try {
    const res = await userQueries.getAll();
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const res = await userQueries.getById(id);

    if (!res) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/email/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const res = await userQueries.getByEmail(id);

    if (!res) {
      return honoError("NOT_FOUND", c);
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/subject/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const res = await userSubjectQueries.getUsersInSubject(id);
    if (res.length === 0) {
    }
    return c.json(res);
  } catch (err) {
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/admins", async (c) => {
  try {
    const res = await userQueries.getAdmins();
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c, err);
  }
});

app.get("/users", async (c) => {
  try {
    const res = await userQueries.getUsers();
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError("INTERNAL_SERVER_ERROR", c);
  }
});

app.post(
  "/delete",
  zValidator("json", z.object({ ids: z.array(z.string()) })),
  async (c) => {
    try {
      const { ids } = c.req.valid("json");
      const res = await userQueries.delete(ids);

      if (res.length === 0) {
        return honoError("NOT_FOUND", c);
      }

      return c.json(res);
    } catch (err) {
      return honoError("INTERNAL_SERVER_ERROR", c, err);
    }
  },
);

app.put(
  "/role",
  zValidator(
    "json",
    z.object({ ids: z.array(z.string()), role: z.enum(["admin", "student"]) }),
  ),
  async (c) => {
    try {
      const { ids, role } = c.req.valid("json");
      const res = await userQueries.setRole(ids, role);

      if (res.length === 0) {
        return honoError("NOT_FOUND", c);
      }

      return c.json(res);
    } catch (err) {
      return honoError("INTERNAL_SERVER_ERROR", c, err);
    }
  },
);

export { app as userRouter };
