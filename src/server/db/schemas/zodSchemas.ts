import { createInsertSchema  } from "drizzle-zod";
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

//SELECT SCHEMAS
//
export const attendanceSelectSchema = z.object({
  id: z.string().uuid().optional(), userId: z.string(),
  subjectId: z.string().uuid(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
})

export const subjectSelectSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(256),
  classId: z.string().uuid().optional(),
  days: z.array(daysEnum),
  time: z.string().optional(),
  pricing: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export const classSelectSchema = z.object({
  id: z.string().uuid().optional(),
  classNumber: z.number().int(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export const paymentSelectSchema = z.object({
  id: z.string().uuid().optional(),
  invoiceNumber: z.number().int().optional(),
  userId: z.string(),
  amount: z.number().int(),
  month: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
})

