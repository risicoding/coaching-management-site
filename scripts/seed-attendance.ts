import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { attendance } from "@/server/db/schemas";
import { env } from "@/env";
import * as schema from "@/server/db/schemas";
import { generateMockAttendance } from "./mock-attendance";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

console.log("Initializing database connection...");

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema, logger: true });

const userId = "zMZZcJOzohzxzJczuvg1Ra0ozUwKD9Hc"; // Replace with actual user ID
const subjectId = "1e2d77f5-a477-497f-ad50-3acc8f50bd32"; // Replace with actual subject ID


const seedAttendance = async () => {
  const attendanceData = generateMockAttendance(userId,subjectId,'2025-01-01',100);

  await db.insert(attendance).values(attendanceData);
  console.log("Attendance seeded successfully.");
};

seedAttendance()
  .catch((err) => console.error("Seeding failed:", err))
  .finally(() => process.exit());

