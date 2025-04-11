import { Redis } from "@upstash/redis";
import { env } from "@/env";

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

export const getInvoiceNumber = () => redis.get("inv-no") as Promise<number>;

export const incrementInvoiceNumber = async (invNo?: number) =>
  redis.set("inv-no", invNo ?? (await getInvoiceNumber()) + 1);
