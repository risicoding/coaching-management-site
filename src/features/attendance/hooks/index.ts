import { useQuery, useMutation } from "@tanstack/react-query";
import api from "@/lib/axios-client";
import type { Attendance, TransformedAttendance } from "../api/types";

// CREATE attendance
export const useCreateAttendance = () =>
  useMutation({
    mutationKey: ["create", "attendance"],
    mutationFn: async (data: Partial<Attendance>) => {
      const res = await api.post("/admin/attendance", data);
      return res.data as { id: string }[];
    },
  });

// GET attendance by subject ID
export const useAttendanceBySubjectId = (id: string) =>
  useQuery({
    queryKey: ["attendance", "subject", id],
    queryFn: async () => {
      const res = await api.get(`/admin/attendance/subject/${id}`);
      return res.data as Attendance[];
    },
  });

// GET attendance by user and subject ID
export const useAttendanceByUserAndSubjectId = (
  userId: string,
  subjectId: string,
) =>
  useQuery({
    queryKey: ["attendance", "user", userId, "subject", subjectId],
    queryFn: async () => {
      const res = await api.get(
        `/admin/attendance/user/${userId}/subject/${subjectId}`,
      );
      return res.data as TransformedAttendance[];
    },
  });

// GET today's attendance by subject ID
export const useAttendanceTodayBySubjectId = (id: string) =>
  useQuery({
    queryKey: ["attendance", "today", "subject", id],
    queryFn: async () => {
      const res = await api.get(`/admin/attendance/subject/${id}/today`);
      return res.data as Attendance[];
    },
  });

// GET attendance count by subject ID
export const useAttendanceCountBySubjectId = (id: string) =>
  useQuery({
    queryKey: ["attendance", "count", "subject", id],
    queryFn: async () => {
      const res = await api.get(`/admin/attendance/subject/${id}/count`);
      return res.data as { date: Date; userCount: number }[];
    },
  });

// DELETE attendance
export const useDeleteAttendance = () =>
  useMutation({
    mutationKey: ["delete", "attendance"],
    mutationFn: async (data: {
      subjectId: string;
      userId: string;
      date: Date;
    }) => {
      const res = await api.delete(
        `/admin/attendance/subject/${data.subjectId}/user/${data.userId}/${data.date.toISOString()}`,
      );
      return res.data as { id: string }[];
    },
  });

// import type {
//   UseQueryOptions,
//   UseMutationOptions,
// } from "@tanstack/react-query";
// import type { Attendance, TransformedAttendance } from "../api/types";
// import api from "@/lib/axios-client";
//
// export const createAttendance: UseMutationOptions<
//   { id: string }[],
//   Error,
//   Partial<Attendance>
// > = {
//   mutationKey: ["create", "attendance"],
//   mutationFn: async (data) => {
//     const res = await api.post("/admin/attendance", data);
//     return res.data as { id: string }[];
//   },
// };
//
// export const getAttendanceBySubjectId = (
//   id: string,
// ): UseQueryOptions<Attendance[]> => ({
//   queryKey: ["attendance", "subject", id],
//   queryFn: async () => {
//     const res = await api.get(`/admin/attendance/subject/${id}`);
//     return res.data as Attendance[];
//   },
// });
//
// export const getAttendanceByUserAndSubjectId = (
//   userId: string,
//   subjectId: string,
// ): UseQueryOptions<TransformedAttendance[]> => ({
//   queryKey: ["attendance", "user", userId, "subject", subjectId],
//   queryFn: async () => {
//     const res = await api.get(
//       `/admin/attendance/user/${userId}/subject/${subjectId}`,
//     );
//     return res.data as TransformedAttendance[];
//   },
// });
//
// export const getAttendanceTodayBySubjecId = (
//   id: string,
// ): UseQueryOptions<Attendance[]> => ({
//   queryKey: ["attendance", "today", "subject", id],
//   queryFn: async () => {
//     const res = await api.get(`/admin/attendance/subject/${id}/today`);
//     return res.data as Attendance[];
//   },
// });
//
// export const getAttendanceCountBySubjectId = (id: string): UseQueryOptions => ({
//   queryKey: ["attendance", "count", "subject", id],
//   queryFn: async () => {
//     const res = await api.get(`/admin/attendance/subject/${id}/count`);
//     return res.data as { date: Date; userCount: number }[];
//   },
// });
//
// export const deleteAttendance: UseMutationOptions<
//   { id: string }[],
//   Error,
//   { subjectId: string; userId: string; date: Date }
// > = {
//   mutationKey: ["delete", "attendance"],
//   mutationFn: async (data) => {
//     const res = await api.delete(
//       `/admin/attendance/subject/${data.subjectId}/user/${data.userId}/${data.date.toISOString()}`,
//     );
//
//     return res.data as { id: string }[];
//   },
// };
