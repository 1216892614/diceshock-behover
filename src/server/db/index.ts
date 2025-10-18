import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export default function db(d1: D1Database) {
    return drizzle(d1, { schema });
}
