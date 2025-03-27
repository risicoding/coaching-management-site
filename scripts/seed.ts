import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "@/server/db/schemas";
import {
  classes as classesSchema,
  subjects as subjectSchema,
} from "@/server/db/schemas";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

console.log("Initializing database connection...");

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema, logger: true });

const seedClasses = async () => {
  console.log("Seeding classes...");

  const classes = Array.from({ length: 10 }, () => ({
    id: crypto.randomUUID(),
    classNumber: Math.floor(Math.random() * 12) + 1, // Random class number (1-12)
  }));

  console.log("Generated classes:", classes);

  try {
    const insertedClasses = await db
      .insert(classesSchema)
      .values(classes)
      .returning();
    console.log("Classes inserted successfully:", insertedClasses);
  } catch (error) {
    console.error("Error inserting classes:", error);
  }
};

const seedSubjects = async () => {
  console.log("Seeding subjects...");

  const classes = await db.select().from(classesSchema);
  const classIds = classes.map((c) => c.id);

  const subjects = Array.from({ length: 15 }, () => ({
    id: crypto.randomUUID(),
    name: `Subject ${Math.floor(Math.random() * 100) + 1}`,
    classId: classIds[Math.floor(Math.random() * classIds.length)], // Random existing class ID
    pricing: Math.floor(Math.random() * 500) + 1000, // Random pricing between 1000-1500
    days: schema.daysEnum.options.filter((val) => val !== "sun"),
  }));

  console.log("Generated subjects:", subjects);

  try {
    const insertedSubjects = await db
      .insert(subjectSchema)
      .values(subjects)
      .returning();
    console.log("Subjects inserted successfully:", insertedSubjects);
  } catch (error) {
    console.error("Error inserting subjects:", error);
  }
};

const main = async () => {
  console.log("Starting seed script...");
  await seedClasses();
  await seedSubjects();
  console.log("Seeding completed!");
  process.exit(0);
};

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
