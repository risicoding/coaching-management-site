import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { classes } from "./classes";
import { userSubject } from "./userSubject";

export const subjects = pgTable(
  "subjects",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    uuid: uuid("uuid").defaultRandom(),
    name: varchar("name", { length: 256 }).notNull(),
    classId: integer("class_id").references(() => classes.id, {
      onDelete: "cascade",
    }),
    pricing: integer("pricing").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  },
  (t) => ({
    nameIndex: index("subjects_name_index").on(t.name),
    uuidIndex: index("subjects_uuid_index").on(t.uuid),
  }),
);

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  class: one(classes, {
    fields: [subjects.classId],
    references: [classes.id],
  }),
  userSubjects: many(userSubject),
}));
