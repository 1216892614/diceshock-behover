import * as drizzle from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { docsContentZ, docsMetaZ } from "@/shared/types/table";
import z from "zod/v4";

const id = drizzle.text().$defaultFn(() => createId());
const create_at = drizzle.integer("timestamp_ms").$defaultFn(() => Date.now());
const jsonb = drizzle.blob({ mode: "json" });
const json = drizzle.text({ mode: "json" });

export const docsTable = drizzle.sqliteTable("docs_table", {
    id,
    create_at,
    meta: jsonb.$type<z.infer<typeof docsMetaZ>>(),
    content: json.$type<z.infer<typeof docsContentZ>>(),
});
