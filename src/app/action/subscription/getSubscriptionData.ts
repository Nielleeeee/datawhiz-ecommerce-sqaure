import squareClient from "@/lib/square";

export const getSubscriptionData = async () => {
  const { catalogApi } = squareClient;

  try {
    const subscriptionData = await catalogApi.listCatalog(
      "",
      "SUBSCRIPTION_PLAN"
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
      subscriptionData: subscriptionData.result.objects,
    };
  } catch (error) {
    console.log("Error fetching subscription data: ", error);
    return { status: false, error: error as any };
  }
};
