import { appRouter } from "@/server/apis/trpc";
import { trpcServer } from "@hono/trpc-server";

export default trpcServer({ router: appRouter });
