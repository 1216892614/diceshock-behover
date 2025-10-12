import { MiddlewareHandler } from "hono";
import clsx from "clsx";
import { getCookie, setCookie } from "hono/cookie";
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
import { createRouter } from "@/router";
import { ServerDataProvider } from "@/client/hooks/useServerData";
import { parseUserAgentMeta } from "@/shared/utils/platform";
import InPixelFilter from "@/client/components/svg-filters/in-pixel";
import NoiseFilter from "@/client/components/svg-filters/noise";

const fileRouter = (async (c) => {
    const handler = createRequestHandler({ request: c.req.raw, createRouter });

    c.header("Content-Type", "text/html");

    let theme = getCookie(c, "syft-theme");

    if (!theme) {
        setCookie(c, "syft-theme", "dark");
        theme = "dark";
    }

    const userAgent = c.req.header("user-agent") ?? "";
    const acceptLanguage = c.req.header("accept-language") ?? "";

    const serverData = parseUserAgentMeta(userAgent, acceptLanguage);

    const res = handler(({ request, responseHeaders, router }) => {
        router.history.replace(c.req.url);

        return renderRouterToStream({
            request,
            responseHeaders,
            router,
            children: (
                <html
                    lang="zh-CN-Hans"
                    className={clsx({ dark: theme === "dark" })}
                >
                    <head>
                        <ViteClient />
                        <ReactRefresh />
                        <Script src="/src/client.tsx" />
                        <Link href="/src/style.css" rel="stylesheet" />
                    </head>
                    <body>
                        <div id="root">
                            <ServerDataProvider data={serverData}>
                                <RouterServer router={router} />
                            </ServerDataProvider>
                        </div>

                        <input
                            value="light"
                            type="checkbox"
                            id="syft-theme-controller"
                            defaultChecked={theme === "light" || !theme}
                            className="theme-controller size-0"
                        />

                        <InPixelFilter />
                        <NoiseFilter />
                    </body>
                </html>
            ),
        });
    });

    return res;
}) satisfies MiddlewareHandler;

export default fileRouter;
