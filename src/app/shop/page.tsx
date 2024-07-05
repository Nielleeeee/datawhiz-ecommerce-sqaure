import ProductCard from "@/components/product/productCard";
import { getProducts } from "@/app/action/shop/getProduct";
import { ProductCollection } from "@chec/commerce.js/features/products";

export default async function Shop() {
  const products = (await getProducts()) as ProductCollection;

  return (
    <main className="pt-16">
      <h1 className="text-center py-10 text-5xl font-bold text-blue-500">
        Shop
      </h1>

      <section className="container mx-auto px-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10 pb-20">
        {products.data.map((product, index: number) => (
          <ProductCard key={index} {...product} />
        ))}
      </section>
    </main>
  );
}
