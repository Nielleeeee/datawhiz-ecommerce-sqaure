"use client";

import { useState, useEffect } from "react";
import { CircleDots } from "@/components/ui/blocks";
import Link from "next/link";
import { CatalogObject } from "square";
import parse from "html-react-parser";
import { SubscriptionCatalogObject } from "../../../type";

export default function SubscriptionCards({
  subscriptionItems,
  subscriptionData,
}: {
  subscriptionItems: CatalogObject[];
  subscriptionData: SubscriptionCatalogObject[];
}) {
  const [prices, setPrices] = useState<{
    [key: string]: { monthly: number; yearly: number };
  }>({});
  const [isYearly, setIsYearly] = useState<boolean>(false);

  useEffect(() => {
    const initialPrices: {
      [key: string]: { monthly: number; yearly: number };
    } = {};

    subscriptionItems.forEach((subscription) => {
      const priceData =
        subscription.itemData?.variations?.[0]?.itemVariationData?.priceMoney;

      const monthlyPrice =
        priceData?.amount != null ? Number(priceData.amount) / 100 : 0;

      const matchingSubscription = subscriptionData.find((subData) => {
        return (
          subData.subscriptionPlanData?.eligibleItemIds?.includes(
            subscription.id
          ) && subData.discount !== null
        );
      });

      let fixedDiscount =
        Number(
          matchingSubscription?.discount?.discountData?.amountMoney?.amount
        ) / 100 || 0;

      const yearlyPrice = monthlyPrice * 12 - fixedDiscount;

      initialPrices[subscription.id] = {
        monthly: monthlyPrice,
        yearly: yearlyPrice,
      };
    });

    setPrices(initialPrices);
  }, [subscriptionData, subscriptionItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsYearly(e.target.checked);
  };

  const SubscriptionItemCard = () => {
    return (
      <div className="w-full flex flex-wrap gap-4 justify-center items-center px-4">
        {subscriptionItems.map((subscription: CatalogObject, index) => {
          const { itemData } = subscription;

          const priceData = prices[subscription.id];

          const price = priceData
            ? isYearly
              ? priceData.yearly
              : priceData.monthly
            : "Price not available";

          return (
            <div key={index} className="flex-1 min-w-[300px] max-w-[400px]">
              <div
                className="
                flex
                flex-col
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
               h-[540px]
               shadow-sm
               "
              >
                <span className="text-primary font-semibold text-lg block mb-4">
                  {itemData?.name}
                </span>

                <h2 className="font-bold text-dark mb-5 text-4xl lg:text-5xl">
                  $ {price}
                  <span className="text-base text-body-color font-medium">
                    / {isYearly ? "year" : "month"}
                  </span>
                </h2>

                {itemData?.descriptionHtml && (
                  <div className="flex flex-col gap-4 text-black text-base font-normal mb-5">
                    {parse(itemData?.descriptionHtml)}
                  </div>
                )}

                <Link
                  href="#"
                  className={`w-full block mt-auto text-base font-semibold border border-blue-500 rounded-md text-center p-4 transition ${
                    (index + 1) % 2 === 0
                      ? "text-white bg-blue-500 hover:bg-opacity-90"
                      : "text-black hover:text-white hover:bg-blue-500"
                  }`}
                >
                  Choose {itemData?.name}
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
