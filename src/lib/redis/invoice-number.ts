import { redis } from "./redis";

const key = "INVOICE_NUMBER";

export const getInvoiceNumber = () => redis.get(key) as Promise<number>;

export const setInvoiceNumber = async (invNo?: number) =>
  redis.set(key, invNo ?? (await getInvoiceNumber()) + 1);
