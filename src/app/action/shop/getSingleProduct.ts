"use server";

import squareClient from "@/lib/square";
import { CatalogObject } from "square";

interface ProductData {
  item: CatalogObject | null;
  image?: CatalogObject | null;
  category?: CatalogObject | null;
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

    let returnProduct: ReturnProduct = {
      status: true,
      error: false,
      data: { item: product.result.object, image: null, category: null },
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
