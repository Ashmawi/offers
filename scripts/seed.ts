import "dotenv/config";
import { db, stores, eq } from "../src/db";

const storesData = [
  { name: "كارفور", slug: "carrefour", logo: null },
  { name: "هايبر بنده", slug: "hyper-panda", logo: null },
  { name: "كازيون", slug: "kazyon", logo: null },
  { name: "العثيم", slug: "othaim", logo: null },
  { name: "بنده", slug: "panda", logo: null },
  { name: "الدانوب", slug: "danube", logo: null },
  { name: "لولو", slug: "lulu", logo: null },
  { name: "نستو", slug: "nesto", logo: null },
];

async function seed() {
  console.log("🌱 Starting database seed...");

  try {
    // Insert stores
    for (const store of storesData) {
      const existing = await db.select().from(stores).where(eq(stores.slug, store.slug)).get();

      if (!existing) {
        await db.insert(stores).values(store);
        console.log(`✅ Added store: ${store.name}`);
      } else {
        console.log(`⏭️  Store already exists: ${store.name}`);
      }
    }
    console.log("\n✨ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
