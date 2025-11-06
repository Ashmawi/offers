import { getOfferById } from '@/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ImagePopup from '@/components/ImagePopup';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OfferPage({ params }: Props) {
  // Await params in Next.js 15+
  const { slug } = await params;
  
  const slugParts = slug.split('-');
  const id = Number(slugParts[0]);

  if (isNaN(id)) {
    return notFound();
  }
  
  const catalog = await getOfferById(id);
  
  if (!catalog) {
    return notFound();
  }

  const images = JSON.parse(catalog.images);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-purple-600 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{catalog.title}</h1>
            <div className="flex items-center gap-4">
              <p className="text-lg">📍 {catalog.store.name}</p>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm">
                صالح حتى : {catalog.validUntil ? catalog.validUntil : "غير محدد"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {catalog.description && (
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">{catalog.description}</p>
              </div>
            )}

            {/* Images Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
                {images.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-3/4 overflow-hidden rounded-lg shadow-lg">
                    <ImagePopup imageUrl={image} alt={`${catalog.title} - صورة ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* PDF Link */}
            {catalog.pdfLink && (
              <div className="text-center">
                <a
                  href={catalog.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  📄 تحميل الكتالوج PDF
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}