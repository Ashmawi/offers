import { type NextRequest } from "next/server";
import { db, stores, type Store, type NewStore } from "@/db";

export async function GET() {
  const allStores: Store[] = await db.select().from(stores).all();
  return Response.json(allStores);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as NewStore;

  const result = await db.insert(stores).values(body).returning();
  return Response.json(result[0] as Store);
}
