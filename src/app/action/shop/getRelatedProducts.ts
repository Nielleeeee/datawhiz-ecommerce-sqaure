"use server";

import squareClient from "@/lib/square";

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

    const relatedProducts = categoryProducts.result.objects?.filter(
      (item) => item.id !== itemID
    );

    return {
      status: true,
      error: false,
      data: relatedProducts,
    };
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
};
