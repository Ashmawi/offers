import { type NextRequest } from "next/server";
import { db, stores, desc } from "@/db";
import { createStoreSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  try {
    const allStores = await db
      .select()
      .from(stores)
      .orderBy(desc(stores.name))
      .all();
    
    return Response.json(allStores);
  } catch (error) {
    console.error("Error fetching stores:", error);
    return Response.json(
      { error: "فشل في جلب المتاجر" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = createStoreSchema.parse(body);

    const result = await db
      .insert(stores)
      .values(validatedData)
      .returning();
    
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

    console.error("Error creating store:", error);
    return Response.json(
      { error: "فشل في إنشاء المتجر" },
      { status: 500 }
    );
  }
}
