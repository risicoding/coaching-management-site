import { initClient } from "@ts-rest/core";
import { userContract } from "@/server/api/contracts/user";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { env } from "@/env";

export const userClient = initClient(userContract, {
  baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export const useAllUsers = () =>
  useQuery({
    queryKey: ["users", "all"],
    queryFn: async () => {
      const { status, body } = await userClient.getAll();
      if (status !== 200) throw body;
      return body;
    },
  });

export const useUserById = (id: string) =>
  useQuery({
    queryKey: ["users", "id", id],
    queryFn: async () => {
      const { status, body } = await userClient.getById({ params: { id } });
      if (status !== 200) throw body;
      return body;
    },
  });


export const useUserByEmail = (email: string) =>
  useQuery({
    queryKey: ["users", "email", email],
    queryFn: async () => {
      const { status, body } = await userClient.getByEmail({ params: { id: email } });
      if (status !== 200) throw body;
      return body;
    },
  });

export const useAdmins = () =>
  useQuery({
    queryKey: ["users", "admins"],
    queryFn: async () => {
      const { status, body } = await userClient.getAdmins();
      if (status !== 200) throw body;
      return body;
    },
  });

export const useStudents = () =>
  useQuery({
    queryKey: ["users", "students"],
    queryFn: async () => {
      const { status, body } = await userClient.getUsers();
      if (status !== 200) throw body;
      return body;
    },
  });

export const useDeleteUsers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const { status, body } = await userClient.deleteUsers({
        body: { ids },
      });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { ids: string[]; role: "admin" | "student" }) => {
      const { status, body } = await userClient.updateRoles({
        body: data,
      });

      if (status !== 200) throw body;
      return body;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

