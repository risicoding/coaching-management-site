import type { paymentQueries } from "@/server/db/queries/payments";
import type { payments } from "@/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

export type Payment = InferSelectModel<typeof payments>;

export type PaymentWithUserAndSubject = Awaited<
  ReturnType<typeof paymentQueries.getAll>
>[0];

export type PaymentWithUser = Awaited<
  ReturnType<typeof paymentQueries.getBySubjectId>
>[0]

export type PaymentWithSubjects=Awaited<ReturnType<typeof paymentQueries.getByUserId>>[0]
