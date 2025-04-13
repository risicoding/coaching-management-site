import { initClient } from "@ts-rest/core";
import { paymentsContract } from "@/server/api/contracts/payments";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";

const paymentsClient = initClient(paymentsContract, {
  baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const useAllPayments = () =>
  useQuery({
    queryKey: ["payments", "all"],
    queryFn: async () => {
      const { status, body } = await paymentsClient.getAllPayments();
      if (status !== 200) throw body;
      return body;
    },
  });

export const usePaymentById = (id: string) =>
  useQuery({
    queryKey: ["payments", "id", id],
    queryFn: async () => {
      const { status, body } = await paymentsClient.getPaymentById({
        params: { id },
      });
      if (status !== 200) throw body;
      return body;
    },
  });

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: Parameters<typeof paymentsClient.createPayment>[0]["body"]) => {
      const { status, body: res } = await paymentsClient.createPayment({ body });
      if (status !== 200) throw res;
      return res;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const usePaymentsBySubjectId = (subjectId: string) =>
  useQuery({
    queryKey: ["payments", "subject", subjectId],
    queryFn: async () => {
      const { status, body } = await paymentsClient.getPaymentsBySubjectId({
        params: { subjectId },
      });
      if (status !== 200) throw body;
      return body;
    },
  });

export const usePaymentsByUserId = (userId: string) =>
  useQuery({
    queryKey: ["payments", "user", userId],
    queryFn: async () => {
      const { status, body } = await paymentsClient.getPaymentsByUserId({
        params: { userId },
      });
      if (status !== 200) throw body;
      return body;
    },
  });

export const usePaymentsByUserAndSubjectId = (userId: string, subjectId: string) =>
  useQuery({
    queryKey: ["payments", "user", userId, "subject", subjectId],
    queryFn: async () => {
      const { status, body } = await paymentsClient.getPaymentsByUserAndSubjectId({
        params: { userId, subjectId },
      });
      if (status !== 200) throw body;
      return body;
    },
  });

export const useDeletePaymentById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { status, body } = await paymentsClient.deletePaymentById({
        params: { id },
      });
      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

