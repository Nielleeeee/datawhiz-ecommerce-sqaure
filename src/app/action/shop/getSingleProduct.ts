"use server";

import squareClient from "@/lib/square";

export const getSingleProduct = async (itemID: string) => {
  try {
    const product = await squareClient.catalogApi.retrieveCatalogObject(itemID);

    if (product.result && product.result.object) {
      const productImageID = product.result.object.itemData?.imageIds
        ? product.result.object.itemData?.imageIds[0]
        : null;

      if (!productImageID) {
        return {
          status: true,
          error: false,
          data: { ...product.result.object, image: null },
        };
      }

      const productImage = await squareClient.catalogApi.retrieveCatalogObject(
        productImageID as string
      );

      const productWithImage = {
        ...product.result.object,
        image: productImage.result.object,
      };

      return { status: true, error: false, data: productWithImage };
    }

    return { status: true, error: false, data: null };
  } catch (error) {
    return { status: false, error: error as any };
  }
};
