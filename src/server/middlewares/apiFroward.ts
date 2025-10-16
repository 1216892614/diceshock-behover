import { MiddlewareHandler } from "hono";
import { FACTORY } from "../factory";

const apiFroward = FACTORY.createMiddleware(async (c, next) => {
    await next();
});

export default apiFroward;
