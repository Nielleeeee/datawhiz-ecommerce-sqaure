"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import { validateCheckoutToken } from "@/app/action/checkout/checkout";
import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import Image from "next/image";
import CheckoutForm from "@/components/checkout/checkoutForm";
import Loading from "@/app/loading";
import SupportDetails from "@/components/checkout/supportDetails";

export default function Checkout() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);
  const [checkoutToken, setCheckoutToken] = useState<CheckoutToken | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const { valid, checkout } = await validateCheckoutToken(token as string);

      if (!valid) {
        router.push("/404");
      } else {
        console.log("Checkout: ", checkout);
        setCheckoutToken(checkout);
        setLoading(false);
      }
    };

    validateToken();
  }, [router, token]);

  if (!token) {
    notFound();
  }

  if (loading) {
    return <Loading />;
  }

  const OrderSummary = () => {
    return checkoutToken?.line_items.map((item: any, index: number) => {
      return (
        <li key={index} className="flex justify-between">
          <div className="inline-flex">
            <Image
              src={item.image?.url}
              alt={item.name}
              width={100}
              height={100}
              className="max-h-16 rounded-md"
            />
            <div className="ml-3">
              <p className="text-base font-semibold text-white">{item.name}</p>
              <p className="text-sm font-medium text-white text-opacity-80">
                Quantity: {item.quantity}
              </p>
            </div>
          </div>
          <p className="text-sm font-semibold text-white">
            {item.price.formatted_with_symbol}
          </p>
        </li>
      );
    });
  };

  const totalPrice =
    checkoutToken?.line_items.reduce((accumulator, item) => {
      return accumulator + item.price.raw;
    }, 0) || 0;

  const vat = (checkoutToken as any).tax.amount.raw;

  const totalVatPrice = totalPrice + vat;

  const formattedTotalPrice = totalVatPrice.toFixed(2);

  return (
    <main className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <CheckoutForm />

        <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            <img
              src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
          </div>

          <div className="relative">
            <ul className="space-y-5">
              <OrderSummary />
            </ul>

            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>

            <div className="space-y-2">
              <p className="flex justify-between text-sm font-medium text-white">
                <span>Price</span>
                <span>${formattedTotalPrice}</span>
              </p>

              <p className="flex justify-between text-sm font-medium text-white">
                <span>Vat</span>
                <span>${vat.toFixed(2)}</span>
              </p>

              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>${formattedTotalPrice}</span>
              </p>
            </div>
          </div>

          <SupportDetails />
        </div>
      </div>
    </main>
  );
}
