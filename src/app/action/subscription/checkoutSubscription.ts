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

    console.log(createdUser.result);

    // Sample Response
    // {
    //   "customer": {
    //     "id": "9CVXF6M34X0JHJN1CY5FAX6TBG",
    //     "created_at": "2024-10-14T19:51:04.489Z",
    //     "updated_at": "2024-10-14T19:51:04Z",
    //     "given_name": "test",
    //     "family_name": "email",
    //     "email_address": "testemail@gmail.com",
    //     "address": {
    //       "address_line_1": "sample",
    //       "address_line_2": "sample 2",
    //       "locality": "Tampa",
    //       "administrative_district_level_1": "Florida",
    //       "postal_code": "1234",
    //       "country": "US"
    //     },
    //     "preferences": {
    //       "email_unsubscribed": false
    //     },
    //     "creation_source": "THIRD_PARTY",
    //     "birthday": "2001-09-19",
    //     "version": 0
    //   }
    // }

    return createdUser.result;
  } catch (error) {
    console.error("Something went wrong while creating user: ", error);
    return null;
  }
};

// const createSubscriptionOrder = async () => {
//   try {
//     return
//   } catch (error) {
//     console.error("Something went wrong while creating subscription order: ", error);
//     return
//   }
// }

export const checkoutSubscription = async (
  planVariationId: string,
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

    const checkoutSubscriptionResponse =
      await squareClient.subscriptionsApi.createSubscription({
        idempotencyKey,
        locationId,
        planVariationId,
        customerId,
        // phases: [
        //   {
        //     ordinal: 0,
        //     orderTemplateId: orderTemplateId, // Generated from createOrder
        //     planPhaseUid: 'CGEKSJH4POVE6EHPUAXALGFD'
        //   }
        // ]
      });

    return {
      status: true,
      error: null,
      subscriptionData: checkoutSubscriptionResponse.result,
    };
  } catch (error) {
    console.error(
      "Something went wrong while checking out subscription: ",
      error
    );
    return { status: false, error: error };
  }
};
