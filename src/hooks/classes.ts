import { initClient } from "@ts-rest/core";
import { classesContract } from "@/server/api/contracts/classes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";
import type { z } from "zod";
import type { classInsertSchema } from "@/server/db/schemas/zodSchemas";

const classesClient = initClient(classesContract, {
  baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const useAllClasses = () =>
  useQuery({
    queryKey: ["classes", "all"],
    queryFn: async () => {
      const { status, body } = await classesClient.getAll();

      if (status !== 200) throw body;
      return body;
    },
  });

export const useClassById = (id: string) =>
  useQuery({
    queryKey: ["classes", id],
    queryFn: async () => {
      const { status, body } = await classesClient.getById({ params: { id } });

      if (status !== 200) throw body;
      return body;
    },
  });

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof classInsertSchema>) => {
      const { status, body } = await classesClient.post({ body: data });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useUpdateClass = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<z.infer<typeof classInsertSchema>>) => {
      const { status, body } = await classesClient.update({
        params: { id },
        body: data,
      });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { status, body } = await classesClient.delete({ params: { id } });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

