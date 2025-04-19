import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios-client";
import type { Class } from "../api/types";

// GET all classes
export const useAllClasses = () =>
  useQuery({
    queryKey: ["class", "getAll"],
    queryFn: async () => {
      const res = await api.get("/admin/class");
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
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Class>) => {
      const res = await api.post("/admin/class", data);
      return res.data as { id: string };
    },
    onSettled: async () => {
      void queryClient.invalidateQueries({ queryKey: ["class", "getAll"] });
    },
  });
};

// UPDATE class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Class>) => {
      const res = await api.put(`/admin/class/${data.id}`, data);
      return res.data as { id: string };
    },
    onMutate: async (data) => {
      const prevData = queryClient.getQueryData(["class", "getAll"]) as Class[];

      queryClient.setQueryData<Class[]>(["class", "getAll"], (queryData) =>
        queryData?.map((c) => (c.id === data.id ? { ...c, ...data } : c)),
      );

      return { data: prevData };
    },
    onError(_, __, context) {
      queryClient.setQueryData<Class[]>(["class", "getAll"], context?.data);
    },
    onSettled: async () => {
      void queryClient.invalidateQueries({ queryKey: ["class"] });
    },
  });
};

// DELETE class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onMutate: (data) => {
      const prevData = queryClient.getQueryData<Class[]>(["class", "getAll"]);

      queryClient.setQueryData<Class[]>(["class", "getAll"], (qData) =>
        qData?.filter((c) => c.id !== data),
      );
      return { data: prevData };
    },
    onError(_, __, context) {
      queryClient.setQueryData<Class[]>(["class", "getAll"], context?.data);
    },
    mutationFn: async (id: string) => {
      const res = await api.delete(`/admin/class/${id}`);
      return res.data as { id: string };
    },
    onSettled: async () => {
      void queryClient.invalidateQueries({ queryKey: ["class"] });
    },
  });
};
