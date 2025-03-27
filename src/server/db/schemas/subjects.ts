import { sql } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { classes } from "./classes";
import { userSubject } from "./userSubject";
import type { z } from "zod";
import type { daysEnum } from "./zodSchemas";


export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  classId: uuid("class_id").references(() => classes.id, {
    onDelete: "cascade",
  }),
  days: json().$type<z.infer<typeof daysEnum>[]>().notNull(),

  pricing: integer("pricing").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  class: one(classes, {
    fields: [subjects.classId],
    references: [classes.id],
  }),
  userSubjects: many(userSubject),
}));
