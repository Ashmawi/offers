import { getOfferById } from '@/lib/queries';
import { notFound } from 'next/navigation';

interface Props {
  params: { 'id': string; 'slug': string };
}

export default async function OfferPage({ params }: Props) {


  // console.log(params);
  

  // const [id, ...slugParts] = params.slug.split('-');

  // const id = Number(params.id);

  // console.log(slugParts);
  // console.log(params.slug);
  
  // const catalog = await getOfferById(id);
  
  // if (!catalog) return notFound();

  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold">{catalog.title}</h1>
      <p className="text-gray-600">المتجر: {catalog.store.name}</p> */}
    </div>
  );
}