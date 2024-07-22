import commerce from "@/lib/commerce";

export const getProducts = async () => {
  try {
    const products = await commerce.products.list();

    return { status: true, error: false, products };
  } catch (error) {
    return { status: false, error: error as any };
  }
};
