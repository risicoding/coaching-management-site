import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const courses = pgTable(
  "courses",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    pricing: integer("price").notNull(),
    createdAt: timestamp("created-at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  //INDEX ON NAME

  (example) => ({
    nameIndex: index("courses_name_index").on(example.name),
  }),
);

export const coursesRelations = relations(courses, ({ many }) => ({
  coursesToTeachers: many(coursesToTeachers),
}));

export const teachers = pgTable(
  "teachers",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    userId: varchar("user-id").notNull().unique(),
    pricing: integer("pricing").notNull(),
    createdAt: timestamp("created-at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  //INDEX ON NAME

  (example) => ({
    emailIndex: index("teacher_name_idx").on(example.email),
    userIdIndex: index("teacher_userid-idx").on(example.userId),
  }),
);

export const teachersRelations = relations(teachers, ({ many }) => ({
  coursesToTeachers: many(coursesToTeachers),
}));

export const coursesToTeachers = pgTable(
  "teacher_to_courses",

  {
    courseId: integer("user_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    teacherId: integer("teacher_id")
      .notNull()
      .references(() => teachers.id),
    teacherUserId: varchar("teacher_user_id")
      .notNull()
      .references(() => teachers.userId, { onDelete: "cascade" }),
  },
  (t) => ({
    primaryKey: primaryKey({ columns: [t.courseId, t.teacherUserId] }),
  }),
);

export const teachersToCoursesRelations = relations(
  coursesToTeachers,
  ({ one }) => ({
    course: one(courses, {
      fields: [coursesToTeachers.courseId],
      references: [courses.id],
    }),
    teacher: one(teachers, {
      fields: [coursesToTeachers.teacherId],
      references: [teachers.id],
    }),
  }),
);
