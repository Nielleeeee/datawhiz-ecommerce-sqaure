"use client";

import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { toast } from "react-toastify";
import Link from "next/link";
import TruckLoading from "@/components/loaders/truckLoading";
import { ShopIllustration, Trash } from "@/components/ui/svg";
import { useState, useEffect, useRef } from "react";
import { generateCartCheckoutToken } from "@/app/action/checkout/generateCheckoutToken";
import { useRouter } from "next/navigation";

export default function CartItems() {
  const { cart, removeToCart, updateCart, emptyCart } = useCart();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingItemID, setUpdatingItemID] = useState<string | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const router = useRouter();

  useEffect(() => {
    if (cart) {
      const initialQuantities: { [key: string]: number } = {};

      cart.line_items.forEach((item) => {
        initialQuantities[item.id] = item.quantity;
      });

      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleCheckout = async () => {
    try {
      if (cart) {
        const token = generateCartCheckoutToken(cart);

        await toast
          .promise(token, {
            pending: "Checking out... 🙄",
            success: "Redirecting. 👌",
            error: "Something went wrong. 😱",
          })
          .then((token) => {
            router.push(`/checkout?token=${token.id}`);
          });
      }
    } catch (error) {
      console.error("Handle Checkout Error: ", error);
      throw Error;
    }
  };

  const handleQuantityChange = (lineID: string, newQuantity: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (newQuantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [lineID]: newQuantity,
      }));

      setUpdatingItemID(lineID);

      requestAnimationFrame(() => {
        if (inputRefs.current[lineID]) {
          inputRefs.current[lineID]?.focus();
        }
      });

      debounceTimeout.current = setTimeout(async () => {
        updateQuantity(lineID, newQuantity);
      }, 800);
    }
  };

  const updateQuantity = async (lineID: string, quantity: number) => {
    try {
      setIsUpdating(true);

      const response = updateCart(lineID, quantity);

      await toast.promise(response, {
        pending: "Updating Cart... 🙄",
        success: "Cart Updated. 👌",
        error: "Something went wrong. 😱",
      });
    } catch (error) {
      throw Error(`Error: ${error}`);
    } finally {
      setIsUpdating(false);
      setUpdatingItemID(null);
    }
  };

  const handleEmptyCart = async () => {
    const response = emptyCart();

    await toast.promise(response, {
      pending: "Clearing cart... 🙄",
      success: "Cart emptied. 👌",
      error: "Something went wrong. 😱",
    });
  };

  const handleRemoveToCart = async (lineID: string) => {
    const response = removeToCart(lineID);

    await toast.promise(response, {
      pending: "Removing item... 🙄",
      success: "Item Removed from Cart. 👌",
      error: "Something went wrong. 😱",
    });
  };

  const LineItems = () => {
    if (cart && cart.line_items.length > 0) {
      return (
        <ul className="space-y-4">
          {cart.line_items.map((item: LineItem, index: number) => {
            const itemQuantity = quantities[item.id] ?? item.quantity;
            const isItemUpdating =
              updatingItemID !== null && updatingItemID !== item.id;

            return (
              <li
                key={index}
                className="flex justify-between items-center gap-2"
              >
                <Link
                  href={`/shop/${item.permalink}`}
                  className="flex gap-2 sm:gap-4"
                >
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
                </Link>

                <div className="flex flex-1 items-center justify-end gap-2">
                  <label htmlFor={`quantity-${index}`} className="sr-only">
                    {" "}
                    Quantity{" "}
                  </label>

                  <div className="flex items-center rounded border border-gray-200">
                    <button
                      type="button"
                      className="flex items-center justify-center h-8 w-8 sm:w-10 leading-10 text-gray-600 transition hover:opacity-75 disabled:cursor-not-allowed"
                      onClick={() =>
                        handleQuantityChange(item.id, itemQuantity - 1)
                      }
                      disabled={
                        itemQuantity <= 1 || isUpdating || isItemUpdating
                      }
                    >
                      &minus;
                    </button>

                    <input
                      ref={(el) => {
                        inputRefs.current[item.id] = el;
                      }}
                      type="number"
                      value={quantities[item.id]}
                      id={`quantity-${index}`}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      disabled={isUpdating || isItemUpdating}
                      className="remove-arrow h-8 sm:h-10 w-8 sm:w-16 border-transparent text-center [-moz-appearance:_textfield] text-xs sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      className="flex items-center justify-center h-8 w-8 sm:w-10 leading-10 text-gray-600 transition hover:opacity-75 disabled:cursor-not-allowed"
                      onClick={() =>
                        handleQuantityChange(item.id, itemQuantity + 1)
                      }
                      disabled={isUpdating || isItemUpdating}
                    >
                      &#43;
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveToCart(item.id)}
                    disabled={isUpdating}
                    className="text-gray-600 transition disabled:text-gray-400 hover:text-red-600 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Remove item</span>

                    <Trash />
                  </button>
                </div>
              </li>
            );
          })}
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
        <div className="flex flex-col">
          <button
            type="button"
            onClick={handleEmptyCart}
            className="flex justify-center items-center gap-2 ml-auto mt-8 bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md text-sm"
          >
            Empty Cart <Trash />
          </button>

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
                <button
                  onClick={handleCheckout}
                  disabled={!cart}
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </button>
              </div>
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
    <div className="mx-auto max-w-3xl w-full">
      <LineItems />

      <CheckoutSection />
    </div>
  );
}
