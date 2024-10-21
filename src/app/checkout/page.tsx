"use client";

import { useSearchParams } from "next/navigation";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateSubscriptionID } from "@/app/action/subscription/validateSubscriptionID";
import Loading from "@/app/loading";
import SubscriptionCheckoutForm from "@/components/form/subscriptionCheckoutForm";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [itemVariationId, setItemVariationId] = useState<string>("");
  const [subscriptionPlanName, setSubscriptionPlanName] = useState<string>("");

  const subscriptionID = searchParams.get("subscriptionID");

  if (!subscriptionID) {
    notFound();
  }

  useEffect(() => {
    async function checkSubscritionID() {
      const { status, itemVariationId, subscriptionPlanName } = await validateSubscriptionID(
        subscriptionID!
      );

      if (status && itemVariationId) {
        setIsValid(true);
        setItemVariationId(itemVariationId);
        setSubscriptionPlanName(subscriptionPlanName);
      } else {
        router.push("/404");
      }
    }

    checkSubscritionID().finally(() => setIsLoading(false));
  }, [subscriptionID, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isValid) {
    return null;
  }

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <section className="container mx-auto py-10">
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Checkout {subscriptionPlanName}</h1>
          <p className="text-gray-600 mb-6">
            To get started, enter your contact information.
          </p>

          <SubscriptionCheckoutForm
            subscriptionID={subscriptionID}
            itemVariationId={itemVariationId}
          />
        </div>
      </section>
    </main>
  );
}
