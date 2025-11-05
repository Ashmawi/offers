import "dotenv/config";
import { db, stores, catalogs, eq } from "../src/db";

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

const catalogsData = [
  {
    storeSlug: "carrefour",
    title: "كتالوج كارفور - يناير 2024",
    description: "عروض وخصومات على جميع الأقسام",
    validUntil: new Date("2024-01-31"),
    thumbnail: "https://example.com/carrefour-thumb.jpg",
    pdfLink: "https://example.com/carrefour-catalog.pdf",
    images: JSON.stringify([
      "https://example.com/carrefour-1.jpg",
      "https://example.com/carrefour-2.jpg",
    ]),
  },
  {
    storeSlug: "hyper-panda",
    title: "كتالوج هايبر بنده - عروض الشتاء",
    description: "أفضل الأسعار على المنتجات الموسمية",
    validUntil: new Date("2024-02-15"),
    thumbnail: "https://example.com/panda-thumb.jpg",
    pdfLink: "https://example.com/panda-catalog.pdf",
    images: JSON.stringify([
      "https://example.com/panda-1.jpg",
      "https://example.com/panda-2.jpg",
      "https://example.com/panda-3.jpg",
    ]),
  },
  {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
    {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
    {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
    {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
    {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
    {
    storeSlug: "lulu",
    title: "كتالوج لولو - عروض نهاية الأسبوع",
    description: "خصومات كبيرة على آلاف المنتجات",
    validUntil: new Date("2024-01-14"),
    thumbnail: "https://example.com/lulu-thumb.jpg",
    pdfLink: null,
    images: JSON.stringify([
      "https://example.com/lulu-1.jpg",
      "https://example.com/lulu-2.jpg",
    ]),
  },
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

    // Insert catalogs
    for (const catalog of catalogsData) {
      const store = await db.select().from(stores).where(eq(stores.slug, catalog.storeSlug)).get();
      if (store) {
        await db.insert(catalogs).values({ ...catalog, storeId: store.id });
        console.log(`✅ Added catalog: ${catalog.title}`);
      } else {
        console.log(`⏭️  Store not found for catalog: ${catalog.title}`);
      }
    }

    console.log("\n✨ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
