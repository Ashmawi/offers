import { db, catalogs, eq, desc } from "@/db";

export async function getLatestPublishedOffers(limit = 5) {
  return db.query.catalogs.findMany({
    where: eq(catalogs.status, 'published'),
    orderBy: desc(catalogs.createdAt),
    limit,
    with: {
      store: {
        columns: { name: true },
      },
    },
  });
}