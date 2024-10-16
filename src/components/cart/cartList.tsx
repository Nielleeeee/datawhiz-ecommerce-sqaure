"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import TruckLoading from "@/components/loaders/truckLoading";
import { ShopIllustration, Trash } from "@/components/ui/svg";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";
import { CartItem } from "../../../type";
import { getBatchInventoryCount } from "@/app/action/shop/getInventoryCount";
import { InventoryCount } from "../../../type";
import { OrderLineItem } from "square";
import { createPaymentLink } from "@/app/action/checkout/checkout";

export default function CartItems() {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingItemID, setUpdatingItemID] = useState<string | null>(null);
  const [inventoryCounts, setInventoryCounts] = useState<InventoryCount>({});
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const { cart, updateCart, removeToCart, emptyCart } = useCart();

  const router = useRouter();

  // Fetching inventory count
  useEffect(() => {
    const fetchInventoryCounts = async () => {
      try {
        if (cart && cart.items.length > 0) {
          const catalogObjectIds = cart?.items.map(
            (item: CartItem) => item.variantID
          );

          const inventoryCountsResponse = await getBatchInventoryCount(
            catalogObjectIds
          );

          const inventoryCountsData: InventoryCount =
            inventoryCountsResponse.result.counts!.reduce(
              (acc, count) =>
                ({
                  ...acc,
                  [count.catalogObjectId!]: count.quantity,
                } as InventoryCount),
              {} as InventoryCount
            );

          setInventoryCounts(inventoryCountsData);
        }
      } catch (error) {
        console.error("Error fetching inventory counts: ", error);
        toast.error("Something went wrong. 😱");
      }
    };

    fetchInventoryCounts();
  }, [cart]);

  // Initializing quantities
  useEffect(() => {
    if (cart) {
      const initialQuantities: { [key: string]: number } = {};

      cart.items.forEach((item) => {
        initialQuantities[item.variantID] = item.quantity;
      });

      setQuantities(initialQuantities);
    }
  }, [cart]);

  const handleCheckout = async () => {
    try {
      if (cart) {
        const lineItems: OrderLineItem[] = cart.items.map((item: CartItem) => ({
          quantity: item.quantity.toString(),
          catalogObjectId: item.variantID,
          itemType: "ITEM",
        }));

        const checkoutLink = createPaymentLink(lineItems);

        await toast
          .promise(checkoutLink, {
            pending: "Checking out... 🙄",
            success: "Redirecting. 👌",
            error: "Something went wrong. 😱",
          })
          .then((checkoutLink) => {
            if (checkoutLink.status) {
              emptyCart();
              router.push(checkoutLink.paymentLink?.url ?? "");
            } else {
              console.error(
                "Error creating payment link: ",
                checkoutLink.error
              );
            }
          });
      }
    } catch (error) {
      console.error("Handle Checkout Error: ", error);
      throw new Error("Checkout failed");
    }
  };

  const handleQuantityChange = (variantID: string, newQuantity: number) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const availableInventory = inventoryCounts[variantID] ?? 0;

    if (newQuantity > 0 && newQuantity <= availableInventory) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [variantID]: newQuantity,
      }));

      setUpdatingItemID(variantID);

      requestAnimationFrame(() => {
        if (inputRefs.current[variantID]) {
          inputRefs.current[variantID]?.focus();
        }
      });

      debounceTimeout.current = setTimeout(async () => {
        updateQuantity(variantID, newQuantity);
      }, 800);
    } else {
      setUpdatingItemID(null);
      setIsUpdating(false);

      debounceTimeout.current = setTimeout(async () => {
        toast.error("Insufficient stock available. 😞");
      }, 300);
    }
  };

  const updateQuantity = async (variantID: string, quantity: number) => {
    try {
      setIsUpdating(true);

      const response = updateCart(variantID, quantity);

      if (response.status) {
        toast.success("Cart item updated. 👌");
      } else {
        toast.error("Something went wrong. 😱");
      }
    } catch (error) {
      throw Error(`Error: ${error}`);
    } finally {
      setIsUpdating(false);
      setUpdatingItemID(null);
    }
  };

  const handleEmptyCart = async () => {
    const response = emptyCart();

    if (response.status) {
      toast.success("Cart emptied. 👌");
    } else {
      toast.error("Something went wrong. 😱");
    }
  };

  const handleRemoveToCart = (variantID: string) => {
    const response = removeToCart(variantID);

    if (response.status) {
      toast.success("Item Removed from Cart. 👌");
    } else {
      toast.error("Something went wrong. 😱");
    }
  };

  const LineItems = () => {
    if (cart && cart.items.length > 0) {
      return (
        <ul className="space-y-4">
          {cart.items.map((item: CartItem, index: number) => {
            const itemQuantity = quantities[item.variantID];
            const isItemUpdating =
              updatingItemID !== null && updatingItemID !== item.variantID;
            const permalink = item.name
              ? `${item.name.toLowerCase().replace(/\s+/g, "-")}-${item.id}`
              : null;
            const availableInventory = inventoryCounts[item.variantID] ?? 0;
            const price = new Intl.NumberFormat("en-US", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(item.price);

            return (
              <li
                key={index}
                className="flex justify-between items-center gap-2"
              >
                <Link
                  href={`/shop/${permalink}`}
                  className="flex gap-2 sm:gap-4"
                >
                  <Image
                    src={`${item.image}`}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">{item.name}</h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Price: </dt>
                        <dd className="inline">${price}</dd>
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
                        handleQuantityChange(item.variantID, itemQuantity - 1)
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
                      value={itemQuantity}
                      id={`quantity-${index}`}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.variantID,
                          parseInt(e.target.value, 10)
                        )
                      }
                      readOnly
                      disabled={isUpdating || isItemUpdating}
                      className="remove-arrow h-8 sm:h-10 w-8 sm:w-16 border-transparent text-center [-moz-appearance:_textfield] text-xs sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      className="flex items-center justify-center h-8 w-8 sm:w-10 leading-10 text-gray-600 transition hover:opacity-75 disabled:cursor-not-allowed"
                      onClick={() =>
                        handleQuantityChange(item.variantID, itemQuantity + 1)
                      }
                      disabled={
                        isUpdating ||
                        isItemUpdating ||
                        itemQuantity >= availableInventory
                      }
                    >
                      &#43;
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemoveToCart(item.variantID)}
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
    if (cart && cart.items.length > 0) {
      const subtotal = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(cart.totalPrice);

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
                  <dd>$ {subtotal}</dd>
                </div>

                <div className="flex justify-between">
                  <dt>VAT</dt>
                  <dd>0.00</dd>
                </div>

                {/* <div className="flex justify-between">
              <dt>Discount</dt>
              <dd>-£20</dd>
            </div> */}

                <div className="flex justify-between !text-base font-medium">
                  <dt>Total</dt>
                  <dd>$ {subtotal}</dd>
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
    <>
      <div className="mx-auto max-w-3xl w-full">
        <LineItems />

        <CheckoutSection />
      </div>
    </>
  );
}
