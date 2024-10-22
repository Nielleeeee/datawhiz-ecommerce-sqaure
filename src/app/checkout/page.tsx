"use client";

import { useSearchParams } from "next/navigation";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { validateSubscriptionID } from "@/app/action/subscription/validateSubscriptionID";
import Loading from "@/app/loading";
import SubscriptionCheckoutForm from "@/components/form/subscriptionCheckoutForm";
import { GoBackButton } from "@/components/ui/buttons";

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
      const { status, itemVariationId, subscriptionPlanName } =
        await validateSubscriptionID(subscriptionID!);

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
    <main className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 px-4">
      <section className="container mx-auto py-10">
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-lg">
          <div className="flex flex-row items-center gap-4 mb-6">
            <GoBackButton />

            <div>
              <h1 className="text-2xl font-bold mb-2">
                Checkout {subscriptionPlanName}
              </h1>
              <p className="text-gray-600">
                To get started, enter your contact information.
              </p>
            </div>
          </div>

          <SubscriptionCheckoutForm
            subscriptionID={subscriptionID}
            itemVariationId={itemVariationId}
          />
        </div>
      </section>
    </main>
  );
}
