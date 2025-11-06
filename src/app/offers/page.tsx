import OfferCard from "@/components/OfferCard";
import { getLatestPublishedOffers } from "@/lib/queries";

export const revalidate = 600; // ISR for offers list

export default async function OffersPage() {
  const allCatalogs = await getLatestPublishedOffers(5);
  
  if (allCatalogs.length > 0) {}

  if (allCatalogs.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">لا توجد عروض متاحة حالياً</p>
            <p className="text-gray-500 mt-4">تحقق مرة أخرى قريباً!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-gray-600 mb-12">اكتشف أحدث العروض من المتاجر المفضلة لديك</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCatalogs.map((catalog) => (
            <OfferCard key={catalog.id} catalog={catalog} />
          ))}
        </div>
      </div>
    </div>
  );
}