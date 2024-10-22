"use server";

import squareClient from "@/lib/square";
import { SubscriptionCheckoutFormProps } from "../../../../type";

const generateRandomKey = () => crypto.randomUUID();

const createUser = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  addressLine1,
  addressLine2,
  state,
  city,
  zipCode,
  birthday,
}: SubscriptionCheckoutFormProps) => {
  try {
    const idempotencyKey = generateRandomKey();

    const createdUser = await squareClient.customersApi.createCustomer({
      idempotencyKey,
      givenName: firstName,
      familyName: lastName,
      emailAddress: email,
      address: {
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        locality: city,
        administrativeDistrictLevel1: state,
        postalCode: zipCode,
        country: "US", // Always US
      },
      phoneNumber: phoneNumber,
      birthday: birthday,
    });

    return createdUser.result;
  } catch (error) {
    console.error("Something went wrong while creating user: ", error);
    return null;
  }
};

const createSubscriptionOrder = async (
  customerId: string,
  catalogObjectId: string
) => {
  try {
    const idempotencyKey = generateRandomKey();
    const locationId = process.env.SQUARE_SANDBOX_LOCATION_ID ?? "";

    const response = await squareClient.ordersApi.createOrder({
      order: {
        locationId,
        customerId,
        lineItems: [
          {
            quantity: "1",
            catalogObjectId,
            itemType: "ITEM",
          },
        ],
        state: "DRAFT",
      },
      idempotencyKey,
    });

    return response.result;
  } catch (error) {
    console.error(
      "Something went wrong while creating subscription order: ",
      error
    );
    return null;
  }
};

export const checkoutSubscription = async (
  planVariationId: string,
  subscriptionItemVariationId: string,
  formData: SubscriptionCheckoutFormProps
) => {
  try {
    const idempotencyKey = generateRandomKey();
    const locationId = process.env.SQUARE_SANDBOX_LOCATION_ID ?? "";

    const createdUser = await createUser(formData);

    if (!createdUser?.customer?.id) {
      return {
        status: false,
        error: "Something went wrong while creating user.",
      };
    }

    const customerId = createdUser.customer.id;
    const customerEmail = createdUser.customer.emailAddress!;

    const createOrder = await createSubscriptionOrder(
      customerId,
      subscriptionItemVariationId
    );

    if (!createOrder) {
      return {
        status: false,
        error: "Something went wrong while creating order.",
      };
    }

    const orderTemplateId = createOrder?.order?.id!;

    const checkoutSubscriptionResponse =
      await squareClient.subscriptionsApi.createSubscription({
        idempotencyKey,
        locationId,
        planVariationId,
        customerId,
        phases: [
          {
            ordinal: BigInt("0"),
            orderTemplateId, // Generated from createOrder
          },
        ],
      });

    console.log(
      "Subscription checkout response: ",
      checkoutSubscriptionResponse.result
    );

    return {
      status: true,
      error: null,
      subscriptionData: checkoutSubscriptionResponse.result,
      customerEmail,
    };
  } catch (error) {
    console.error(
      "Something went wrong while checking out subscription: ",
      error
    );
    return {
      status: false,
      error: error,
      subscriptionData: null,
      customerEmail: null,
    };
  }
};
