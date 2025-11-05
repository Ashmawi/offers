import Link from "next/link";
import { type Catalog } from "@/db";

export default function OfferCard({ catalog } : { catalog: Catalog }) {
  const images = JSON.parse(catalog.images);

  return (
    <Link href={`/offers/${catalog.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
        <img
          src={catalog.images ? images[0] : "/placeholder.png"}
          alt={catalog.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="p-6">
          <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition">
            {catalog.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">Store ID: {catalog.store.name}</p>
          <div className="flex justify-between items-center">
            <span className="text-red-600 font-bold">
              حتى {new Date(catalog.validUntil).toLocaleDateString("ar-EG")}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"> {images.length} صور </span>
          </div>
        </div>
      </div>
    </Link>
  );
}