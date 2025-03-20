import { sql } from "drizzle-orm";
import { integer, pgTable, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { subjects } from "./subjects";
import { relations } from "drizzle-orm";

export const userSubject = pgTable(
  "user_subject",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
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
  user: one(users, {
    fields: [userSubject.userId],
    references: [users.id],
  }),
}));
