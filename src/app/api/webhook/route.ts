import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const body = await req.json();

  // Validate webhook secret
  const secret = req.headers.get("x-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { product, price, oldPrice, store, image, offerUrl } = body;

  try {
    // await turso.execute(
    //   `INSERT INTO Offer (product, price, oldPrice, store, image, offerUrl) VALUES ('${product}', ${price}, ${oldPrice || 'NULL'}, '${store}', ${image ? `'${image}'` : 'NULL'}, ${offerUrl ? `'${offerUrl}'` : 'NULL'})`
    // );

    return new Response("Offer saved!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 500 });
  }
  
}