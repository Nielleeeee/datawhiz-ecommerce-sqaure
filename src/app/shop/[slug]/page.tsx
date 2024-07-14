import { getSingleProduct } from "@/app/action/shop/getSingleProduct";
import ProductDetails from "@/components/product/productDetails";
import { GoBackButton } from "@/components/ui/buttons";
import { Product } from "@chec/commerce.js/types/product";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const permalink = params.slug;

  const product = await getSingleProduct({ permalink });
  const productData = product.data as Product;

  if (!product.status && product.error.statusCode === 404) {
    notFound();
  }

  return (
    <main className="pt-16 flex items-center justify-center min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)]">
      <section className="container mx-auto py-6 h-max">
        <nav className="px-4">
          <GoBackButton />{" "}
        </nav>

        <ProductDetails {...productData} />
      </section>
    </main>
  );
}
