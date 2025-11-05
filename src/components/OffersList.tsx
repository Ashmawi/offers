import OfferCard from "./OfferCard";
import { CatalogWithStore } from "@/db/types";

type Props = {
  initialOffers: CatalogWithStore[];
  initialCursor: number | null;
};

export default function OffersList({ initialOffers, initialCursor }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialOffers.map((catalog) => (
          <OfferCard key={catalog.id} catalog={catalog} />
        ))}
      </div>
    </div>
  );
  
}