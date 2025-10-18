import { Draft } from "immer";
import z4 from "zod/v4";

export type Recipe<T> = (draft: Draft<T>) => Draft<T> | void;
export type PartialDeep<T> = T extends object
    ? { [P in keyof T]+?: PartialDeep<T[P]> }
    : T;
export type NodeTimeout = NodeJS.Timeout;

export const pagedZ = <T extends z4.ZodTypeAny>(params: T) =>
    z4.object({
        page: z4.number().int().min(1).default(1),
        pageSize: z4.number().int().min(1).max(100).default(10),
        params,
    });
