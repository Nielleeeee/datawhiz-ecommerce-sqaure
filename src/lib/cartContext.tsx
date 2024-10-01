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

    console.log(cart);
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    try {
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

      return { status: true, cart: updatedCart };
    } catch (error) {
      console.error("Error Adding to cart: ", error);
      return { status: false, error };
    }
  };

  const updateCart = (variantID: string, quantity: number) => {
    try {
      if (!cart) {
        return { status: false, error: "Cart not found" };
      }

      const updatedCart: Cart = {
        ...cart,
        items: cart.items.map((item) =>
          item.variantID === variantID ? { ...item, quantity } : item
        ),
      };

      updatedCart.totalItems = updatedCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      updatedCart.totalPrice = updatedCart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCart(updatedCart);

      return { status: true, cart: updatedCart };
    } catch (error) {
      console.error("Error updating cart: ", error);
      return { status: false, error };
    }
  };

  const removeToCart = (variantID: string) => {
    try {
      let updatedCart: Cart = cart
        ? { ...cart }
        : { items: [], totalItems: 0, totalPrice: 0 };

      updatedCart.items = updatedCart.items.filter((item) => item.variantID !== variantID);

      updatedCart.totalItems = updatedCart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      updatedCart.totalPrice = updatedCart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      setCart(updatedCart);

      return { status: true, cart: updatedCart };
    } catch (error) {
      console.error("Error updating cart: ", error);
      return { status: false, error };
    }
  };

  const emptyCart = () => {
    try {
      const clearedCart = { items: [], totalItems: 0, totalPrice: 0 };

      setCart(clearedCart);

      return {
        status: true,
        cart: clearedCart,
      };
    } catch (error) {
      console.error("Error emptying cart: ", error);
      return { status: false, error };
    }
  };

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
