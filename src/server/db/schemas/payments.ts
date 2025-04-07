import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  date,
  unique,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { subjects } from "./subjects";

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    subjectId: uuid("subject_id")
      .references(() => subjects.id)
      .notNull(),
    amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
    month: date("payment_month").notNull(), // stores YYYY-MM-01 for example
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userSubjectMonthUnique: unique().on(
      table.userId,
      table.subjectId,
      table.month,
    ),
  }),
);
