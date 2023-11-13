import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";


export const rooms = sqliteTable(
    "rooms",
    {
        id: text("id").primaryKey().unique().notNull().$defaultFn(() => createId()),
        roomname: text("roomname").notNull(),
        password: text("password").notNull(),
        created_at: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    }
);
