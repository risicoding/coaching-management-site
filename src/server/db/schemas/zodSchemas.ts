import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { classes } from "./classes";
import { subjects } from "./subjects";
import { attendance } from "./attendance";
import { userSubject } from "./userSubject";
import { z } from "zod";
import { payments } from "./payments";

export const daysEnum = z.enum([
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
]);

// 🔽 INSERT SCHEMAS 🔽
export const classInsertSchema = createInsertSchema(classes);
export const subjectInsertSchema = createInsertSchema(subjects, {
  days: z.array(daysEnum),
});
export const attendanceInsertSchema = createInsertSchema(attendance);
export const userSubjectInsertSchema = createInsertSchema(userSubject);
export const paymentsInsertSchema = createInsertSchema(payments);

// 🔽 SELECT SCHEMAS 🔽
export const classSelectSchema = createSelectSchema(classes);
export const subjectSelectSchema = createSelectSchema(subjects, {
  days: z.array(daysEnum),
});

export const attendanceSelectSchema = createSelectSchema(attendance);
export const userSubjectSelectSchema = createSelectSchema(userSubject);

