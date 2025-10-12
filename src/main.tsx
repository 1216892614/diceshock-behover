import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { Env } from "./shared/types";

import fileRouter from "./server/middlewares/fileRouter";
import apiFroward from "./server/middlewares/apiFroward";

const app = new Hono();

app.use("/api/**/*", apiFroward);

app.use(fileRouter);

export default app;
