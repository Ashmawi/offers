export default async function OffersPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {/* {offers.map((offer: any) => (
        <div key={offer.id} className="border p-4 rounded-lg">
          {offer.image && <img src={offer.image} alt="" className="w-full h-40 object-cover" />}
          <h3 className="font-bold">{offer.product}</h3>
          <p className="text-green-600 font-bold">{offer.price} ج.م</p>
          {offer.oldPrice && <p className="line-through text-gray-500">{offer.oldPrice} ج.م</p>}
          <p className="text-sm text-gray-600">{offer.store}</p>
        </div>
      ))} */}
    </div>
  );
}