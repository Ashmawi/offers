import { webhookOfferSchema, WebhookOfferInput } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import { put } from "@vercel/blob";
import { db, catalogs } from '@/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming webhook data
    const validationResult = webhookOfferSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.format());
      return NextResponse.json({
        error: 'بيانات العرض غير صالحة',
        details: validationResult.error.format()
      }, { status: 400 });
    }

    const offerInput: WebhookOfferInput = validationResult.data;

    const uploadedImages: string[] = [];

    for (const imgPath of offerInput.images) {
      
      // return NextResponse.json({message: "تم حفظ العرض بنجاح ✅", images: imgPath }, { status: 200 });

      try {
        // Create full URL for local paths
        const imageUrl = imgPath;

        // Upload the image from the source
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error(`فشل تحميل الصورة: ${imageUrl}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Vercel Blob
        const blob = await put(`offers/${Date.now()}-${Math.random()}.jpg`, buffer, {access: "public"});

        console.log("✅ Uploaded:", blob.url);
        uploadedImages.push(blob.url);
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }

    // Update catalog data with new image URLs
    const catalogData = {
      ...offerInput,
      images: uploadedImages.length > 0 ? uploadedImages : offerInput.images,
    };

    // TODO: insert catalogData into database
    console.log("🎯 Final catalog data:", catalogData);

    // Process the validated webhook data from n8n here
    console.log('Received validated webhook from n8n:', offerInput);

    // Save the catalog data to the database
    const insertedCatalog = await db.insert(catalogs).values({
      storeId: offerInput.storeId,
      title: offerInput.title,
      description: offerInput.description,
      validUntil: offerInput.validUntil,
      thumbnail: offerInput.thumbnail,
      pdfLink: offerInput.pdfLink,
      images: JSON.stringify(uploadedImages),
    }).returning();
    return NextResponse.json({message: "تم حفظ العرض بنجاح ✅", catalog: insertedCatalog[0] }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({
      error: 'خطأ في معالجة البيانات',
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
}