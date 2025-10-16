import { Env, InjectCrossData } from "@/shared/types";
import { Context } from "hono";

export const injectCrossDataToCtx = (
    ctx: Context<Env>,
    crossData: Partial<InjectCrossData>
) => {
    const prevInject = ctx.get("InjectCrossData");
    ctx.set("InjectCrossData", { ...prevInject, ...crossData });
};
