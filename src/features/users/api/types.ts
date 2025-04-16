import type { user } from "@/server/db/schemas";
import type { InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof user>;
