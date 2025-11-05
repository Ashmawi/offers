import { z } from "zod";

// Store validation schemas
export const storeSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "اسم المتجر مطلوب").max(255),
  slug: z.string().min(1, "Slug مطلوب").max(255).regex(/^[a-z0-9-]+$/, "Slug يجب أن يحتوي على حروف صغيرة وأرقام وشرطات فقط"),
  logo: z.string().url("رابط الشعار غير صالح").nullable().optional(),
});

export const createStoreSchema = storeSchema.omit({ id: true });
export const updateStoreSchema = storeSchema.partial().required({ id: true });

// Catalog validation schemas
export const catalogSchema = z.object({
  id: z.number().int().positive().optional(), // Auto-increment, so optional
  storeId: z.number().int().positive("معرف المتجر غير صالح"),
  title: z.string().min(1, "عنوان الكتالوج مطلوب").max(255),
  description: z.string().max(1000).nullable().optional(),
  validUntil: z.coerce.date().refine((date) => date > new Date(), {
    message: "تاريخ الانتهاء يجب أن يكون في المستقبل",
  }),
  thumbnail: z.string().url("رابط الصورة المصغرة غير صالح"),
  pdfLink: z.string().url("رابط PDF غير صالح").nullable().optional(),
  images: z.array(z.string().url()).min(1, "يجب إضافة صورة واحدة على الأقل"),
  status: z.enum(["pending", "published", "rejected"]).default("pending"),
  createdAt: z.coerce.date().optional(),
});

export const createCatalogSchema = catalogSchema.omit({ id: true, createdAt: true });
export const updateCatalogSchema = catalogSchema.partial().required({ id: true });

// Webhook validation schema
export const webhookOfferSchema = z.object({
  product: z.string().min(1, "اسم المنتج مطلوب"),
  price: z.number().positive("السعر يجب أن يكون موجب"),
  oldPrice: z.number().positive().nullable().optional(),
  store: z.string().min(1, "اسم المتجر مطلوب"),
  image: z.string().url().nullable().optional(),
  offerUrl: z.string().url().nullable().optional(),
});

export type StoreInput = z.infer<typeof createStoreSchema>;
export type CatalogInput = z.infer<typeof createCatalogSchema>;
export type WebhookOfferInput = z.infer<typeof webhookOfferSchema>;
