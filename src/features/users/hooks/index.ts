// src/features/users/hooks/useUsers.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios-client";
import type { User } from "../api/types";

// GET all users
export const useAllUsers = () =>
  useQuery({
    queryKey: ["users", "getAll"],
    queryFn: async () => {
      const res = await api.get("/admin/user");
      return res.data as User[];
    },
  });

// GET user by ID
export const useUserById = (id: string) =>
  useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await api.get(`/admin/user/${id}`);
      return res.data as User;
    },
  });

// GET user by email
export const useUserByEmail = (email: string) =>
  useQuery({
    queryKey: ["users", "email", email],
    queryFn: async () => {
      const res = await api.get(`/admin/user/email/${email}`);
      return res.data as User;
    },
  });

// GET users by subject ID
export const useUsersBySubjectId = (subjectId: string) =>
  useQuery({
    queryKey: ["users", "subject", subjectId],
    queryFn: async () => {
      const res = await api.get(`/admin/user/subject/${subjectId}`);
      return res.data as User[];
    },
  });

// DELETE users
export const useDeleteUsers = () =>
  useMutation({
    mutationFn: async (data: { ids: string[] }) => {
      const res = await api.post(`/admin/user/delete`, data);
      return res.data as { id: string }[];
    },
  });

// SET user role
export const useSetRole = () =>
  useMutation({
    mutationFn: async (data: { ids: string[]; role: "admin" | "student" }) => {
      const res = await api.put("/admin/user/role", data);
      return res.data as { id: string }[];
    },
  });
