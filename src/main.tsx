import { Hono } from "hono";
import { Env } from "./shared/types";

import fileRouter from "./server/apis/fileRouter";
import apiFroward from "./server/middlewares/apiFroward";

const app = new Hono();

app.use("/api/**/*", apiFroward);

app.get("/*", fileRouter);

export default app;
