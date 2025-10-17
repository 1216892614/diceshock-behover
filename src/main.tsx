import { Hono } from "hono";
import type { ExportedHandler } from "@cloudflare/workers-types";
import type { CfEnv, HonoCtxEnv } from "@/shared/types";

import edgeRoot from "@/server/apis/edgeRoot";
import apisRoot from "@/server/apis/apisRoot";
import diceshockRouter from "@/server/apis/diceshock";
import runesparkRouter from "@/server/apis/runespark";
import fetchMapper from "@/server/fetchMapper";
import trpcServer from "./server/middlewares/trpcServer";

export const app = new Hono<{ Bindings: HonoCtxEnv }>();

app.use("/apis/*", trpcServer);

app.get("/diceshock/*", diceshockRouter);
app.get("/runespark/*", runesparkRouter);
app.get("/*", diceshockRouter);

app.get("/edge/*", edgeRoot);
app.post("/edge/*", edgeRoot);
app.put("/edge/*", edgeRoot);
app.delete("/edge/*", edgeRoot);

app.get("/apis/*", apisRoot);
app.post("/apis/*", apisRoot);
app.put("/apis/*", apisRoot);
app.delete("/apis/*", apisRoot);

export default { fetch: fetchMapper(app) } satisfies ExportedHandler<CfEnv>;
