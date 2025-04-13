import { initClient, TsRestResponseError } from "@ts-rest/core";
import { attendanceContract } from "@/server/api/contracts/attendance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";
import type { attendanceInsertSchema } from "@/server/db/schemas";
import type { z } from "zod";

const attendanceClient = initClient(attendanceContract, {
  baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const useBySubjectId = (subjectId: string) =>
  useQuery({
    queryKey: ["attendance", subjectId],
    queryFn: async () => {
      const { status, body } = await attendanceClient.getAttendanceBySubjectId({
        params: { subjectId },
      });

      if (status !== 200) {
        throw body
      }

      return body;
    },
  });

export const useByUserAndSubjectId = (userId: string, subjectId: string) =>
  useQuery({
    queryKey: ["attendance", userId, subjectId],
    queryFn: async () => {
      const { status, body } =
        await attendanceClient.getAttendanceByUserAndSubject({
          params: { userId, subjectId },
        });

      if (status !== 200) {
        throw body
      }
      return body;
    },
  });

export const usePresentCountBySubjectId = (subjectId: string) =>
  useQuery({
    queryKey: ["attendance", "count", subjectId],
    queryFn: async () => {
      const { status, body } =
        await attendanceClient.getPresentCountBySubjectId({
          params: { subjectId },
        });

      if (status !== 200) throw body
      return body;
    },
  });

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: z.infer<typeof attendanceInsertSchema>) => {
      const { status, body } = await attendanceClient.createAttendance({
        body: data,
      });

      if (status !== 200) throw body
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
};
