"use server";

import squareClient from "@/lib/square";

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

      console.log(
        "Inventory Count: ",
        batchRetrieveInventoryCounts.result.counts
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

      const productWithImages = products.result.objects.map(
        (product, index) => {
          return { ...product, image: productImages[index] };
        }
      );

      return { status: true, error: false, products: productWithImages };
    } else {
      return { status: false, error: "No items found", products: [] };
    }
  } catch (error) {
    console.error(error);
    return { status: false, error: error as any };
  }
};

// Get batch inventory counts
// try {
//   const response = await client.inventoryApi.batchRetrieveInventoryCounts({
//     catalogObjectIds: [
//       'someid1',
//       'someid2',
//       'someid3'
//     ]
//   });

//   console.log(response.result);
// } catch(error) {
//   console.log(error);
// }
