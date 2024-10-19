"use server";

import squareClient from "@/lib/square";

export const validateSubscriptionID = async (subscriptionID: string) => {
  const { catalogApi } = squareClient;

  try {
    const subscriptionPlanVariation = await catalogApi.retrieveCatalogObject(
      subscriptionID
    );

    const subscriptionPlanId =
      subscriptionPlanVariation.result.object?.subscriptionPlanVariationData
        ?.subscriptionPlanId!;

    const subscriptionPlan = await catalogApi.retrieveCatalogObject(
      subscriptionPlanId
    );

    const itemId =
      subscriptionPlan.result.object?.subscriptionPlanData
        ?.eligibleItemIds?.[0]!;

    const subscriptionItem = await catalogApi.retrieveCatalogObject(itemId);

    const itemVariationId =
      subscriptionItem.result.object?.itemData?.variations?.[0]!.id!;

    return { status: true, itemVariationId };
  } catch (error) {
    console.error("Error validating subscription ID: ", error);
    return { status: false, itemVariationId: null };
  }
};
