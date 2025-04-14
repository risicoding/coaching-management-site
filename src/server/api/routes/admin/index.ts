import { Hono } from "hono";
import type {auth} from '@/auth'

export type Context= {
 session:NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>
};

const app = new Hono<{ Variables: Context }>();

export { app as adminRouter };
