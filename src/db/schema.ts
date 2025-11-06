import { int, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { sql, relations } from "drizzle-orm";

export const processedWebhooks = sqliteTable("processed_webhooks", {
  id: int("id").primaryKey({ autoIncrement: true }),
  webhookId: text("webhook_id").notNull().unique(),
  catalogId: int("catalog_id").references(() => catalogs.id),
  processedAt: int("processed_at", { mode: "timestamp" }).notNull(),
});

export const stores = sqliteTable("stores", {
  id: int("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  logo: text("logo"),
});

export const catalogs = sqliteTable(
  "catalogs",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    storeId: int("store_id").notNull().references(() => stores.id),
    title: text("title").notNull(),
    description: text("description"),
    validUntil: text("valid_until"),
    thumbnail: text("thumbnail"),
    refLink: text("ref_link"),
    pdfLink: text("pdf_link"),
    images: text("images").notNull(), // JSON string array
    status: text("status").default("pending"), // pending/published/rejected
    createdAt: int("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => ({
    catalogsStatusIdx: index("idx_catalogs_status").on(table.status),
    catalogsCreatedAtIdx: index("idx_catalogs_created_at").on(table.createdAt),
    catalogsStoreIdIdx: index("idx_catalogs_store_id").on(table.storeId),
  })
);

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

// Rate limiting hits for webhook requests
export const webhookHits = sqliteTable(
  "webhook_hits",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    secret: text("secret").notNull(),
    ip: text("ip"),
    createdAt: int("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  },
  (table) => ({
    webhookHitsSecretIdx: index("idx_webhook_hits_secret_created").on(table.secret, table.createdAt),
  })
);