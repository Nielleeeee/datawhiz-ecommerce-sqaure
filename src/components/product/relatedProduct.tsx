import Image from "next/image";
import Link from "next/link";

// Function to shuffle an array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function RelatedProduct({
  relatedProductsData,
}: {
  relatedProductsData: any[];
}) {
  const displayedProducts = shuffleArray([...relatedProductsData]).slice(0, 4);

  return (
    <section className=" px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Related Products
        </h2>

        <Link href={`/shop`} className="text-blue-700">
          View All →
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {displayedProducts.map((relatedProduct, index: number) => (
          <Link
            href={`/shop/${relatedProduct.permalink}`}
            key={index}
            className="group relative"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
              <Image
                alt={relatedProduct.name}
                src={relatedProduct.image.url}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full transition scale-110 group-hover:scale-100"
                width={300}
                height={300}
              />
            </div>

            <div className="mt-4 flex justify-between">
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                {relatedProduct.name}
              </h3>

              <p className="text-sm font-medium text-gray-900">
                {relatedProduct.price.formatted_with_symbol}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
