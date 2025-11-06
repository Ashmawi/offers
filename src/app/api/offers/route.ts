import { NextRequest, NextResponse } from 'next/server';
import { db, catalogs, eq, desc, and, or, lt } from '@/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const cursorParam = searchParams.get('cursor');

    const limit = Math.min(Math.max(Number(limitParam) || 12, 1), 50);
    const afterId = cursorParam ? Number(cursorParam) : null;

    let items;

    if (!afterId) {
      items = await db.query.catalogs.findMany({
        where: eq(catalogs.status, 'published'),
        orderBy: [desc(catalogs.createdAt), desc(catalogs.id)],
        limit,
        with: {
          store: { columns: { id: true, name: true, slug: true, logo: true } },
        },
      });
    } else {
      // fetch cursor row to get createdAt for keyset pagination
      const cursorRow = await db.query.catalogs.findFirst({
        where: eq(catalogs.id, afterId),
        columns: { id: true, createdAt: true },
      });

      if (!cursorRow) {
        return NextResponse.json({ items: [], nextCursor: null }, { status: 200 });
      }

      const cursorCreatedAt = cursorRow.createdAt;

      items = await db.query.catalogs.findMany({
        where: and(
          eq(catalogs.status, 'published'),
          or(
            lt(catalogs.createdAt, cursorCreatedAt),
            and(
              // same createdAt, then by id
              eq(catalogs.createdAt, cursorCreatedAt),
              lt(catalogs.id, afterId)
            )
          )
        ),
        orderBy: [desc(catalogs.createdAt), desc(catalogs.id)],
        limit,
        with: {
          store: { columns: { id: true, name: true, slug: true, logo: true } },
        },
      });
    }

    const nextCursor = items.length === limit ? items[items.length - 1].id : null;

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    console.error('Error fetching offers page:', error);
    return NextResponse.json({ error: 'Failed to fetch offers' }, { status: 500 });
  }
}
