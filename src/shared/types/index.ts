/*global NodeJS */

import { userAgentMetaZ } from "@/server/middlewares/serverMetaInj";
import type * as trpcServer from "@/server/middlewares/trpcServer";
import type {
    D1Database,
    WorkerVersionMetadata,
} from "@cloudflare/workers-types";
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

export type ApiRouter = typeof trpcServer.appRouter;
