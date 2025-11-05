import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const stores = sqliteTable("stores", {
  id: int("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
});

export const catalogs = sqliteTable("catalogs", {
  id: text("id").primaryKey(),
  storeId: int("store_id").notNull().references(() => stores.id),
  title: text("title").notNull(),
  description: text("description"),
  validUntil: int("valid_until", { mode: "timestamp" }).notNull(),
  thumbnail: text("thumbnail").notNull(),
  pdfLink: text("pdf_link"),
  images: text("images").notNull(), // JSON string array
  createdAt: int("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
});