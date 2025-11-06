import { getOfferById } from '@/lib/queries';
import { notFound } from 'next/navigation';
import ImagePopup from '@/components/ImagePopup';
import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://as3armasr.com';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idPart = slug.split('-')[0];
  const id = Number(idPart);
  if (isNaN(id)) {
    return {
      title: 'عرض غير موجود',
      description: 'العرض المطلوب غير متوفر أو الرابط غير صحيح'
    };
  }
  const catalog = await getOfferById(id);
  if (!catalog) {
    return {
      title: 'العرض غير متوفر',
      description: 'قد يكون تم حذفه أو غير منشور'
    };
  }
  let images: string[] = [];
  try { images = JSON.parse(catalog.images); } catch { images = []; }

  return {
    title: `${catalog.title} | ${catalog.store.name}`,
    description: catalog.description || `اكتشف عرض ${catalog.title} من ${catalog.store.name}`,
    alternates: {
      canonical: `${siteUrl}/offers/${slug}`
    },
    openGraph: {
      type: 'article',
      title: `${catalog.title} | ${catalog.store.name}`,
      description: catalog.description || `اكتشف عرض ${catalog.title} من ${catalog.store.name}`,
      url: `${siteUrl}/offers/${slug}`,
      images: [catalog.thumbnail || images[0] || `${siteUrl}/og-default.png`].filter(Boolean).map(u => ({ url: u })),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${catalog.title} | ${catalog.store.name}`,
      description: catalog.description || `اكتشف عرض ${catalog.title} من ${catalog.store.name}`,
      images: [catalog.thumbnail || images[0] || `${siteUrl}/og-default.png`]
    }
  };
}

export default async function OfferPage({ params }: Props) {
  const { slug } = await params;
  const slugParts = slug.split('-');
  const id = Number(slugParts[0]);
  if (isNaN(id)) return notFound();
  const catalog = await getOfferById(id);
  if (!catalog) return notFound();
  let images: string[] = [];
  try { images = JSON.parse(catalog.images); } catch { images = []; }

  // Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: catalog.title,
    description: catalog.description || '',
    url: `${siteUrl}/offers/${slug}`,
    seller: { '@type': 'Organization', name: catalog.store.name },
    image: images,
    availability: 'https://schema.org/InStock',
    offers: {
      '@type': 'AggregateOffer',
      offerCount: images.length,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'العروض', item: `${siteUrl}/offers` },
        { '@type': 'ListItem', position: 3, name: catalog.title, item: `${siteUrl}/offers/${slug}` },
      ]
    }
  };

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
                    <ImagePopup imageUrl={image} alt={`${catalog.title} - صورة رقم ${index + 1}`} />
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>
      </div>
    </div>
  );
}