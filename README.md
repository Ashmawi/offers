# Offers - Next.js + Prisma + Turso 🛍️

Production-ready offers catalog application with Next.js, Prisma ORM, and Turso database.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **ORM**: Prisma with Turso adapter
- **Database**: Turso (Distributed SQLite)
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
```

### 3. Create database tables
```bash
npm run migrate
```

### 4. Seed initial data
```bash
npm run seed
```

### 5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run migrate` - Create/update database tables
- `npm run seed` - Populate database with stores
- `npm run lint` - Run ESLint

## 🔌 API Example

**GET** `/api/stores` - Fetch all stores
```json
[
  {
    "id": 1,
    "name": "كازيون",
    "slug": "kazyon",
    "logo": null,
    "_count": { "catalogs": 0 }
  }
]
```

## 💡 Using Prisma in Your Code

```typescript
import prisma from "@/lib/prisma";

// Fetch all stores
const stores = await prisma.store.findMany();

// Get store with catalogs
const store = await prisma.store.findUnique({
  where: { slug: "kazyon" },
  include: { catalogs: true },
});

// Create catalog
const catalog = await prisma.catalog.create({
  data: {
    storeId: 1,
    title: "Weekly Offers",
    validUntil: new Date("2025-12-31"),
    thumbnail: "/images/thumb.jpg",
    images: JSON.stringify(["/img1.jpg"]),
  },
});
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/stores/        # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/
│   └── prisma.ts          # Prisma client
└── generated/prisma/      # Generated types

prisma/
└── schema.prisma          # Database schema

scripts/
├── migrate.ts             # Create tables
└── seed.ts                # Seed data
```

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://prisma.io/docs)
- [Turso Docs](https://docs.turso.tech)
