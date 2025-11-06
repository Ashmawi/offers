import type { MetadataRoute } from 'next';
import { getLatestPublishedOffers } from '@/lib/queries';
import { slugify } from '@/lib/slugify';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://as3armasr.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch a reasonable number of offers for sitemap (could paginate later)
  const offers = await getLatestPublishedOffers(50);

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      changeFrequency: 'daily',
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/offers`,
      changeFrequency: 'hourly',
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  const offerEntries: MetadataRoute.Sitemap = offers.map((offer) => ({
    url: `${siteUrl}/offers/${offer.id}-${slugify(offer.store.name + '-' + offer.title)}`,
    changeFrequency: 'weekly',
    priority: 0.7,
    lastModified: new Date(offer.createdAt),
  }));

  return [...staticEntries, ...offerEntries];
}
