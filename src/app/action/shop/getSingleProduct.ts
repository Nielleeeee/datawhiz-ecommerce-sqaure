"use server";

import Commerce from "@chec/commerce.js";

const commerce = new Commerce(`${process.env.CHEC_PUBLIC_API_KEY}`);

export const getSingleProduct = async ({
  permalink,
}: {
  permalink: string;
}) => {
  try {
    const product = await commerce.products.retrieve(permalink, {
      type: "permalink",
    });

    console.log(product);

    return { status: true, error: false, data: product };
  } catch (error) {
    return { status: false, error: error as any };
  }
};
