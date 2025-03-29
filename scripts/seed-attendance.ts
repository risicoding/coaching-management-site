import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { attendance } from "@/server/db/schemas";
import { env } from "@/env";
import * as schema from "@/server/db/schemas";

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

console.log("Initializing database connection...");

const conn = globalForDb.conn ?? postgres(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

const db = drizzle(conn, { schema, logger: true });

const userId = "zMZZcJOzohzxzJczuvg1Ra0ozUwKD9Hc"; // Replace with actual user ID
const subjectId = "600e46a4-1ab7-430c-ba71-ddbf704981ca"; // Replace with actual subject ID

const generateRandomAttendance = () => {
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-04-30");
  const attendanceEntries = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (Math.random() < 0.7) {
      // @ts-expect-error Nan
      attendanceEntries.push({
        userId,
        subjectId,
        date: new Date(currentDate), // Ensure unique dates
      });
    }

    // Move to the next day (randomly skipping days)
    const daysToSkip = Math.random() < 0.3 ? 2 : 1;
    currentDate.setDate(currentDate.getDate() + daysToSkip);
  }

  return attendanceEntries;
};

const seedAttendance = async () => {
  const attendanceData = generateRandomAttendance();

  await db.insert(attendance).values(attendanceData);
  console.log("Attendance seeded successfully.");
};

seedAttendance()
  .catch((err) => console.error("Seeding failed:", err))
  .finally(() => process.exit());

