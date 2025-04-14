import { initContract } from "@ts-rest/core";
import { honoErrorSchema } from "@/lib/hono-error";
import { z } from "zod";

// Reusable user schema
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
  role: z.enum(["admin", "student"]),
});

const userArraySchema = z.array(userSchema);

const c = initContract();

export const userContract = c.router({
  getAll: {
    path: "/admin/user",
    method: "GET",
    responses: {
      200: userArraySchema,
      500: honoErrorSchema,
    },
  },

  getById: {
    path: "/admin/user/:id",
    method: "GET",
    responses: {
      200: userSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getByEmail: {
    path: "/admin/user/email/:id",
    method: "GET",
    responses: {
      200: userSchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getBySubjectId: {
    path: "/admin/user/subject/:id",
    method: "GET",
    responses: {
      200:z.array( userSchema.omit({ role: true })),
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  getAdmins: {
    path: "/admin/user/admins",
    method: "GET",
    responses: {
      200: userArraySchema,
      500: honoErrorSchema,
    },
  },

  getUsers: {
    path: "/admin/user/users",
    method: "GET",
    responses: {
      200: userArraySchema,
      500: honoErrorSchema,
    },
  },

  deleteUsers: {
    path: "/admin/user/delete",
    method: "POST",
    body: z.object({ ids: z.array(z.string()) }),
    responses: {
      200: userArraySchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },

  updateRoles: {
    path: "/admin/user/role",
    method: "POST",
    body: z.object({
      ids: z.array(z.string()),
      role: z.enum(["admin", "student"]),
    }),
    responses: {
      200: userArraySchema,
      404: honoErrorSchema,
      500: honoErrorSchema,
    },
  },
});
