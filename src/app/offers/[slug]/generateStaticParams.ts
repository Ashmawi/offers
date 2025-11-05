import { getLatestPublishedOffers } from "@/lib/queries";
import { slugify } from "@/lib/slugify";

export async function generateStaticParams() {

  const offers = await getLatestPublishedOffers();

  return offers.map((offer) => {
    const slug = `${offer.id}-${slugify(offer.store.name + '-' + offer.title)}`;
    return {
      'id': offer.id.toString(),
      'slug': slug,
    };
  });
}