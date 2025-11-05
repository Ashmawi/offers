import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";

export const stores = sqliteTable("stores", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
});

export const catalogs = sqliteTable("catalogs", {
  id: int("id").primaryKey({ autoIncrement: true }),
  storeId: int("store_id").notNull().references(() => stores.id),
  title: text("title").notNull(),
  description: text("description"),
  validUntil: int("valid_until", { mode: "timestamp" }).notNull(),
  thumbnail: text("thumbnail").notNull(),
  pdfLink: text("pdf_link"),
  images: text("images").notNull(), // JSON string array
  status: text("status").default("pending"), // pending/published/rejected
  createdAt: int("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});

// Relation
export const catalogsRelations = relations(catalogs, ({ one }) => ({
  store: one(stores, {
    fields: [catalogs.storeId],
    references: [stores.id],
  }),
}));

export const storesRelations = relations(stores, ({ many }) => ({
  catalogs: many(catalogs),
}));