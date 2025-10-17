import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { ApiRouter } from "../types";

const trpcClient = createTRPCClient<ApiRouter>({
    links: [httpBatchLink({ url: "/apis" })],
});

export default trpcClient;
