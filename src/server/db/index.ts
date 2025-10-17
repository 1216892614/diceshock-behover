import { drizzle } from "drizzle-orm/d1";
import { Context } from "hono";

import { HonoCtxEnv } from "@/shared/types";

export default function db(c: Context<HonoCtxEnv>) {
    return drizzle(c.env.DB);
}
