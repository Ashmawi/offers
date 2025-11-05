import turso from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Store type definition
 */
interface Store {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
}

/**
 * GET /api/stores
 * Fetches all stores from Turso database using LibSQL client
 * 
 * @returns JSON response with array of stores
 * @example
 * [
 *   { id: 1, name: "كازيون", slug: "kazyon", logo: null },
 *   { id: 2, name: "بيم", slug: "bim", logo: null }
 * ]
 */
export async function GET() {
  try {
    // Execute SQL query to fetch all stores ordered by name
    const result = await turso.execute(
      "SELECT id, name, slug, logo FROM Store ORDER BY name ASC"
    );

    // Map database rows to Store objects
    const stores: Store[] = result.rows.map((row) => ({
      id: row.id as number,
      name: row.name as string,
      slug: row.slug as string,
      logo: row.logo as string | null,
    }));

    return NextResponse.json(stores);
  } catch (error) {
    console.error("Failed to fetch stores:", error);
    return NextResponse.json(
      { error: "Failed to fetch stores" },
      { status: 500 }
    );
  }
}
