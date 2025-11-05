import { db, catalogs, eq, desc } from "@/db";

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