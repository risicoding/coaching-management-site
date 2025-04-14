import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  classInsertSchema,
  classSelectSchema,
} from "@/server/db/schemas/zodSchemas";
import { honoErrorSchema } from "@/lib/hono-error";

// Success and Error schemas
const classSchema = classSelectSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const classArraySchema = z.array(classSchema);

const c = initContract();

export const classesContract = c.router({
  getAll: {
    path: "/admin/classes",
    method: "GET",
    responses: {
      200: classArraySchema,
      500: honoErrorSchema,
    },
  },

  getById: {
    path: "/admin/classes/:id",
    method: "GET",
    responses: {
      200: classSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  post: {
    path: "/admin/classes",
    method: "POST",
    body: classInsertSchema,
    responses: {
      200: classSchema,
      500: honoErrorSchema,
    },
  },

  update: {
    path: "/admin/classes/:id",
    method: "PUT",
    body: classInsertSchema.partial(),
    responses: {
      200: classSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  delete: {
    path: "/admin/classes/:id",
    method: "DELETE",
    responses: {
      200: classSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },
});
