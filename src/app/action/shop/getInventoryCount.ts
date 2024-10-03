"use server";

import squareClient from "@/lib/square";

export const getBatchInventoryCount = async (catalogObjectIds: string[]) => {
  try {
    const batchRetrieveInventoryCounts =
      await squareClient.inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds,
      });

    return batchRetrieveInventoryCounts;
  } catch (error) {
    console.error("Error fetching inventory counts: ", error);
    throw error;
  }
};
