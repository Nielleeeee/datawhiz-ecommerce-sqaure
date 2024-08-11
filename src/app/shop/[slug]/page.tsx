import { getSingleProduct } from "@/app/action/shop/getSingleProduct";
import ProductDetails from "@/components/product/productDetails";
import RelatedProduct from "@/components/product/relatedProduct";
import { GoBackButton } from "@/components/ui/buttons";
import { notFound } from "next/navigation";
import { getRelatedProducts } from "@/app/action/shop/getRelatedProducts";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const itemID = slug.split("-").pop();

  const product = await getSingleProduct(itemID as string);
  const productData = product.data;

  const itemData = productData?.item?.itemData;
  const itemImage = productData?.image;
  const itemCategory = productData?.category?.categoryData;
  const variationStocks = productData?.variationStocks;

  let relatedProductsData;

  if (itemData?.reportingCategory) {
    const relatedProduct = await getRelatedProducts(
      productData?.item?.id!,
      itemData?.reportingCategory?.id!
    );

    // push to relatedProductsData
  }

  if (
    !product.status ||
    !product.data ||
    !itemData ||
    !itemImage ||
    !variationStocks
  ) {
    notFound();
  }

  // const hasRelatedProducts =
  //   Array.isArray(productData.related_products) &&
  //   productData.related_products.length > 0;

  return (
    <main className="pt-16 flex items-center justify-center">
      <section className="container mx-auto py-6 h-max">
        <nav className="px-4">
          <GoBackButton />{" "}
        </nav>

        <ProductDetails
          itemID={itemID as string}
          itemData={itemData}
          image={itemImage}
          category={itemCategory}
          variationStocks={variationStocks}
        />

        {/* {hasRelatedProducts && (
          <RelatedProduct relatedProductsData={productData.related_products} />
        )} */}
      </section>
    </main>
  );
}
