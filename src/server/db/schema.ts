import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import {
  index,
  integer,
  pgEnum,
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
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  username: varchar("username"),
  image: varchar("image"),
  clerkUserId: varchar("clerk-user-id").notNull().unique(),
  role: userRoleEnum("role"),
});

export const userRelations = relations(users, ({ many }) => ({
  usersToCourses: many(userCourse),
}));

export const userCourse = pgTable(
  "user-course",
  {
    userId: integer("user-id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseId: integer("id")
      .notNull()
      .references(() => courses.id, { onDelete: "cascade" }),
    userClerkId: varchar("user-clerk-id")
      .notNull()
      .references(() => users.clerkUserId, { onDelete: "cascade" }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.courseId] }),
  }),
);

export const usersToCoursesRelations = relations(userCourse, ({ one }) => ({
  course: one(courses, {
    fields: [userCourse.userId],
    references: [courses.id],
  }),
  user: one(users, {
    fields: [userCourse.userId],
    references: [users.id],
  }),
}));

export const courseInsertSchema = createInsertSchema(courses);
export const userInsertSchema = createInsertSchema(users);
