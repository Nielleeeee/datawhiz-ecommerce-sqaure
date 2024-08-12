"use server";

import squareClient from "@/lib/square";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const getRelatedProducts = async (
  itemID: string,
  categoryID: string
) => {
  try {
    const categoryProducts = await squareClient.catalogApi.searchCatalogObjects(
      {
        objectTypes: ["ITEM"],
        query: {
          exactQuery: {
            attributeName: "category_id",
            attributeValue: categoryID,
          },
        },
      }
    );

    const relatedProducts = shuffleArray(
      categoryProducts.result.objects?.filter((item) => item.id !== itemID) ||
        []
    ).slice(0, 4);

    let relatedProductsWithImage = [];

    for (const product of relatedProducts!) {
      const firstImageID = product.itemData?.imageIds?.[0];

      let imageData = null;

      if (firstImageID) {
        const productImage =
          await squareClient.catalogApi.retrieveCatalogObject(firstImageID);

        imageData = productImage.result.object;
      }

      relatedProductsWithImage.push({ itemData: product, imageData });
    }

    return {
      status: true,
      error: false,
      data: relatedProductsWithImage,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
      data: null,
    };
  }
};
