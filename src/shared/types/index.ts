/*global NodeJS */

import { userAgentMetaZ } from "@/server/middlewares/serverMetaInj";
import type { WorkerVersionMetadata } from "@cloudflare/workers-types";
import type { Draft } from "immer";
import z from "zod";

export const injectCrossDataZ = z.object({
    UserAgentMeta: userAgentMetaZ.optional(),
});
export type InjectCrossData = z.infer<typeof injectCrossDataZ>;

export type Env = {
    Bindings: {};
    Variables: { InjectCrossData?: InjectCrossData };
    CF_VERSION_METADATA: WorkerVersionMetadata;
};

export type Recipe<T> = (draft: Draft<T>) => Draft<T> | void;
export type PartialDeep<T> = T extends object
    ? { [P in keyof T]+?: PartialDeep<T[P]> }
    : T;
export type NodeTimeout = NodeJS.Timeout;
