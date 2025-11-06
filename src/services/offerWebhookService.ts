import { put } from '@vercel/blob';
import { db, catalogs, } from '@/db';
import { CatalogInput } from '@/lib/validations';

export async function processOfferWebhook(data: CatalogInput) {
  const uploadedImages = await uploadImages(data.images);
  const finalImages = uploadedImages.length > 0 ? uploadedImages : data.images;
  console.log("hiiii");
  const [catalog] = await db.insert(catalogs).values({...data, images: JSON.stringify(finalImages), status: 'pending'}).returning();
  return catalog;
}

async function uploadImages(imageUrls: string[]): Promise<string[]> {
  const uploaded: string[] = [];

  for (const url of imageUrls) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const buffer = Buffer.from(await res.arrayBuffer());
      const blob = await put(`offers/${Date.now()}-${Math.random().toString(36)}.jpg`, buffer, {
        access: 'public',
      });
      uploaded.push(blob.url);
    } catch (err) {
      console.error(`فشل رفع الصورة: ${url}`, err);
    }
  }

  return uploaded;
}