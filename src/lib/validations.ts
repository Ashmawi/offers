import { z } from "zod";

// Store validation schemas
export const storeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "اسم المتجر مطلوب").max(255),
  slug: z.string().min(1, "Slug مطلوب").max(255).regex(/^[a-z0-9-]+$/, "Slug يجب أن يحتوي على حروف صغيرة وأرقام وشرطات فقط"),
  logo: z.string().url("رابط الشعار غير صالح").nullable().optional(),
  createdAt: z.coerce.date().optional(),
});

export const createStoreSchema = storeSchema.omit({ id: true, createdAt: true });
export type StoreInput = z.infer<typeof createStoreSchema>;

// Catalog validation schemas
export const catalogSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-increment, so optional
  storeId: z.number().int().positive("معرف المتجر غير صالح"),
  title: z.string().min(1, "عنوان الكتالوج مطلوب").max(255),
  description: z.string().max(1000).nullable().optional(),
  validUntil: z.string().max(1000).nullable().optional(),
  thumbnail: z.string().url("رابط الصورة المصغرة غير صالح").nullable().optional(),
  refLink: z.string().url("رابط المرجع غير صالح").nullable().optional(),
  pdfLink: z.string().url("رابط PDF غير صالح").nullable().optional(),
  images: z.array(z.string().url()).min(1, "يجب إضافة صورة واحدة على الأقل"),
  status: z.enum(["pending", "published", "rejected"]).default("pending"),
  createdAt: z.coerce.date().optional(),
});
export const createCatalogSchema = catalogSchema.omit({ id: true, createdAt: true });

export type CatalogInput = z.infer<typeof createCatalogSchema>;