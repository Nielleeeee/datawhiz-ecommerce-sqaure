"use server";

import squareClient from "@/lib/square";

export const getProducts = async () => {
  try {
    const { catalogApi } = squareClient;

    const products = await catalogApi.listCatalog("", "ITEM");

    if (
      products.result &&
      products.result.objects &&
      products.result.objects.length > 0
    ) {
      const productImages = await Promise.all(
        products.result.objects.map(async (product) => {
          if (
            product.itemData &&
            product.itemData.imageIds &&
            product.itemData.imageIds.length > 0
          ) {
            const imageId = product.itemData.imageIds[0];
            const imageResponse = await catalogApi.retrieveCatalogObject(
              imageId
            );
            return imageResponse.result.object;
          }
          return null;
        })
      );

      const productWithImages = products.result.objects.map(
        (product, index) => {
          return { ...product, image: productImages[index] };
        }
      );

      console.log("Product with images:", productWithImages);

      return { status: true, error: false, products: productWithImages };
    } else {
      return { status: false, error: "No items found", products: [] };
    }
  } catch (error) {
    return { status: false, error: error as any };
  }
};
