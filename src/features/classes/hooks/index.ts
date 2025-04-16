import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios-client";
import type { Class } from "../api/types";

// GET all classes
export const useAllClasses = () =>
  useQuery({
    queryKey: ["class", "getAll"],
    queryFn: async () => {
      const res = await api.get("/admin/classes");
      return res.data as Class[];
    },
  });

// GET class by ID
export const useClassById = (id: string) =>
  useQuery({
    queryKey: ["class", id],
    queryFn: async () => {
      const res = await api.get("/admin/class");
      return res.data as Class;
    },
  });

// CREATE class
export const useCreateClass = () =>
  useMutation({
    mutationFn: async (data: Partial<Class>) => {
      const res = await api.post("/admin/class", data);
      return res.data as { id: string };
    },
  });

// UPDATE class
export const useUpdateClass = () =>
  useMutation({
    mutationFn: async (data: Partial<Class>) => {
      const res = await api.put(`/admin/class/${data.id}`, data);
      return res.data as { id: string };
    },
  });

// DELETE class
export const useDeleteClass = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/class/${id}`);
      return res.data as { id: string };
    },
  });
