import { getLatestPublishedOffers } from "@/lib/queries";
import { slugify } from "@/lib/slugify";

export async function generateStaticParams() {
  const offers = await getLatestPublishedOffers();

  return offers.map((offer) => {
    // Generate slug in format: "5-carrefour-weekly-offers"
    const slug = `${offer.id}-${slugify(offer.store.name + '-' + offer.title)}`;
    return {
      slug: slug, // Single param now
    };
  });
}