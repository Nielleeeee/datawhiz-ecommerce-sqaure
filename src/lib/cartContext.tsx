"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Commerce from "@chec/commerce.js";
import { Cart } from "@chec/commerce.js/types/cart";

interface CartContextType {
  cart: Cart | null;
}

const commerce = new Commerce(`${process.env.CHEC_PUBLIC_API_KEY}`);

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    };

    fetchCart();
  }, []);

  

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("Out of bounds");
  }
  return context;
};
