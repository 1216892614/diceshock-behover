import { HonoCtxEnv, InjectCrossData } from "@/shared/types";
import { Context } from "hono";

export const injectCrossDataToCtx = (
    ctx: Context<HonoCtxEnv>,
    crossData: Partial<InjectCrossData>
) => {
    const prevInject = ctx.get("InjectCrossData");
    ctx.set("InjectCrossData", { ...prevInject, ...crossData });
};
