import { type NextRequest } from "next/server";
import { db, catalogs, stores, eq, desc, gte } from "@/db";
import { createCatalogSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  try {
    const now = new Date();
    
    const allCatalogs = await db.select({
        id: catalogs.id,
        storeId: catalogs.storeId,
        title: catalogs.title,
        description: catalogs.description,
        validUntil: catalogs.validUntil,
        thumbnail: catalogs.thumbnail,
        pdfLink: catalogs.pdfLink,
        images: catalogs.images,
        createdAt: catalogs.createdAt,
        store: {
          id: stores.id,
          name: stores.name,
          slug: stores.slug,
          logo: stores.logo,
        },
      })
      .from(catalogs)
      .leftJoin(stores, eq(catalogs.storeId, stores.id))
      .where(gte(catalogs.validUntil, now))
      .orderBy(desc(catalogs.createdAt))
      .all();
    
    return Response.json(allCatalogs);
  } catch (error) {
    console.error("Error fetching catalogs:", error);
    return Response.json(
      { error: "فشل في جلب الكتالوجات" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createCatalogSchema.parse(body);

    // Convert images array to JSON string for storage
    const dataToInsert = { ...validatedData, images: JSON.stringify(validatedData.images) };

    const result = await db.insert(catalogs).values(dataToInsert).returning();
    
    return Response.json(result[0], { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json(
        { 
          error: "بيانات غير صالحة",
          details: error.issues 
        },
        { status: 400 }
      );
    }

    console.error("Error creating catalog:", error);
    return Response.json(
      { error: "فشل في إنشاء الكتالوج" },
      { status: 500 }
    );
  }
}
