import { env } from "@/env";
import { initClient, type AppRouter } from "@ts-rest/core";

export const createRestClient = (contract: AppRouter) =>
  initClient(contract, {
    baseUrl: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  });
