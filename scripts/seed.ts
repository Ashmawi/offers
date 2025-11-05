import * as dotenv from "dotenv";
import * as path from "path";

/**
 * Database Seeding Script for Turso
 * Populates Turso database with initial store data using LibSQL client
 * Uses INSERT OR IGNORE to avoid duplicate entries on multiple runs
 */

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

// Import Turso client (LibSQL)
import turso from "@/lib/prisma";

/**
 * Seeds the database with initial store records
 * Uses INSERT OR IGNORE to safely handle duplicate entries
 */
async function seed() {
  console.log("🌱 Seeding database with initial data...");

  // Initial store data to populate
  const stores = [
    { id: 9, name: "أولاد رجب", slug: "awlad-ragab" },
    { id: 1, name: "كازيون", slug: "kazyon" },
    { id: 2, name: "بيم", slug: "bim" },
  ];

  // Insert each store (ignore if already exists)
  for (const store of stores) {
    try {
      await turso.execute(
        `INSERT OR IGNORE INTO Store (id, name, slug, logo) VALUES (${store.id}, '${store.name}', '${store.slug}', NULL)`
      );
      console.log(`✅ Seeded: ${store.name}`);
    } catch (error) {
      console.log(`⚠️  Failed to seed ${store.name}:`, error);
    }
  }

  console.log("🎉 Database seeding completed!");
}

// Execute seeding with error handling
seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    // Close database connection and exit
    turso.close();
    process.exit(0);
  });