````markdown
# Offers - Next.js + Drizzle ORM + Turso 🛍️

Production-ready offers catalog application with Next.js, Drizzle ORM, and Turso database.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **ORM**: Drizzle ORM
- **Database**: Turso (Distributed SQLite) with LibSQL client
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

## 📦 Database Schema

**Store** - متاجر
- `id`, `name`, `slug`, `logo`

**Catalog** - كتالوجات العروض
- `id`, `storeId`, `title`, `description`, `validUntil`, `thumbnail`, `pdfLink`, `images`, `createdAt`

## 🛠️ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Setup environment variables
Create `.env` file:
```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
NEXT_PUBLIC_SITE_URL=https://your-domain.com
N8N_WEBHOOK_SECRET=super-secret-token
```

### 3. Push database schema to Turso
```bash
npm run db:push
```

Or generate migrations:
```bash
npm run db:generate
```

### 4. Seed initial data (optional)
```bash
npm run db:seed
```

### 5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 6. Open Drizzle Studio (optional)
```bash
npm run db:studio
```

Browse your database visually at [https://local.drizzle.studio](https://local.drizzle.studio)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema changes to Turso database
- `npm run db:generate` - Generate migration files
- `npm run db:studio` - Open Drizzle Studio (Database UI)
- `npm run lint` - Run ESLint

## 🔌 API Endpoints

### Stores API

**GET** `/api/stores` - Fetch all stores
```json
[
  {
    "id": 1,
    "name": "كارفور",
    "slug": "carrefour",
    "logo": null
  }
]
```

**POST** `/api/stores` - Create new store
```json
{
  "name": "كارفور",
  "slug": "carrefour",
  "logo": "https://example.com/logo.png"
}
```

### Catalogs API

**GET** `/api/catalogs` - Fetch all active catalogs
```json
[
  {
    "id": "catalog-123",
    "storeId": 1,
    "title": "عروض الأسبوع",
    "description": "أفضل العروض لهذا الأسبوع",
    "validUntil": "2025-12-31T23:59:59.000Z",
    "thumbnail": "https://example.com/thumb.jpg",
    "pdfLink": "https://example.com/catalog.pdf",
    "images": "[\"img1.jpg\",\"img2.jpg\"]",
    "createdAt": "2025-11-05T10:00:00.000Z",
    "store": {
      "id": 1,
      "name": "كارفور",
      "slug": "carrefour",
      "logo": null
    }
  }
]
```

**POST** `/api/catalogs` - Create new catalog
```json
{
  "id": "catalog-123",
  "storeId": 1,
  "title": "عروض الأسبوع",
  "description": "أفضل العروض",
  "validUntil": "2025-12-31",
  "thumbnail": "https://example.com/thumb.jpg",
  "pdfLink": "https://example.com/catalog.pdf",
  "images": ["https://example.com/img1.jpg"]
}
```

### Webhook API

**POST** `/api/webhook` - Receive offer webhooks

Headers:
- `x-webhook-secret: <N8N_WEBHOOK_SECRET>`

Body (example):
```json
{
  "webhookId": "n8n-exec-123",
  "storeId": 1,
  "title": "عروض الأسبوع",
  "description": "أفضل العروض",
  "thumbnail": "https://...",
  "images": ["https://.../1.jpg", "https://.../2.jpg"]
}
```

## 💡 Using Drizzle ORM in Your Code

```typescript
import { db, stores, catalogs, eq, desc } from "@/db";

// Fetch all stores
const allStores = await db.select().from(stores).all();

// Get store by slug
const store = await db
  .select()
  .from(stores)
  .where(eq(stores.slug, "kazyon"))
  .get();

// Create new store
const newStore = await db
  .insert(stores)
  .values({
    name: "كارفور",
    slug: "carrefour",
    logo: "/logos/carrefour.png"
  })
  .returning();

// Create catalog
await db.insert(catalogs).values({
  id: "catalog-id",
  storeId: 1,
  title: "Weekly Offers",
  validUntil: new Date("2025-12-31"),
  thumbnail: "/thumb.jpg",
  images: JSON.stringify(["/img1.jpg", "/img2.jpg"]),
});

// Get catalogs with store info
const catalogsWithStores = await db
  .select()
  .from(catalogs)
  .leftJoin(stores, eq(catalogs.storeId, stores.id))
  .orderBy(desc(catalogs.createdAt));
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/               # API routes
│   │   ├── stores/       # Stores endpoints
│   │   └── webhook/      # Webhook handler
│   ├── offers/           # Offers/Catalogs pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   └── OfferCard.tsx    # Catalog card component
└── db/
    ├── index.ts         # Database client & exports
    ├── schema.ts        # Drizzle schema definitions
    └── types.ts         # TypeScript types

drizzle/
├── 0000_*.sql          # Generated migrations
└── meta/               # Migration metadata
```

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Turso Docs](https://docs.turso.tech)
- [LibSQL Client](https://github.com/tursodatabase/libsql-client-ts)
