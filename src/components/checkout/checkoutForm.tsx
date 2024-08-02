"use client";

import { CheckoutCapture } from "@chec/commerce.js/types/checkout-capture";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { useFormik } from "formik";

export default function CheckoutForm(checkoutToken: CheckoutToken) {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      cardNumber: "",
      cardName: "",
      month: "",
      year: "",
      securityCode: "",
      postalCode: "",
    },
    onSubmit: (values) => {
      const orderData: CheckoutCapture = {
        line_items: checkoutToken.line_items.reduce(
          (acc: { [key: string]: { quantity: number } }, item) => {
            acc[item.id] = { quantity: item.quantity };
            return acc;
          },
          {}
        ),
        customer: {
          email: values.email,
          firstname: values.firstName,
          lastname: values.lastName,
          phone: values.phoneNumber,
        },
        billing: {
          name: values.cardName,
          postal_zip_code: values.postalCode,
        },
        payment: {
          gateway: "test_gateway", // Change this to your actual gateway in production
          card: {
            number: values.cardNumber,
            expiry_month: values.month,
            expiry_year: values.year,
            cvc: values.securityCode,
            postal_zip_code: values.postalCode,
          },
        },
      };

      console.log("Order Data: ", orderData);
    },
  });

  return (
    <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
          Secure Checkout
          <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-10 grid grid-cols-8 gap-4"
        >
          <div className="col-span-8">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="john.capler@fang.com"
              className="mt-1 block w-full rounded border-gray-400 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="col-span-4">
            <label
              htmlFor="card-number"
              className="text-xs font-semibold text-gray-500"
            >
              Card number
            </label>

            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              placeholder="1234-5678-XXXX-XXXX"
              className="block w-full rounded border-gray-400 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="col-span-4">
            <p className="text-xs font-semibold text-gray-500">
              Expiration date
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="my-1 col-span-1">
                <label htmlFor="month" className="sr-only">
                  Select expiration month
                </label>

                <input
                  type="text"
                  id="security-code"
                  name="month"
                  onChange={formik.handleChange}
                  value={formik.values.month}
                  placeholder="Month"
                  className="rounded w-full border-gray-400 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="my-1 col-span-1">
                <label htmlFor="year" className="sr-only">
                  Select expiration year
                </label>
                <input
                  type="text"
                  id="security-code"
                  name="year"
                  onChange={formik.handleChange}
                  value={formik.values.year}
                  placeholder="Year"
                  className="rounded w-full border-gray-400 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="col-span-8">
            <div className="relative my-1">
              <label htmlFor="security-code" className="sr-only">
                Security code
              </label>
              <input
                type="text"
                id="security-code"
                name="securityCode"
                onChange={formik.handleChange}
                value={formik.values.securityCode}
                placeholder="Security code"
                className="block w-36 rounded border-gray-400 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="relative my-1">
              <label htmlFor="security-code" className="sr-only">
                Postal Code
              </label>
              <input
                type="text"
                id="security-code"
                name="postalCode"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
                placeholder="Postal code"
                className="block w-36 rounded border-gray-400 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <p className="col-span-8 mt-10 text-center text-sm font-semibold text-gray-500">
            By placing this order you agree to the{" "}
            <a
              href="#"
              className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
            >
              Terms and Conditions
            </a>
          </p>

          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="col-span-8 mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
