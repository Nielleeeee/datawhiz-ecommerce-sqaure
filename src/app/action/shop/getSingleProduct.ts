import commerce from "@/lib/commerce";

export const getSingleProduct = async ({
  permalink,
}: {
  permalink: string;
}) => {
  try {
    const product = await commerce.products.retrieve(permalink, {
      type: "permalink",
    });

    return { status: true, error: false, data: product };
  } catch (error) {
    return { status: false, error: error as any };
  }
};
