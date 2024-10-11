"use server";

import squareClient from "@/lib/square";

export const validateSubscriptionID = async (subscriptionID: string) => {
  const { catalogApi } = squareClient;

  try {
    await catalogApi.retrieveCatalogObject(subscriptionID);

    return { status: true };
  } catch (error) {
    console.error("Error validating subscription ID: ", error);
    return { status: false };
  }
};
