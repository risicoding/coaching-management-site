import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  subjectInsertSchema,
  subjectSelectSchema,
} from "@/server/db/schemas/zodSchemas";
import { honoErrorSchema } from "@/lib/hono-error";

const subjectArraySchema = z.array(subjectSelectSchema);

const c = initContract();

export const subjectsContract = c.router({
  post: {
    path: "/admin/subjects",
    method: "POST",
    body: subjectInsertSchema,
    responses: {
      200: subjectSelectSchema,
      400: honoErrorSchema,
    },
  },

  getById: {
    path: "/admin/subjects/:id",
    method: "GET",
    responses: {
      200: subjectSelectSchema,
      404: honoErrorSchema,
    },
  },

  getAll: {
    path: "/admin/subjects",
    method: "GET",
    responses: {
      200: subjectArraySchema,
    },
  },

  getByClass: {
    path: "/admin/subjects/class/:classId",
    method: "GET",
    responses: {
      200: subjectArraySchema,
    },
  },

  getByUser: {
    path: "/admin/subjects/user/:userId",
    method: "GET",
    responses: {
      200: subjectArraySchema,
      404: honoErrorSchema,
    },
  },


  update: {
    path: "/admin/subjects/:id",
    method: "PUT",
    body: subjectInsertSchema.partial(),
    responses: {
      200: subjectSelectSchema,
      401: honoErrorSchema,
      404: honoErrorSchema,
    },
  },

  delete: {
    path: "/admin/subjects/:id",
    method: "DELETE",
    responses: {
      200: z.object({ message: z.string() }),
      404: honoErrorSchema,
    },
  },
});
