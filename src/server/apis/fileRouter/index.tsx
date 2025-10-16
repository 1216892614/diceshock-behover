import clsx from "clsx";
import {
    Link,
    ReactRefresh,
    Script,
    ViteClient,
} from "vite-ssr-components/react";
import {
    createRequestHandler,
    renderRouterToStream,
    RouterServer,
} from "@tanstack/react-router/ssr/server";
import { Context } from "hono";
import { Env } from "@/shared/types";
import themeGet from "./themeGet";

import { createRouter as createDiceshockRouter } from "@/apps/diceshock/router";
import { createRouter as createRunesparkRouter } from "@/apps/runespark/router";

import { CrossDataProvider } from "@/client/hooks/useCrossData";
import { ServerCtxProvider } from "@/client/hooks/useServerCtx";

export default async function fileRouter(c: Context<Env>) {
    const urlObj = new URL(c.req.url);

    const site: "diceshock" | "runespark" =
        urlObj.hostname.startsWith("runespark.") ||
        urlObj.pathname.startsWith("/runespark")
            ? "runespark"
            : "diceshock";

    const handler = createRequestHandler({
        request: c.req.raw,
        createRouter:
            site === "runespark"
                ? createRunesparkRouter
                : createDiceshockRouter,
    });

    c.header("Content-Type", "text/html");

    const [themeEl, theme] = themeGet(c);

    const res = handler(({ request, responseHeaders, router }) => {
        router.history.replace(c.req.url);

        return renderRouterToStream({
            request,
            responseHeaders,
            router,
            children: (
                <html
                    lang="zh-CN-Hans"
                    className={clsx({ dark: theme === "dark" }, "antialiased")}
                >
                    <head>
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, viewport-fit=cover"
                        />

                        <ViteClient />
                        <ReactRefresh />

                        {site === "runespark" && (
                            <Script src="/src/apps/runespark/client.tsx" />
                        )}

                        {site === "runespark" && (
                            <Link
                                href="/src/apps/runespark/style.css"
                                rel="stylesheet"
                            />
                        )}

                        {site === "diceshock" && (
                            <Script src="/src/apps/diceshock/client.tsx" />
                        )}

                        {site === "diceshock" && (
                            <Link
                                href="/src/apps/diceshock/style.css"
                                rel="stylesheet"
                            />
                        )}
                    </head>

                    <body>
                        <div id="root">
                            <ServerCtxProvider c={c}>
                                <CrossDataProvider c={c}>
                                    <RouterServer router={router} />
                                </CrossDataProvider>
                            </ServerCtxProvider>
                        </div>

                        {themeEl}
                    </body>
                </html>
            ),
        });
    });

    return res;
}
