import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-client";
import type { Subject } from "../api/types";

// GET all subjects
export const useAllSubjects = () =>
  useQuery({
    queryKey: ["subjects", "getAll"],
    queryFn: async () => {
      const res = await api.get("/admin/subjects");
      return res.data as Subject[];
    },
  });

// GET subject by ID
export const useSubjectById = (id: string) =>
  useQuery({
    queryKey: ["subjects", id],
    queryFn: async () => {
      const res = await api.get(`/admin/subjects/${id}`);
      return res.data as Subject;
    },
  });

// GET subjects by class ID
export const useSubjectsByClassId = (id: string) =>
  useQuery({
    queryKey: ["subjects", "class", id],
    queryFn: async () => {
      const res = await api.get(`/admin/subjects/class/${id}`);
      return res.data as Subject[];
    },
  });

// GET subjects by user ID
export const useSubjectsByUserId = (id: string) =>
  useQuery({
    queryKey: ["subjects", "user", id],
    queryFn: async () => {
      const res = await api.get(`/admin/subjects/user/${id}`);
      return res.data as Subject[];
    },
  });

// CREATE subject
export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Subject>) => {
      const res = await api.post("/admin/subjects", data);
      return res.data as { id: string };
    },
    onSettled: () => queryClient.invalidateQueries("subjects"),
  });
};

// UPDATE subject
export const useUpdateSubject = () =>
  useMutation({
    mutationFn: async (data: Partial<Subject>) => {
      const res = await api.put(`/admin/subjects/${data.id}`, data);
      return res.data as { id: string };
    },
  });

// DELETE subject
export const useDeleteSubject = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/subject/${id}`);
      return res.data as { id: string };
    },
  });
