import {  honoErrorSchema } from "@/lib/hono-error";
import { z } from "zod";

// Reusable user schema
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["admin", "student"]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const userArraySchema = z.array(userSchema);

export const userContract = {
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
      500:honoErrorSchema ,
    },
  },
};

