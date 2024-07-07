import ProductCard from "@/components/product/productCard";
import { getProducts } from "@/app/action/shop/getProduct";

export default async function Shop() {
  const { products } = await getProducts();

  const ProductList = () => {
    if (products && products.data.length !== 0) {
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.data.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      );
    } else {
      return (
        <h2 className="text-center py-20 md:py-40 font-semibold text-xl md:text-2xl">
          No Product Available...
        </h2>
      );
    }
  };

  return (
    <main className="pt-16 min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)]">
      <h1 className="text-center py-10 text-5xl font-bold text-blue-500">
        Shop
      </h1>

      <section className="container mx-auto px-4 pt-10 pb-20">
        <ProductList />
      </section>
    </main>
  );
}
