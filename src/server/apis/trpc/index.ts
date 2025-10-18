import owned from "./owned";
import { router } from "./trpc";

export const appRouter = router({
    owned,
});
