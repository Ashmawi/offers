import { db, catalogs, eq, desc, and, or, lt } from "@/db";

export async function getLatestPublishedOffers(limit = 5) {
  return db.query.catalogs.findMany({
    where: eq(catalogs.status, 'published'),
    orderBy: desc(catalogs.createdAt),
    limit,
    with: {
      store: {
        columns: { id: true, name: true, slug: true, logo: true },
      },
    },
  });
}

export async function getOfferById(offerId: number) {
  console.log(offerId);
  
  return db.query.catalogs.findFirst({
    where: eq(catalogs.id, offerId),
    with: {
      store: {
        columns: { name: true },
      },
    },
  });
}

// Cursor pagination using keyset (createdAt, id)
export async function getPublishedOffersPage(limit = 12, afterId?: number) {
  if (!afterId) {
    return db.query.catalogs.findMany({
      where: eq(catalogs.status, 'published'),
      orderBy: [desc(catalogs.createdAt), desc(catalogs.id)],
      limit,
      with: { store: { columns: { id: true, name: true, slug: true, logo: true } } },
    });
  }
  const cursorRow = await db.query.catalogs.findFirst({
    where: eq(catalogs.id, afterId),
    columns: { id: true, createdAt: true },
  });
  if (!cursorRow) return [];
  return db.query.catalogs.findMany({
    where: and(
      eq(catalogs.status, 'published'),
      or(
        lt(catalogs.createdAt, cursorRow.createdAt),
        and(eq(catalogs.createdAt, cursorRow.createdAt), lt(catalogs.id, afterId))
      )
    ),
    orderBy: [desc(catalogs.createdAt), desc(catalogs.id)],
    limit,
    with: { store: { columns: { id: true, name: true, slug: true, logo: true } } },
  });
}