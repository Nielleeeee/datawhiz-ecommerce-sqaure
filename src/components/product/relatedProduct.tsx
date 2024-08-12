import Image from "next/image";
import Link from "next/link";
import { CatalogObject } from "square";

export default function RelatedProduct({
  relatedProductsData,
}: {
  relatedProductsData: {
    itemData: CatalogObject;
    imageData: CatalogObject | null | undefined;
  }[];
}) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Related Products
        </h2>

        <Link href={`/shop`} className="text-blue-700">
          View All →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {relatedProductsData.map((relatedProduct, index: number) => {
          const { itemData, imageData } = relatedProduct;
          const relatedProductName = itemData?.itemData?.name as string;

          const permalink = relatedProductName
            ? `${relatedProductName.toLowerCase().replace(/\s+/g, "-")}-${
                itemData.id
              }`
            : null;

          const relatedProductPrice =
            itemData.itemData!.variations?.[0]?.itemVariationData?.priceMoney
              ?.amount != null
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    itemData.itemData!.variations[0].itemVariationData
                      .priceMoney.currency || "USD",
                }).format(
                  Number(
                    itemData.itemData!.variations[0].itemVariationData
                      .priceMoney.amount
                  ) / 100
                )
              : "Price not available";

          return (
            <Link
              href={`/shop/${permalink}`}
              key={index}
              className="group relative"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <Image
                  alt={relatedProductName}
                  src={`${imageData?.imageData?.url}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full transition scale-110 group-hover:scale-100"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <h3 className="text-sm text-gray-700">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {relatedProductName}
                </h3>

                <p className="text-sm font-medium text-gray-900">
                  {relatedProductPrice}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
