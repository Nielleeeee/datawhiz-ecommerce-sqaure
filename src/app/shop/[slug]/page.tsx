import { getSingleProduct } from "@/app/action/shop/getSingleProduct";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const permalink = params.slug;

  const product = await getSingleProduct({ permalink });

  if (!product.status && product.error.statusCode === 404) {
    notFound();
  }

  console.log(product);

  return <div>page</div>;
}
