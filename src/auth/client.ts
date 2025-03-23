import { env } from "@/env";
import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [adminClient()],
});
