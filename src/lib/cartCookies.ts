"use server";

import { cookies } from "next/headers";
import { Cart } from "../../type";

export const setCartCookie = (cardData: Cart) => {
  const maxAge = 7 * 24 * 60 * 60;
  cookies().set("cart", JSON.stringify(cardData), { maxAge });
};

export const getCartCookie = () => {
  const cartCookie = cookies().get("cart");

  return cartCookie ? (JSON.parse(cartCookie.value) as Cart) : null;
};
