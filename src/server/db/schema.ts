import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const courses = pgTable(
  "courses",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    pricing: integer("pricing").notNull(),
    createdAt: timestamp("created-at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },

  (example) => ({
    nameIndex: index("courses_name_index").on(example.name),
  }),
);

export const coursesRelations = relations(courses, ({ many }) => ({
  coursesToUsers: many(userCourse),
}));

export const userRoleEnum = pgEnum("role", ["admin", "student"]);

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  username: varchar("username", { length: 256 }),
  image: varchar("image"),
  clerkUserId: varchar("clerk-user-id").notNull().unique(),
  role: userRoleEnum("role"),
  createdAt: timestamp("created-at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const userRelations = relations(users, ({ many }) => ({
  usersToCourses: many(userCourse),
}));

export const attendance = pgTable(
  "attendance",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: integer("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    date: timestamp("date", { withTimezone: true }).notNull(),
    status: varchar("status", { length: 16 }) // "present", "absent", "late"
      .default("present")
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => [unique().on(t.userId, t.courseId)],
);

export const attendanceRelations = relations(attendance, ({ one }) => ({
  user: one(users, {
    fields: [attendance.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [attendance.courseId],
    references: [courses.id],
  }),
}));

export const userCourse = pgTable(
  "user_course",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: integer("course_id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.courseId] }),
  }),
);

export const usersToCoursesRelations = relations(userCourse, ({ one }) => ({
  course: one(courses, {
    fields: [userCourse.courseId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [userCourse.userId],
    references: [users.id],
  }),
}));

export const courseInsertSchema = createInsertSchema(courses);
export const userInsertSchema = createInsertSchema(users);
