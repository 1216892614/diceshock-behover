import { WorkerVersionMetadata } from "@cloudflare/workers-types";

export type Env = {
  CF_VERSION_METADATA: WorkerVersionMetadata;
};
