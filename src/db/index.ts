import 'dotenv/config';
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import {
  eq, ne, gt, gte, lt, lte, and, or,
  inArray, notInArray, isNull, isNotNull,
  like, ilike, asc, desc, count, sum, avg, min, max, sql,
} from "drizzle-orm";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client, { schema });

export { schema };

export const { stores, catalogs } = schema;

export {
  eq, ne, gt, gte, lt, lte, and, or,
  inArray, notInArray, isNull, isNotNull,
  like, ilike, asc, desc, count, sum, avg, min, max, sql,
};

export type {
  Store,
  Catalog,
  NewStore,
  NewCatalog
} from "./types";