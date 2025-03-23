import { sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { subjects } from "./subjects";
import { relations } from "drizzle-orm";

export const userSubject = pgTable(
  "user_subject",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    subjectId: integer("subject_id")
      .notNull()
      .references(() => subjects.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.subjectId] }),
  }),
);

export const usersSubjectRelations = relations(userSubject, ({ one }) => ({
  subject: one(subjects, {
    fields: [userSubject.subjectId],
    references: [subjects.id],
  }),
  user: one(user, {
    fields: [userSubject.userId],
    references: [user.id],
  }),
}));
