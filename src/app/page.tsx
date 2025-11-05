import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-6 bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🛍️ Offers
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            أحدث عروض وكتالوجات المتاجر في مكان واحد
          </p>
          <p className="text-lg text-gray-600">
            اكتشف أفضل العروض من متاجرك المفضلة
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-16">
          <Link
            href="/offers"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            تصفح العروض 🔥
          </Link>
          <Link
            href="/api/stores"
            className="px-8 py-4 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-all transform hover:scale-105 shadow-lg"
          >
            API المتاجر 📡
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

        <div className="text-center mt-16 text-gray-500">
          <p>بُني بـ Next.js 16 + Drizzle ORM + Turso</p>
        </div>
      </div>
    </div>
  );
}
