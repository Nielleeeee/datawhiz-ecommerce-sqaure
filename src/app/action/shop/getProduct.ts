"use server";

import Commerce from "@chec/commerce.js";

const commerce = new Commerce(`${process.env.CHEC_PUBLIC_API_KEY}`, false, {
  allowSecretKey: true,
} as any);

export const getProducts = async () => {
  try {
    const products = await commerce.products.list();

    return { status: true, error: false, products };
  } catch (error) {
    return { status: false, error: error as any };
  }
};
