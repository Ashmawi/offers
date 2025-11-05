import Link from "next/link";

export default function OfferCard({ catalog }: { catalog: any }) {
  const images = JSON.parse(catalog.images);

  return (
    <Link href={`/offers/${catalog.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
        <img
          src={catalog.thumbnail}
          alt={catalog.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition">
            {catalog.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">{catalog.storeName}</p>
          <div className="flex justify-between items-center">
            <span className="text-red-600 font-bold">
              حتى {new Date(catalog.validUntil).toLocaleDateString("ar-EG")}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
              {images.length} صفحة
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}