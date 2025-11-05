import { NextRequest } from "next/server";
import { webhookOfferSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    // Validate webhook secret
    const secret = req.headers.get("x-secret");
    if (!secret || secret !== process.env.WEBHOOK_SECRET) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate webhook payload
    const validatedData = webhookOfferSchema.parse(body);

    // TODO: Save offer to database
    // For now, just log it
    console.log("Received offer:", validatedData);

    return Response.json(
      { message: "Offer received successfully", data: validatedData },
      { status: 200 }
    );
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

    console.error("Webhook error:", error);
    return Response.json(
      { error: "حدث خطأ في معالجة الطلب" },
      { status: 500 }
    );
  }
}