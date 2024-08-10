"use server";

import squareClient from "@/lib/square";
import { CatalogObject } from "square";

interface ProductData {
  item: CatalogObject | null;
  image?: CatalogObject | null;
  category?: CatalogObject | null;
  variationStocks: Record<string, number>;
}

type ReturnProduct = {
  status: boolean;
  error: false;
  data: ProductData | null;
};

export const getSingleProduct = async (itemID: string) => {
  try {
    const product = await squareClient.catalogApi.retrieveCatalogObject(itemID);

    if (!product.result?.object) {
      return { status: true, error: false, data: null };
    }

    const productImageID =
      product.result.object?.itemData?.imageIds?.[0] || null;
    const productCategoryID =
      product.result.object?.itemData?.reportingCategory?.id;

    const variantsID = product.result.object.itemData?.variations;

    const variationStocks: Record<string, number> = {};

    for (const variant of variantsID!) {
      const stockResponse = await squareClient.inventoryApi.retrieveInventoryCount(variant.id);
      const stockData = stockResponse.result.counts;

      if (stockData && stockData.length > 0) {
        variationStocks[variant.id] = Number(stockData[0].quantity || 0);
      }
    }

    let returnProduct: ReturnProduct = {
      status: true,
      error: false,
      data: { item: product.result.object, image: null, category: null, variationStocks },
    };

    if (productImageID) {
      const productImage = await squareClient.catalogApi.retrieveCatalogObject(
        productImageID as string
      );

      returnProduct.data!.image = productImage.result.object;
    }

    if (productCategoryID) {
      const productCategory =
        await squareClient.catalogApi.retrieveCatalogObject(
          productCategoryID as string
        );

      returnProduct.data!.category = productCategory.result.object;
    }

    return returnProduct;
  } catch (error) {
    return {
      status: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    };
  }
};
