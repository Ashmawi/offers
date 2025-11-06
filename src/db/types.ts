import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { stores, catalogs } from "./schema";

export type Store = InferSelectModel<typeof stores>;
export type NewStore = InferInsertModel<typeof stores>;

export type Catalog = InferSelectModel<typeof catalogs>;
export type NewCatalog = InferInsertModel<typeof catalogs>;

// Type for catalog with store info (from JOIN query)
export type CatalogWithStore = {
  id: number;
  storeId: number;
  title: string;
  description: string | null;
  validUntil: string | null;
  thumbnail: string | null;
  pdfLink: string | null;
  images: string;
  createdAt: Date;
  store: {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
  };
};