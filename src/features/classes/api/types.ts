import type { classes } from "@/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

export type Class = InferSelectModel<typeof classes>;
