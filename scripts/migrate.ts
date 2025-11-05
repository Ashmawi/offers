import * as dotenv from "dotenv";
import * as path from "path";
import { createClient } from "@libsql/client";

/**
 * Database Migration Script for Turso (Direct LibSQL approach)
 * Creates tables using LibSQL client directly without Prisma
 * This is a simpler approach for Turso migrations
 */

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

/**
 * Creates database tables using direct LibSQL connection
 * Uses raw SQL with CREATE TABLE IF NOT EXISTS for idempotency
 */
async function migrate() {
  console.log("🔄 Connecting to Turso database...");

  // Validate environment variables
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not defined");
  }

  // Create direct LibSQL client connection to Turso
  const client = createClient({
    url,
    authToken,
  });

  try {
    console.log("🔄 Creating Store table...");
    
    // Create Store table
    await client.execute(`
      CREATE TABLE IF NOT EXISTS Store (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        logo TEXT
      )
    `);
    console.log("✅ Store table ready");

    console.log("🔄 Creating Catalog table...");
    
    // Create Catalog table with foreign key
    await client.execute(`
      CREATE TABLE IF NOT EXISTS Catalog (
        id TEXT PRIMARY KEY,
        storeId INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        validUntil TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        pdfLink TEXT,
        images TEXT NOT NULL,
        createdAt TEXT DEFAULT (datetime('now')),
        FOREIGN KEY (storeId) REFERENCES Store (id)
      )
    `);
    console.log("✅ Catalog table ready");

    console.log("🎉 Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    // Close database connection
    client.close();
  }
}

// Execute migration
migrate().catch(console.error);