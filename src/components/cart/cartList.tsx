"use client";

import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { toast } from "react-toastify";
import Link from "next/link";
import TruckLoading from "@/components/loaders/truckLoading";
import { ShopIllustration } from "@/components/ui/svg";
import { useState } from "react";

export default function CartItems() {
  const { cart, removeToCart, updateCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  const handleRemoveToCart = async (lineID: string) => {
    const response = removeToCart(lineID);

    await toast.promise(response, {
      pending: "Removing item... 🙄",
      success: "Item Removed from Cart. 👌",
      error: "Something went wrong. 😱",
    });
  };

  const LineItems = () => {

    const handleQuantityChange = async (lineID: string, quantity: number) => {
      const response = updateCart(lineID, quantity);

      await toast.promise(response, {
        pending: "Updating Cart... 🙄",
        success: "Cart Updated. 👌",
        error: "Something went wrong. 😱",
      });
    };

    if (cart && cart.line_items.length > 0) {
      return (
        <ul className="space-y-4">
          {cart.line_items.map((item: LineItem, index: number) => (
            <li key={index} className="flex items-center gap-2 sm:gap-4">
              <Image
                src={`${item.image?.url}`}
                alt={item.name}
                width={100}
                height={100}
                className="size-16 rounded object-cover"
              />

              <div>
                <h3 className="text-sm text-gray-900">{item.name}</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">Price:</dt>
                    <dd className="inline">
                      {item.price.formatted_with_symbol}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <label htmlFor={`quantity-${index}`} className="sr-only">
                  {" "}
                  Quantity{" "}
                </label>

                <div className="flex items-center rounded border border-gray-200">
                  <button
                    type="button"
                    className="flex items-center justify-center h-8 w-8 sm:w-10 leading-10 text-gray-600 transition hover:opacity-75"
                  >
                    &minus;
                  </button>

                  <input
                    type="number"
                    value={item.quantity}
                    id={`quantity-${index}`}
                    onChange={() => console.log("quantity change")}
                    className="remove-arrow h-8 sm:h-10 w-8 sm:w-16 border-transparent text-center [-moz-appearance:_textfield] text-xs sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <button
                    type="button"
                    className="flex items-center justify-center h-8 w-8 sm:w-10 leading-10 text-gray-600 transition hover:opacity-75"
                  >
                    &#43;
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveToCart(item.id)}
                  className="text-gray-600 transition hover:text-red-600"
                >
                  <span className="sr-only">Remove item</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <>
          <ShopIllustration />
          <h2 className="text-center font-medium text-2xl md:text-3xl text-blue-500 mt-10">
            No item atm...
          </h2>
        </>
      );
    }
  };

  const CheckoutSection = () => {
    if (cart && cart.line_items.length > 0) {
      return (
        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
          <div className="w-screen max-w-lg space-y-4">
            <dl className="space-y-0.5 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{cart?.subtotal.formatted_with_symbol}</dd>
              </div>

              <div className="flex justify-between">
                <dt>VAT</dt>
                <dd>0</dd>
              </div>

              {/* <div className="flex justify-between">
              <dt>Discount</dt>
              <dd>-£20</dd>
            </div> */}

              <div className="flex justify-between !text-base font-medium">
                <dt>Total</dt>
                <dd>{cart?.subtotal.formatted_with_symbol}</dd>
              </div>
            </dl>

            {/* <div className="flex justify-end">
            <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="-ms-1 me-1.5 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                />
              </svg>
  
              <p className="whitespace-nowrap text-xs">2 Discounts Applied</p>
            </span>
          </div> */}

            <div className="flex justify-end">
              <Link
                href={`${cart?.hosted_checkout_url}`}
                className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      );
    }
  };

  if (!cart) {
    return <TruckLoading />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <LineItems />

      <CheckoutSection />
    </div>
  );
}
