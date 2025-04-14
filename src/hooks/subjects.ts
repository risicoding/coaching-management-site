import { initClient } from "@ts-rest/core";
import { subjectsContract } from "@/server/api/contracts/subjects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";
import type { z } from "zod";
import type {
  subjectInsertSchema,
} from "@/server/db/schemas/zodSchemas";

const subjectsClient = initClient(subjectsContract, {
  baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const useAllSubjects = () =>
  useQuery({
    queryKey: ["subjects", "all"],
    queryFn: async () => {
      const { status, body } = await subjectsClient.getAll();

      if (status !== 200) throw body;

      return body;
    },
  });

export const useSubjectById = (id: string) =>
  useQuery({
    queryKey: ["subjects", id],
    queryFn: async () => {
      const { status, body } = await subjectsClient.getById({ params: { id } });

      if (status !== 200) throw body;
      return body;
    },
  });

export const useSubjectsByClass = (classId: string) =>
  useQuery({
    queryKey: ["subjects", "class", classId],
    queryFn: async () => {
      const { status, body } = await subjectsClient.getByClass({
        params: { classId },
      });

      if (status !== 200) throw body;

      return body;
    },
  });

export const useSubjectsByUser = (userId: string) =>
  useQuery({
    queryKey: ["subjects", "user", userId],
    queryFn: async () => {
      const { status, body } = await subjectsClient.getByUser({
        params: { userId },
      });

      if (status !== 200) throw body;
      return body;
    },
  });

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof subjectInsertSchema>) => {
      const { status, body } = await subjectsClient.post({ body: data });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useUpdateSubject = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<z.infer<typeof subjectInsertSchema>>) => {
      const { status, body } = await subjectsClient.update({
        params: { id },
        body: data,
      });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { status, body } = await subjectsClient.delete({ params: { id } });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};
