import type { subjects } from "@/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

export type Days = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type Subject = InferSelectModel<typeof subjects>;
