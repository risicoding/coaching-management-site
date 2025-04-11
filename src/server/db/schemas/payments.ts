import {
  pgTable,
  uuid,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

import { user } from "./auth-schema";
import { subjects } from "./subjects";
import { relations } from "drizzle-orm";

export const payments = pgTable("payments", {
  id: uuid("id").defaultRandom().primaryKey(),
  invoiceNumber: integer("invoice_number"),
  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer("amount").notNull(),
  month: date("payment_month").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const paymentSubjects = pgTable("payment_subject", {
  paymentId: uuid("payment_id").references(() => payments.id, {
    onDelete: "cascade",
  }),
  subjectId: uuid("subject_id").references(() => subjects.id),
});

export const paymentsRelations = relations(payments, ({ many, one }) => ({
  paymentSubjects: many(paymentSubjects),
  user: one(user, { fields: [payments.userId], references: [user.id] }),
}));

export const paymentSubjectsRelations = relations(
  paymentSubjects,
  ({ one }) => ({
    payment: one(payments, {
      fields: [paymentSubjects.paymentId],
      references: [payments.id],
    }),
    subject: one(subjects, {
      fields: [paymentSubjects.subjectId],
      references: [subjects.id],
    }),
  }),
);
