import OfferCard from "@/components/OfferCard";
import { getLatestPublishedOffers } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function OffersPage() {
  const allCatalogs = await getLatestPublishedOffers(5);
  
  // Debug: شوف شكل الداتا
  if (allCatalogs.length > 0) {
    console.log("📦 Sample catalog data:", allCatalogs[0]);
  }

  if (allCatalogs.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            العروض والكتالوجات 🛍️
          </h1>
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
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          العروض والكتالوجات 🛍️
        </h1>
        <p className="text-center text-gray-600 mb-12">
          اكتشف أحدث العروض من المتاجر المفضلة لديك
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCatalogs.map((catalog) => (
            <OfferCard key={catalog.id} catalog={catalog} />
          ))}
        </div>
      </div>
    </div>
  );
}