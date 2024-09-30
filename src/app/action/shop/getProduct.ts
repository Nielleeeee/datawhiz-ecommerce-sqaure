"use server";

import squareClient from "@/lib/square";
import { InventoryCount } from "../../../../type";

export const getProducts = async () => {
  try {
    const { catalogApi, inventoryApi } = squareClient;

    const products = await catalogApi.listCatalog("", "ITEM");

    if (
      products.result &&
      products.result.objects &&
      products.result.objects.length > 0
    ) {
      const catalogObjectIds = products.result.objects.map(
        (product) => product.itemData?.variations?.[0]?.id!
      );

      // Retrieve inventory counts for all catalog items
      const batchRetrieveInventoryCounts =
        await inventoryApi.batchRetrieveInventoryCounts({
          catalogObjectIds,
        });

      const inventoryCounts: InventoryCount =
        batchRetrieveInventoryCounts.result.counts!.reduce(
          (acc, count) =>
            ({
              ...acc,
              [count.catalogObjectId!]: count.quantity,
            } as InventoryCount),
          {} as InventoryCount
        );

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

      const productWithImagesAndStock = products.result.objects.map(
        (product, index) => {
          return {
            ...product,
            image: productImages[index],
            itemData: {
              ...product.itemData,
              variations: product.itemData?.variations?.map((variation) => ({
                ...variation,
                stockData: inventoryCounts[variation.id] ?? 0, // Attach stock data here
              })),
            },
          };
        }
      );

      return {
        status: true,
        error: false,
        products: productWithImagesAndStock,
      };
    } else {
      return { status: false, error: "No items found", products: [] };
    }
  } catch (error) {
    console.error(error);
    return { status: false, error: error as any };
  }
};
