import { sql } from "drizzle-orm";
import { index, integer, pgTable, timestamp, uuid,serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { subjects } from "./subjects";

export const classes = pgTable(
  "classes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    classNumber: integer("class_number").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
  }
);

export const classesRelations = relations(classes, ({ many }) => ({
  subjects: many(subjects),
}));
