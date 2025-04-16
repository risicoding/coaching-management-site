import api from "@/lib/axios-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Payment,
  PaymentWithSubjects,
  PaymentWithUser,
  PaymentWithUserAndSubject,
} from "../api/types";

export const useAllPayments = () =>
  useQuery({
    queryKey: ["payments", "all"],
    queryFn: async () => {
      const res = await api.get("/admin/payments");
      return res.data as PaymentWithUserAndSubject[];
    },
  });

export const usePaymentById = (id: string) =>
  useQuery({
    queryKey: ["payments", id],
    queryFn: async () => {
      const res = await api.get(`/admin/payments/${id}`);
      return res.data as PaymentWithUserAndSubject;
    },
  });

export const usePaymentBySubjectId = (id: string) =>
  useQuery({
    queryKey: ["payments", "subject", id],
    queryFn: async () => {
      const res = await api.get(`/admin/payments/subject/${id}`);
      return res.data as PaymentWithUser;
    },
  });

export const usePaymentsByUserId = (id: string) =>
  useQuery({
    queryKey: ["payments", "user", id],
    queryFn: async () => {
      const res = await api.get(`/admin/user/${id}`);
      return res.data as PaymentWithSubjects[];
    },
  });

export const usePaymentsByUserAndSubjectId = (
  userId: string,
  subjectId: string,
) =>
  useQuery({
    queryKey: ["payments", "user", userId, "subjects", subjectId],
    queryFn: async () => {
      const res = await api.get(
        `/admin/payments/user/${userId}/subject/${subjectId}`,
      );
      return res.data as Omit<Payment, "userId">[];
    },
  });

export const useCreatePayment = () => {
  return useMutation<Payment, Error, Partial<Payment>>({
    mutationKey: ["payment", "create"],
    mutationFn: async (data) => {
      const res = await api.post("/admin/payments", data);
      return res.data as Payment;
    },
  });
};

export const useDeletePayment = () => {
  return useMutation<Payment, Error,string>({
    mutationKey: ["payment", "delete"],
    mutationFn: async (data) => {
      const res = await api.post("/admin/payments", data);
      return res.data as Payment;
    },
  });
};
