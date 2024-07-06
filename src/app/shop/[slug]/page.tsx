import { getSingleProduct } from "@/app/action/shop/getSingleProduct";
import { GoBackButton } from "@/components/ui/buttons";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { slug: string } }) {
  const permalink = params.slug;

  const product = await getSingleProduct({ permalink });

  if (!product.status && product.error.statusCode === 404) {
    notFound();
  }

  console.log(`${permalink}: `, product);

  return (
    <main className="pt-16 min-h-[calc(100vh-216px)] sm:min-h-[calc(100vh-180px)] lg:min-h-[calc(100vh-92px)]">
      <section className="container mx-auto py-20">
        <nav>
          <GoBackButton />{" "}
        </nav>
        <h1 className="text-center text-blue-500 text-3xl font-bold">
          {product.data?.name}
        </h1>
      </section>
    </main>
  );
}
