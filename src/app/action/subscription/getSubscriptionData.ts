import squareClient from "@/lib/square";

export const getSubscriptionData = async () => {
  try {
    const allSubscription = await squareClient.catalogApi.listCatalog(
      "",
      "SUBSCRIPTION_PLAN"
    );

    const subscriptionItemID = allSubscription.result.objects?.map(
      (subscriptionItem) => {
        return subscriptionItem.subscriptionPlanData?.eligibleItemIds?.[0];
      }
    );

    const subscriptionItems = Array.from(
      new Set(
        allSubscription.result.objects?.map(
          (subscriptionItem) =>
            subscriptionItem.subscriptionPlanData?.eligibleItemIds?.[0]
        )
      )
    );

    console.log("Subscription Items: ", subscriptionItems);
    return { status: true, error: false };
  } catch (error) {
    console.log("Error fetching subscription data: ", error);
    return { status: false, error: error as any };
  }
};
