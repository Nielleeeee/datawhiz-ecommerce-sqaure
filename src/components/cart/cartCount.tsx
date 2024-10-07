import { useCart } from "@/lib/cartContext";
import React from "react";

export default function CartCount() {
  const { cart } = useCart();

  return (
    <>
      {cart && cart.totalItems !== undefined && cart.totalItems > 0 && (
        <span className="absolute -top-2 -left-4 px-2 py-1 text-xs text-white bg-blue-500 rounded-full">
          {cart.totalItems}
        </span>
      )}
    </>
  );
}
