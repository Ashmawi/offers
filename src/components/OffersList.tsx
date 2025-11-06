"use client";

import OfferCard from "./OfferCard";
import { CatalogWithStore } from "@/db/types";
import { useState } from "react";

type Props = {
  initialOffers: CatalogWithStore[];
  initialCursor: number | null;
};

export default function OffersList({ initialOffers, initialCursor }: Props) {
  const LIMIT = 12;
  const [offers, setOffers] = useState<CatalogWithStore[]>(initialOffers);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMore() {
    if (!cursor || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/offers?cursor=${cursor}&limit=${LIMIT}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('فشل في جلب المزيد من العروض');
      const data: { items: CatalogWithStore[]; nextCursor: number | null } = await res.json();
      setOffers((prev) => [...prev, ...data.items]);
      setCursor(data.nextCursor);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offers.map((catalog) => (
          <OfferCard key={catalog.id} catalog={catalog} />
        ))}
      </div>

      {error && (
        <div className="text-center text-red-600 mt-6">{error}</div>
      )}

      <div className="flex justify-center mt-10">
        {cursor ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "...جاري التحميل" : "تحميل المزيد"}
          </button>
        ) : (
          <span className="text-gray-500">لا توجد عناصر أخرى</span>
        )}
      </div>
    </div>
  );
}