"use client";

import { createContext, useEffect, useContext, useState } from "react";
import { CartContextType, Cart, CartItem } from "../../type";
import { setCartCookie, getCartCookie } from "@/lib/cartCookies";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(getCartCookie());

  useEffect(() => {
    if (cart) {
      setCartCookie(cart);
    }
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    let updatedCart: Cart = cart
      ? { ...cart }
      : { items: [], totalItems: 0, totalPrice: 0 };

    const existingItem = updatedCart.items.find(
      (item) => item.id === newItem.id
    );

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      updatedCart.items.push(newItem);
    }

    updatedCart.totalItems = updatedCart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    updatedCart.totalPrice = updatedCart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setCart(updatedCart);
  };

  const updateCart = () => {};

  const removeToCart = () => {};

  const emptyCart = () => {};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, removeToCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
