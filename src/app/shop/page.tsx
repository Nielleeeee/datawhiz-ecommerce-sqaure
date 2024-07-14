import ProductCard from "@/components/product/productCard";
import { getProducts } from "@/app/action/shop/getProduct";
import { ShopIllustration } from "@/components/ui/svg";

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
        <>
          <ShopIllustration />
          <h2 className="text-center font-medium text-2xl md:text-3xl text-blue-500 mt-10">
            No Product Available...
          </h2>
        </>
      );
    }
  };

  return (
    <main className="pt-16 min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)]">
      <h1 className="text-center py-5 md:py-10 text-3xl md:text-5xl font-bold text-blue-500">
        Shop
      </h1>

      <section className="container mx-auto px-4 pt-5 md:pt-10 pb-10 md:pb-20">
        <ProductList />
      </section>
    </main>
  );
}
