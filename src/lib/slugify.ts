export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD') // لتحويل الحروف المعلمة
    .replace(/[\u0300-\u036f]/g, '') // حذف العلامات
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '') // احتفظ بالعربي والإنجليزي
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}