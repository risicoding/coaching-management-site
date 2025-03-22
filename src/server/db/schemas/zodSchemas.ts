import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { classes } from "./classes";
import { subjects } from "./subjects";
import { attendance } from "./attendance";
import { userSubject } from "./userSubject";

// 🔽 INSERT SCHEMAS 🔽
export const classInsertSchema = createInsertSchema(classes);
export const subjectInsertSchema = createInsertSchema(subjects);
export const attendanceInsertSchema = createInsertSchema(attendance);
export const userSubjectInsertSchema = createInsertSchema(userSubject);

// 🔽 SELECT SCHEMAS 🔽
export const classSelectSchema = createSelectSchema(classes);
export const subjectSelectSchema = createSelectSchema(subjects);
export const attendanceSelectSchema = createSelectSchema(attendance);
export const userSubjectSelectSchema = createSelectSchema(userSubject);
