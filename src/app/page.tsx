import OffersList from "@/components/OffersList";
import { getLatestPublishedOffers } from "@/lib/queries";

export const revalidate = 600; // 10 minutes ISR

export default async function Home() {

  const initialOffers = await getLatestPublishedOffers(5);
  const nextCursor = initialOffers.length === 10 ? initialOffers[9].id : null;

  if (initialOffers.length === 0) {
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
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-4">
          <p className="text-xl text-gray-700">أحدث عروض الاسعار المتاجر في مكان واحد</p>
        </div>
        <div className="min-h-screen p-8">
          <OffersList initialOffers={initialOffers} initialCursor={nextCursor} />
        </div>
      </div>
      <div className="bg-linear-to-br from-purple-50 via-pink-50 to-blue-50 pt-12 border-t border-gray-200">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🏪</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">متاجر متعددة</h3>
            <p className="text-gray-600">
              عروض من جميع المتاجر المشهورة في مكان واحد
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">تحديثات سريعة</h3>
            <p className="text-gray-600">
              أحدث العروض والكتالوجات بشكل مستمر
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">سهل الاستخدام</h3>
            <p className="text-gray-600">
              تصميم بسيط وسهل للوصول لما تريد
            </p>
          </div>
        </div>

        <div className="text-center mt-16 pb-8 text-gray-500">
          <p>أسعار مصر {new Date().toLocaleDateString("ar-EG")}</p>
        </div>
      </div>
    </div>
  );
}
