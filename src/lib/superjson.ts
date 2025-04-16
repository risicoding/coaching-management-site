import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import superjson from "superjson";

export const superjsonMiddleware = createMiddleware(async (c, next) => {
  if (c.req.header("content-type")?.includes("application/json")) {
    const raw = await c.req.text();
    if (raw) {
      try {
        const parsed = superjson.parse(raw);
        // override c.req.json with parsed
        c.req.json = async () => parsed as any;
        // optionally, attach parsed to context
        c.set("parsedBody", parsed);
      } catch (err) {
        console.error("SuperJSON parse error:", err);
        return c.json({ error: "Invalid JSON" }, 400);
      }
    }
  }

  await next();
});

export const jsonS = (data: unknown, c: Context) => {
  const { json, meta } = superjson.serialize(data);
  return c.newResponse(JSON.stringify({ json, meta }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
