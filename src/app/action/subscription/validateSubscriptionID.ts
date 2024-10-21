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

    const subscriptionPlanName =
      subscriptionPlan.result.object?.subscriptionPlanData
        ?.subscriptionPlanVariations?.[0].subscriptionPlanVariationData?.name as string;

    return { status: true, itemVariationId, subscriptionPlanName };
  } catch (error) {
    console.error("Error validating subscription ID: ", error);
    return { status: false, itemVariationId: null, subscriptionPlanName: null };
  }
};
