import Link from "next/link";
import Image from "next/image";
import { type CatalogWithStore } from "@/db";
import { slugify } from "@/lib/slugify";

interface OfferCardProps {
  catalog: CatalogWithStore;
}

export default function OfferCard({ catalog }: OfferCardProps) {
  const images = JSON.parse(catalog.images);
  
  return (
    <Link href={`/offers/${catalog.id}-${slugify(catalog.store.name + '-' + catalog.title)}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={catalog.thumbnail ? catalog.thumbnail : images[0]}
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={catalog.title}
            loading="eager"
            priority
            fill
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-gray-800 font-bold text-lg mb-2 group-hover:text-blue-600 transition">
            {catalog.title}</h3>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600 text-sm inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ccc">
              <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/></svg> 
              {catalog.store.name}
            </p>
            <div className="flex justify-between items-center">
              {/* <span className="text-red-600 font-bold">
                حتى {new Date(catalog.validUntil).toLocaleDateString("ar-EG")}
              </span> */}
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"> {images.length} صور </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}