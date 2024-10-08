import squareClient from "@/lib/square";
import { SubscriptionCatalogObject } from "../../../../type";

export const getSubscriptionData = async () => {
  const { catalogApi } = squareClient;

  try {
    const subscriptionData = await catalogApi.listCatalog(
      "",
      "SUBSCRIPTION_PLAN"
    );

    const discountID = subscriptionData.result.objects
      ?.map(
        (subscriptionItem) =>
          subscriptionItem.subscriptionPlanData?.subscriptionPlanVariations?.[0]
            .subscriptionPlanVariationData?.phases?.[0].pricing
            ?.discountIds?.[0] as string
      )
      .filter((discount) => discount !== undefined);

    let discountData = null;

    if (discountID !== undefined && discountID.length > 0) {
      discountData = await catalogApi.batchRetrieveCatalogObjects({
        objectIds: discountID,
      });
    }

    const subscriptionDataWithDiscount = subscriptionData.result.objects?.map(
      (subscriptionItem) => {
        const planData = subscriptionItem.subscriptionPlanData;
        const variation = planData?.subscriptionPlanVariations?.[0];
        const phase = variation?.subscriptionPlanVariationData?.phases?.[0];

        // Find the matching discount
        const discountId = phase?.pricing?.discountIds?.[0];
        const discount = discountData?.result.objects?.find(
          (discountItem) => discountItem.id === discountId
        );

        return {
          ...subscriptionItem,
          discount: discount || null,
        };
      }
    );

    const subscriptionItemID = Array.from(
      new Set(
        subscriptionData.result.objects?.map(
          (subscriptionItem) =>
            subscriptionItem.subscriptionPlanData
              ?.eligibleItemIds?.[0] as string
        )
      )
    );

    const subscriptionItems = await catalogApi.batchRetrieveCatalogObjects({
      objectIds: subscriptionItemID,
    });

    return {
      status: true,
      error: false,
      subscriptionItems: subscriptionItems.result.objects,
      subscriptionData: subscriptionDataWithDiscount as SubscriptionCatalogObject[],
    };
  } catch (error) {
    console.log("Error fetching subscription data: ", error);
    return { status: false, error: error as any };
  }
};
