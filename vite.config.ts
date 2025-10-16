import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
    server: { hmr: { overlay: false } },
    plugins: [
        tailwindcss(),
        cloudflare(),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
            routesDirectory: "src/apps/diceshock/routers",
            generatedRouteTree: "src/apps/diceshock/routeTree.gen.ts",
        }),
        tanstackRouter({
            target: "react",
            autoCodeSplitting: true,
            routesDirectory: "src/apps/runespark/routers",
            generatedRouteTree: "src/apps/runespark/routeTree.gen.ts",
        }),
        ssrPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
