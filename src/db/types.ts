import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { stores, catalogs } from "./schema";

export type Store = InferSelectModel<typeof stores>;
export type NewStore = InferInsertModel<typeof stores>;

export type Catalog = InferSelectModel<typeof catalogs>;
export type NewCatalog = InferInsertModel<typeof catalogs>;