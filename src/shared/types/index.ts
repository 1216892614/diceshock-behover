/*global NodeJS */

import { userAgentMetaZ } from "@/server/middlewares/serverMetaInj";
import type {
    D1Database,
    WorkerVersionMetadata,
} from "@cloudflare/workers-types";
import type { Draft } from "immer";
import z from "zod";

export const injectCrossDataZ = z.object({
    UserAgentMeta: userAgentMetaZ.optional(),
});
export type InjectCrossData = z.infer<typeof injectCrossDataZ>;

export interface CfEnv {
    CF_VERSION_METADATA: WorkerVersionMetadata;
    DB: D1Database;
}

export type HonoCtxEnv = {
    Bindings: CfEnv;
    Variables: { InjectCrossData?: InjectCrossData };
};

export type Recipe<T> = (draft: Draft<T>) => Draft<T> | void;
export type PartialDeep<T> = T extends object
    ? { [P in keyof T]+?: PartialDeep<T[P]> }
    : T;
export type NodeTimeout = NodeJS.Timeout;
