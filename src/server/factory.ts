import { createFactory } from "hono/factory";
import type { Env } from "@/shared/types";

export const FACTORY = createFactory<Env>({});
