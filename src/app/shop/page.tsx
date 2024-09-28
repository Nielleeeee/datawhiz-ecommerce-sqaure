import ProductCard from "@/components/product/productCard";
import { getProducts } from "@/app/action/shop/getProduct";
import { ShopIllustration } from "@/components/ui/svg";
import { CatalogItem, CatalogObject } from "square";

export default async function Shop() {
  const { products } = await getProducts();

  // console.log("Products: ", products);

  const ProductList = () => {
    if (products && products.length > 0) {
      return (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              itemID={product.id}
              itemData={product.itemData as CatalogItem}
              image={product.image as CatalogObject}
              variationStocks={{ "123123": 10 }} //Change this to the variation stocks
            />
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
    <main className="pt-16">
      <h1 className="text-center py-5 md:py-10 text-3xl md:text-5xl font-bold text-blue-500">
        Shop
      </h1>

      <section className="container mx-auto px-4 pt-5 md:pt-10 pb-10 md:pb-20">
        <ProductList />
      </section>
    </main>
  );
}
