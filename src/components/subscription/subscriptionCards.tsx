"use client";

import { CircleDots } from "@/components/ui/blocks";
import Link from "next/link";
import { useState } from "react";
import { CatalogObject } from "square";

export default function SubscriptionCards({
  subscriptionItems,
  subscriptionData,
}: {
  subscriptionItems: CatalogObject[];
  subscriptionData: CatalogObject[];
}) {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsYearly(e.target.checked);
  };

  console.log("Subscription Data", subscriptionData);

  const SubscriptionItemCard = () => {
    return (
      <div className="flex flex-wrap justify-center">
        {subscriptionItems.map((subscription: CatalogObject, index) => {
          const { itemData } = subscription;

          const itemPrice =
            itemData?.variations?.[0]?.itemVariationData?.priceMoney?.amount !=
            null
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    itemData.variations[0].itemVariationData.priceMoney
                      .currency || "USD",
                }).format(
                  Number(
                    itemData.variations[0].itemVariationData.priceMoney.amount
                  ) / 100
                )
              : "Price not available";

          return (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div
                className="
               bg-white
               rounded-xl
               relative
               z-10
               overflow-hidden
               border border-primary border-opacity-20
               shadow-pricing
               py-10
               px-8
               sm:p-12
               lg:py-10 lg:px-6
               xl:p-12
               mb-10
               "
              >
                <span className="text-primary font-semibold text-lg block mb-4">
                  {subscription.itemData?.name}
                </span>

                <h2 className="font-bold text-dark mb-5 text-[42px]">
                  {itemPrice}
                  <span className="text-base text-body-color font-medium">
                    / {isYearly ? "year" : "month"}
                  </span>
                </h2>

                <p className="text-base text-body-color pb-8 mb-8 border-b border-[#F2F2F2]">
                  Perfect for using in a personal website or a client project.
                </p>

                <div className="mb-7">
                  <p className="text-base text-body-color leading-loose mb-1">
                    1 User
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    All UI components
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Lifetime access
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Free updates
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    Use on 1 (one) project
                  </p>
                  <p className="text-base text-body-color leading-loose mb-1">
                    3 Months support
                  </p>
                </div>

                <Link
                  href="#"
                  className={`w-full block text-base font-semibold border border-blue-500 rounded-md text-center p-4 transition ${
                    (index + 1) % 2 === 0
                      ? "text-white bg-blue-500 hover:bg-opacity-90"
                      : "text-black hover:text-white hover:bg-blue-500"
                  }`}
                >
                  Choose {subscription.itemData?.name}
                </Link>

                <CircleDots />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-end items-center gap-4 pb-8 px-4">
        <span className="capitalize">
          {isYearly ? "Yearly (save at least 16% off)" : "Monthly"}
        </span>
        <label
          htmlFor="billingToggle"
          className="relative select-none inline-block h-7 w-[48px] cursor-pointer rounded-full bg-gray-900 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[#1976D2]"
        >
          <input
            type="checkbox"
            id="billingToggle"
            className="peer sr-only"
            checked={isYearly}
            onChange={handleChange}
          />
          <span className="absolute inset-y-0 start-0 m-1 size-5 rounded-full ring-[5px] ring-inset ring-white transition-all peer-checked:start-7 bg-gray-900 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
        </label>
      </div>

      <SubscriptionItemCard />
    </>
  );
}
