import { put } from '@vercel/blob';
import { db, catalogs, } from '@/db';
import { CatalogInput } from '@/lib/validations';

export async function processOfferWebhook(data: CatalogInput) {
  const uploadedImages = await uploadImages(data.images);
  const finalImages = uploadedImages.length > 0 ? uploadedImages : data.images;
  const [catalog] = await db.insert(catalogs).values({...data, images: JSON.stringify(finalImages), status: 'pending'}).returning();
  return catalog;
}

async function uploadImages(imageUrls: string[]): Promise<string[]> {
  const uploaded: string[] = [];

  for (const url of imageUrls) {
    try {
      // Validate URL and scheme
      let parsed: URL;
      try { parsed = new URL(url); } catch { continue; }
      if (!['http:', 'https:'].includes(parsed.protocol)) continue;

      const res = await fetch(url, { headers: { 'user-agent': 'offers-crawler/1.0' } });
      if (!res.ok) continue;
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) continue;

      const buffer = Buffer.from(await res.arrayBuffer());
      const ext = contentType.split('/')[1] || 'jpg';
      const blob = await put(`offers/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`, buffer, {
        access: 'public',
      });
      uploaded.push(blob.url);
    } catch (err) {
      console.error(`فشل رفع الصورة: ${url}`, err);
    }
  }

  return uploaded;
}