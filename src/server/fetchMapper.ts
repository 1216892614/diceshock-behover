import type {
    Response as CfResponse,
    ExportedHandlerFetchHandler,
} from "@cloudflare/workers-types";
import { app as mainApp } from "@/main";

const fetchMapper: (
    app: typeof mainApp
) => ExportedHandlerFetchHandler<Cloudflare.Env> =
    (app) => async (request, env, ctx) => {
        const url = new URL(request.url);
        const host = url.hostname;

        let prefix: string | null = null;

        if (host === "api.diceshock.com" || host === "api.runespark.org")
            prefix = "/api";

        if (host === "edge.diceshock.com" || host === "edge.runespark.org")
            prefix = "/edge";

        if (host === "diceshock.com") prefix = "/diceshock";

        if (host === "runespark.org") prefix = "/runespark";

        if (import.meta.env.DEV) prefix = "/";

        if (!prefix)
            return new Response(`Unknown host: ${host}`, {
                status: 404,
            }) as unknown as CfResponse;

        // 若未带前缀则补全，避免重复添加
        if (!url.pathname.startsWith(prefix)) {
            url.pathname = `${prefix}${url.pathname}`;
        }

        const forwardedRequest = new Request(
            url.toString(),
            request as unknown as RequestInit
        );

        try {
            const response = await app.fetch(forwardedRequest, env, ctx);
            return response as unknown as CfResponse;
        } catch (err) {
            console.error("Worker error:", err);
            return new Response("Internal Server Error", {
                status: 500,
            }) as unknown as CfResponse;
        }
    };

export default fetchMapper;
