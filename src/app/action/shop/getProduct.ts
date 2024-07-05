"use server";

import Commerce from "@chec/commerce.js";

const commerce = new Commerce(`${process.env.CHEC_PUBLIC_API_KEY}`);

export const getProducts = async () => {
  const products = await commerce.products.list();
  return products;
};
