"use client";

import Cookies from "js-cookie";
import { Cart } from "../../type";

export const setCartCookie = (cartData: Cart) => {
  const maxAge = 7 * 24 * 60 * 60;
  Cookies.set("cart", JSON.stringify(cartData), { expires: maxAge / 86400 });
};

export const getCartCookie = () => {
  const cartCookie = Cookies.get("cart");

  return cartCookie ? (JSON.parse(cartCookie) as Cart) : null;
};
