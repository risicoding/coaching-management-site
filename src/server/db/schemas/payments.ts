import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  date,
  unique,
  array,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { subjects } from "./subjects";

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  month: date("payment_month").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const paymentSubjects = pgTable("payment_subject", {
  paymentId: uuid("payment_id").references(() => payments.id),
  subjectId: uuid("subject_id").references(() => subjects.id),
});
