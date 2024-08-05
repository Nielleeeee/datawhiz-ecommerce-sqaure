import squareClient from "@/lib/square";

export const getProducts = async () => {
  try {
    const { catalogApi } = squareClient;

    const products = await catalogApi.searchCatalogItems({
      productTypes: ["ITEM"],
    });

    if (products.result && products.result.items) {
      return { status: true, error: false, products: products.result.items };
    } else {
      return { status: false, error: "No items found" };
    }
  } catch (error) {
    return { status: false, error: error as any };
  }
};
