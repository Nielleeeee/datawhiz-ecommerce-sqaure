"use server";

import squareClient from "@/lib/square";
import { OrderLineItem } from "square";

const locationId = process.env.SQUARE_SANDBOX_LOCATION_ID ?? "";
const redirectUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DEVELOPMENT_BASE_URL
    : process.env.PRODUCTION_BASE_URL;

export const createPaymentLink = async (lineItems: OrderLineItem[]) => {
  if (!locationId) {
    return { status: false, error: "Location ID not found" };
  }

  try {
    const response = await squareClient.checkoutApi.createPaymentLink({
      order: {
        locationId,
        lineItems,
      },
      checkoutOptions: {
        redirectUrl,
        askForShippingAddress: true,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
          afterpayClearpay: true,
        },
      },
    });

    console.log("Payment Link: ", response.result.paymentLink);

    return {
      status: true,
      error: false,
      paymentLink: response.result.paymentLink,
    };
  } catch (error) {
    console.error("Error creating payment link: ", error);
    return { status: false, error: error as any };
  }
};
